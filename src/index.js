import path from "path";
import app from "./server";

export const backupPath = path.join(__dirname);

//Apirest
app.listen(app.get('port'));
console.log('server on port', app.get('port'));