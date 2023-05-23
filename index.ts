import express, { Express, Request, Response } from "express";
const app: Express = express();
import mongoose from "mongoose";
import kategooriacontroller from "./Controllers/kategooriacontroller";
import toodecontroller from "./Controllers/toodecontroller";
const bodyParser = require('body-parser');

mongoose.connect("mongodb+srv://karlmarkusvaher:awktzLXcx9emq9fE@cluster0.tjkufer.mongodb.net/test");
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', kategooriacontroller);
app.use('/', toodecontroller);

app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});