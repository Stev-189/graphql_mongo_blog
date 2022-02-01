import { GraphQLID, GraphQLString } from "graphql";

import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comments";
import { createToken } from "../utils/auth";
import { RespServerTypeAuth, RespTypePost, RespTypeComment } from "./typedef";

/* export const register = {
    type: GraphQLString,
    description: "Register a new user and return a token",
    args: {
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        email: {type: GraphQLString},
        displayname: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const { username, password, email, displayname } = args;
        const newUser = await User.create({username, password, email, displayname});
        const token = createToken({user: newUser.username, id: newUser._id, email: newUser.email});
        return token;
    }
}; */

export const register = {
    type: RespServerTypeAuth,
    description: "Register a new user and return a token",
    args: {
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        email: {type: GraphQLString},
        displayname: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const { username, password, email, displayname } = args;
        const newUser = await User.create({username, password, email, displayname});
        const token = createToken({user: newUser.username, id: newUser._id, email: newUser.email});
        return {status: true, msg: "User created", token};
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////

/* export const login = {
    type: GraphQLString,
    description: "Login a user and return a token",
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const { email, password } = args;
        const user = await User.findOne({email}).select("+password");
        if(!user || password!==user.password) throw new Error("User not found");
        const token = createToken({user: user.username, id: user._id, email: user.email});
        return token;
    }
} */

export const login = {
    type: RespServerTypeAuth,
    description: "Login a user and return a token",
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const { email, password } = args;
        const user = await User.findOne({email}).select("+password");
        if(!user || password!==user.password) throw new Error("User not found");
        const token = createToken({user: user.username, id: user._id, email: user.email});
        return {status: true, msg: "User logged", token};
    }
}

export const createPost = {
    type: RespTypePost,
    description: "Create a new post",
    args: {
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    },
    resolve: async (_, args, {verifiedUser}) => {
        const { title, body } = args;
        //console.log("verifiedUser: ", verifiedUser);
        const newPost = new Post({
            title, 
            body,
            authorId: verifiedUser.id
        });
        await newPost.save();
        return {status: true, msg: "Post created", data: newPost};
    }
}

export const updatePost = {
    type: RespTypePost,
    description: "Update a post",
    args: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        body: {type: GraphQLString}
    },
    resolve: async (_, args, {verifiedUser}) => {
        const { id, title, body } = args;
        try {
            const post = await Post.findById(id);
            if(!post) throw new Error("Post not found");
            if(post.authorId.toString()!==verifiedUser.id) throw new Error("You are not the author of this post");
            post.title = title;
            post.body = body;
            await Post.findByIdAndUpdate(id, {
                title,
                body
            }, {new: true});
            return {status: true, msg: "Post updated", data: post};
            
        } catch (error) {
            return {status: false, msg: error.message, data: null};
        }
    }
}

export const deletePost = {
    type: RespTypePost,
    description: "Delete a post",
    args: {
        id: {type: GraphQLID}
    },
    resolve: async (_, args, {verifiedUser}) => {
        const { id } = args;
        try {
            const post = await Post.findById(id);
            if(!post) throw new Error("Post not found");
            if(post.authorId.toString()!==verifiedUser.id) throw new Error("You are not the author of this post");
            await Post.findByIdAndDelete(id);
            return {status: true, msg: "Post deleted", data: post};
            
        } catch (error) {
            return {status: false, msg: error.message, data: null};
        }
    }
}

export const addComment = {
    type: RespTypeComment,
    description: "Add a comment to a post",
    args: {
        postId: {type: GraphQLID},
        comment: {type: GraphQLString}
    },
    resolve: async (_, args, {verifiedUser}) => {
        const { postId, comment } = args;
        try {
            const post = await Post.findById(postId);
            if(!post) throw new Error("Post not found");
            const newComment = new Comment({
                comment,
                userId: verifiedUser.id,
                postId
            });
            await newComment.save();
            return {status: true, msg: "Comment added", data: newComment};
            
        } catch (error) {
            return {status: false, msg: error.message, data: null};
        }
    }
}

export const updateComment = {
    type: RespTypeComment,
    description: "Update a comment",
    args: {
        id: {type: GraphQLID},
        comment: {type: GraphQLString}
    },
    resolve: async (_, args, {verifiedUser}) => {
        const { id, comment } = args;
        try {
            const commentToUpdate = await Comment.findById(id);
            if(!commentToUpdate) throw new Error("Comment not found");
            if(commentToUpdate.userId.toString()!==verifiedUser.id) throw new Error("You are not the author of this comment");
            commentToUpdate.comment = comment;
            await Comment.findByIdAndUpdate(id, {
                comment
            }, {new: true});
            return {status: true, msg: "Comment updated", data: commentToUpdate};
            
        } catch (error) {
            return {status: false, msg: error.message, data: null};
        }
    }
}

export const deleteComment = {
    type: RespTypeComment,
    description: "Delete a comment",
    args: {
        id: {type: GraphQLID}
    },
    resolve: async (_, args, {verifiedUser}) => {
        const { id } = args;
        try {
            const comment = await Comment.findById(id);
            if(!comment) throw new Error("Comment not found");
            if(comment.userId.toString()!==verifiedUser.id) throw new Error("You are not the author of this comment");
            await Comment.findByIdAndDelete(id);
            return {status: true, msg: "Comment deleted", data: comment};
            
        } catch (error) {
            return {status: false, msg: error.message, data: null};
        }
    }
}