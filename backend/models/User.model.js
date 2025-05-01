const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token:{
        type: String,
    },
    role:{
        type: String,
        enum: ["admin", "user"],
       default: "user",
    }
    });

    module.exports=model("User",userSchema,"Users")                 