import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './graphql/schema';
import { PORT } from './config';
import { connectDB } from './db/connect';
import { authenticate } from './middlewares/auth';

connectDB();
const app = express();

app.set('port', PORT || 3000);

app.use(morgan('dev'));
app.use(cors())

//app.use(express.json());
//app.use(express.urlencoded({extended:false}))

app.use(authenticate)

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

export default app;