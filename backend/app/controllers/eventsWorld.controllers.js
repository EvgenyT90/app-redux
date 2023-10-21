const { read } = require("fs");
const EventsWorld = require("../models/eventsWorld.model");

//1. Проверить наличие в базые

//Создание события
exports.create = (req, res) => {
    //Валидация данных
    if (!req.body.name) {
        return res.status(400).send({
            message: "Наименование события не может быть пустым",
            success: false,
        });
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Описание события не может быть пустым",
            success: false,
        });
    }

    const eventWorld = new eventsWorld({
        name: req.body.name,
        description: req.body.description,
    });

    eventWorld
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message: `Данные не записались: ${error.message}`,
                success: false,
            });
        });
};

//Получение всех событий
exports.findAll = (req, res) => {
    EventsWorld.find()
        .then((eventsWorld) => {
            res.send(eventsWorld);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Произошла ошибка",
            });
        });
};

//Получение события
exports.findOne = (req, res) => {
    EventsWorld.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "EventsWorld not found with id " + req.params.id,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "EventsWorld not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Error retrieving todo with id " + req.params.id,
            });
        });
};

//Обновление события
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send({
            message: "EventsWorld description can not be empty",
        });
    }

    // Find todo and update it with the request body
    EventsWorld.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name || "Untitled EventsWorld",
            description: req.body.description,
        },
        { new: true },
    )
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({
                    message: "EventsWorld not found with id " + req.params.id,
                });
            }
            res.send(todo);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "EventsWorld not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Error updating EventsWorld with id " + req.params.id,
            });
        });
};

//Удаление события
exports.delete = (req, res) => {
    EventsWorld.findByIdAndRemove(req.params.id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({
                    message: "EventsWorld not found with id " + req.params.id,
                });
            }
            res.send({ message: "EventsWorld deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "EventsWorld not found with id " + req.params.todo,
                });
            }
            return res.status(500).send({
                message:
                    "Could not delete EventsWorld with id " + req.params.id,
            });
        });
};
