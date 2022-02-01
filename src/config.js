import { config as dotenv} from 'dotenv';
import path from "path";
import fs from "fs";

dotenv({
  path: (fs.existsSync(path.join(__dirname, '../.env.local')))
        ? path.join(__dirname, '../.env.local')
        : path.join(__dirname, '../.env')
}); //lee las variables de entorno

export const PORT = process.env.PORT;

//JWT secret
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN);