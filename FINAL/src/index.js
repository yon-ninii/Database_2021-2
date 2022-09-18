import express from "express";
import logger from "morgan";
import path from "path";

import homeRouter from "../routes/login"
import selectRouter from "../routes/select"
import updateRouter from "../routes/update";
import insertRouter from "../routes/insert"
import deleteRouter from "../routes/delete"

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

app.use(logger("dev"));

app.use('/', homeRouter);
app.use('/select', selectRouter);
app.use('/insert', insertRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

app.listen(PORT, () => {
    console.log('Example app listening at http://localhost:${PORT}')
})