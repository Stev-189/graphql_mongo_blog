import { GraphQLObjectType, GraphQLSchema} from "graphql";
import { hello, users,user, posts, post, comments, comment } from "./queries";
import { register, login, createPost, updatePost, deletePost, addComment, updateComment, deleteComment } from "./mutations";

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description:"The root query type",
    fields: {
        /*
        // si hicieramos la queri directo aqui 
        hello:{
            type: GraphQLString,
            description:"Return a string",
            resolve:()=>"Hello word"
        }
        */
       
       // de la forma 2 podemos definir el objerto que estraeremos
        hello, // funcuines que me permiten hacer las query
        users,
        user,
        posts,
        post,
        comments,
        comment
    }

})

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root mutation type",
    fields: {
        register,
        login,
        createPost,
        updatePost,
        deletePost,
        addComment,
        updateComment,
        deleteComment
    }
})

export const schema=  new GraphQLSchema({
    query:QueryType,
    mutation:MutationType
})