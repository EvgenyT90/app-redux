module.exports = (app) => {
    const userData = require("../controllers/user.controller");

    //Создание события
    app.post("/login", userData.login);

    // Получить все события
    app.get("/user", userData.user);
};
