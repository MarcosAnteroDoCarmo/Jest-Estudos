import bodyParser from "body-parser";
import express from "express";
import { userRouter } from "./infra/router/userRouter";

export const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter);

const port = 3000;

app.listen(port, () => console.log(`Running on port ${port}...`));
