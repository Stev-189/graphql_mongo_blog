import { GraphQLID, GraphQLString } from "graphql";

import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comments";
import { RespTypeUser, RespTypeUserList, RespTypeOnePost, RespTypePostList, RespTypeCommentList, RespTypeComment} from "./typedef";


export const hello={
    type: GraphQLString,
    description:"Return a string",
    resolve:()=>"Hello word"
}

//////////////////////////////////////////////////////////////////////////////////////////////
/* export const users={
    type: new GraphQLList(UserType),
    description:"Return a list of users",
    resolve:async()=> await User.find({})

} */

export const users={
    type: RespTypeUserList,
    description:"Return a list of users",
    resolve:async()=> ({
        status:true,
        msg:"List of users",
        data:await User.find()
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////

export const user={
    type: RespTypeUser,
    description:"Return a user",
    args:{
        id:{type:GraphQLID}
    },
    resolve:async(_,args)=>{
        const {id}=args;
        const user=await User.findById(id);
        if(!user) throw new Error("User not found");
        return {status:true,msg:"User found",data:user};
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////

export const posts={
    type: RespTypePostList,
    description:"Return a list of posts",
    resolve:async()=> ({
        status:true,
        msg:"List of posts",
        data:await Post.find()
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////
export const post={
    type: RespTypeOnePost,
    description:"Return a post",
    args:{
        id:{type:GraphQLID}
    },
    resolve:async(_,args)=>{
        const {id}=args;
        const post=await Post.findById(id);
        if(!post) throw new Error("Post not found");
        return {status:true,msg:"Post found",data:post};
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////
/* export const comments={
    type: RespTypeCommentList,
    description:"Return a list of comments",
    resolve : async()=> ({
        status:true,
        msg:"Comments found",
        data: await Comment.find()
    })
} */

export const comments={
    type: RespTypeCommentList,
    description:"Return a list of comments",
    resolve : async()=> {
        try {
            const comments = await Comment.find();
            if(comments.length===0) throw new Error("Comments not found");
            return {status:true,msg:"Comments found perfect",data:comments};
        } catch (error) {
            return {status:false,msg:"Comments not found",data:null};
        }
    }
}

export const comment={
    type: RespTypeComment,
    description:"Return a comment",
    args:{
        id:{type:GraphQLID}
    },
    resolve:async(_,args)=>{
        const {id}=args;
        try {
            const comment=await Comment.findById(id);
            if(!comment) throw new Error("Comment not found");
            return {status:true,msg:"Comment found",data:comment}; 
        } catch (error) {
            return {status:false,msg:"Comment not found",data:null};
        }
    }
}
