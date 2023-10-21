//Создание сервера с помощью ExpressJS

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());
//app.use(express.json());

const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
    .connect(dbConfig.url, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Успешное подключение к базе данных");
    })
    .catch((error) => {
        console.log("Нет соединения с базой данных: ", error);
        process.exit();
    });

app.use(express.static(path.join(__dirname, "public")));
require("./app/routes/eventsWorld.routes")(app);
require("./app/routes/userData.routrs")(app);

// app.post("/login", function (req, res) {
//     console.log("request!query====", req.query);

//     if (req.query) {
//     }
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.sendFile(`${__dirname}/public/index.html`);
//     console.log("GOOD");
// });

// app.get("/user", function (req, res) {
//     console.log("request!query====", req.body);
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.sendFile(`${__dirname}/public/index.html`);
// });

// app.get("/", (request, response) => {
//     response.send({ message: "Наш сервис" });
// });

// app.get("/main", (request, response) => {
//   response.sendFile(`${__dirname}/public/index.html`);
// });

// app.get("/articles", (request, response) => {
//   response.sendFile(`${__dirname}/public/index.html`);
// });

// //localhost:4040/articles/artic
// app.get("/articles/article/:id", (request, response) => {
//   //запрос к базе id
//   response.sendFile(`${__dirname}/public/index.html`);
// });

// app.post("/articles/article/", (request, response) => {
//   console.log("request======", request);
//   request;
//   response.send({ message: "Наш сервис POST" });
// });

// app.put("/articles/article/", (request, response) => {
//   request;
//   response.send({ message: "Наш сервис" });
// });

// app.delete("/articles/article/:id", (request, response) => {
//   request;
//   console.log("test");
//   if (id) {
//     //удалить
//   } else {
//     response.send({ message: "Наш сервис" });
//   }
// });

const PORT = 4040;

app.listen(PORT, () => {
    console.log(`Application start on port: ${PORT}`);
});
