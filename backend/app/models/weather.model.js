const mongoose = require("mongoose");

const WeatherSchema = mongoose.Schema(
    {
        time: String,
        pm10: String,
        pm2_5: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("WeatherSchema", WeatherSchema);
