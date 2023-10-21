const { read } = require("fs");
const UserData = require("../models/user.model");

exports.login = (req, res) => {
    //Валидация данных
    if (!req.body.name) {
        return res.status(400).send({
            message: "Наименование события не может быть пустым",
            success: false,
        });
    }

    const userData = new UserData({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    });

    userData
        .save()
        .then((data) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.send({ data, success: true });
        })
        .catch((error) => {
            res.status(500).send({
                data: null,
                message: `Данные не записались: ${error.message}`,
                success: false,
            });
        });
};

//Получение всех событий
exports.user = (req, res) => {
    const userData = new UserData({
        name: " req.body.name",
        password: "req.body.password",
        email: "req.body.email",
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send({ success: true });

    // userData.findAll
    //     .then((success) => {
    //         res.header("Access-Control-Allow-Origin", "*");
    //         res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //         res.send({ success: true });
    //     })
    //     .catch((error) => {
    //         res.status(500).send({
    //             message: `Данные не записались: ${error.message}`,
    //             success: false,
    //         });
    //     });
    //Валидация данных
    // if (!req.body.name) {
    //     return res.status(400).send({
    //         message: "Наименование события не может быть пустым",
    //         success: false,
    //     });
    // }

    // const userData = new UserData({
    //     name: req.body.name,
    //     password: req.body.password,
    //     email: req.body.email,
    // });

    // userData
    //     .save()
    //     .then((data) => {
    //         res.header("Access-Control-Allow-Origin", "*");
    //         res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //         res.send({ data, success: true });
    //     })
    //     .catch((error) => {
    //         res.status(500).send({
    //             message: `Данные не записались: ${error.message}`,
    //             success: false,
    //         });
    //     });
};
