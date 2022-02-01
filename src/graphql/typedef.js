import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comments";

export const RespServerTypeAuth = new GraphQLObjectType({
    name: "RespServerTypeAuth",
    description: "RestServerTypeAuth object response server in GraphQL",
    fields:{
        status:{type:GraphQLBoolean},
        msg: {type:GraphQLString},
        token: {type:GraphQLString}
    }
});

export const UserType = new GraphQLObjectType({
    name: "UserType",
    description: "User Type",
    fields:()=>({
        id:{ type: GraphQLID },
        username:{ type: GraphQLString },
        email:{ type: GraphQLString },
        displayname:{ type: GraphQLString },
        createdAt:{ type: GraphQLString },
        updatedAt:{ type: GraphQLString }
    })
});

export const RespTypeUserList  = new GraphQLObjectType({
    name: "RespTypeUserList",
    description: "RespTypeUserList object response server in GraphQL",
    fields:{
        status:{type:GraphQLBoolean},
        msg: {type:GraphQLString},
        data: {type: new GraphQLList(UserType)}
    }
});

export const RespTypeUser = new GraphQLObjectType({
    name: "RespTypeUser",
    description: "RespTypeUser object response server in GraphQL",
    fields:{
        status:{type:GraphQLBoolean},
        msg: {type:GraphQLString},
        data: {type: UserType}
}});
    
export const PostType = new GraphQLObjectType({
    name: "PostType",
    description: "PostType object response server in GraphQL",
    fields:()=>({
        id:{ type: GraphQLID },
        title:{ type: GraphQLString },
        body:{ type: GraphQLString },
        createdAt:{ type: GraphQLString },
        updatedAt:{ type: GraphQLString },
        author:{ type: UserType, resolve(parent){
           return User.findById(parent.authorId);
        } },
        comments:{ type: new GraphQLList(CommentType), resolve(parent){
            return Comment.find({postId: parent.id});
        }
    }
})});

export const CommentType = new GraphQLObjectType({
    name: "CommentType",
    description: "CommentType object response server in GraphQL",
    fields:{
        id:{ type: GraphQLID },
        comment:{ type: GraphQLString },
        user:{ type: UserType, resolve(parent){
              return User.findById(parent.userId);
        } },
        post:{ type: PostType, resolve(parent){
            return Post.findById(parent.postId);
        }}

    }
});

export const RespTypePost  = new GraphQLObjectType({
    name: "RespTypePost",
    description: "RespTypePost object response server in GraphQL",
    fields:{
        status:{type:GraphQLBoolean},
        msg: {type:GraphQLString},
        data: {type: PostType}
    }
});

export const RespTypePostList  = new GraphQLObjectType({
    name: "RespTypePostList",
    description: "RespTypePostList object response server in GraphQL",
    fields:{
        status:{type:GraphQLBoolean},
        msg: {type:GraphQLString},
        data: {type: new GraphQLList(PostType)}
    }
});

export const RespTypeOnePost  = new GraphQLObjectType({
    name: "RespTypeOnePost",
    description: "RespTypeOnePost object response server in GraphQL",
    fields:{
        status:{type:GraphQLBoolean},
        msg: {type:GraphQLString},
        data: {type: PostType}
    }
});


export const RespTypeComment = new GraphQLObjectType({
    name: "RespTypeComment",
    description: "RespTypeCommentList object response server in GraphQL",
    fields:{
        status:{type:GraphQLBoolean},
        msg: {type:GraphQLString},
        data: {type: CommentType}
    }
});

export const RespTypeCommentList  = new GraphQLObjectType({
    name: "RespTypeCommentList",
    description: "RespTypeCommentList object response server in GraphQL",
    fields:{
        status:{type: GraphQLBoolean},
        msg: {type: GraphQLString},
        data: {type: new GraphQLList(CommentType)}
    }
});