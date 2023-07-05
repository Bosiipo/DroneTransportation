import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index';
console.log("HERE");
import '@babel/polyfill';
const db = import('./utils/database/index');

//Gaining access to .env file
dotenv.config();

//basic set up for a express server
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(routes);

db.then(() => {
    app.listen(port, () => {
      console.info(`App running on port ${port}`);
    });
    console.log('Database connected...');
  })
  .catch(e => console.log('error...', e));

