import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import webRoute from "./routes/web";

let app = express();

//Config view Engine
viewEngine(app);

//Config web routes
app.use(webRoute);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('App is running at the port: ' + port);
})