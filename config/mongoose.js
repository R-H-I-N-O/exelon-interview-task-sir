const mongoose = require("mongoose");

// connect mongodb
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.error(err);
});

module.exports = mongoose;