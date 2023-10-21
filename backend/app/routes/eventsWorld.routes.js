module.exports = (app) => {
    const eventsWorld = require("../controllers/eventsWorld.controllers");

    //Создание события
    app.post("/event", eventsWorld.create);

    //    app.post("/login", console.log("SDSDSDSDS"));

    // Получить все события
    app.get("/events", eventsWorld.findAll);

    // Получить определенное событие
    app.get("/event/:id", eventsWorld.findOne);

    //Обновить информацию о событии
    app.put("/event/:id", eventsWorld.update);

    //Удалить
    app.delete("/event/:id", eventsWorld.delete);
};
