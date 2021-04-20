const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
    body : {
        type : String,
        required : true
    },
    roomId : {
        type : String,
        required : true
    },
    senderId : {
        type : String,
        required : true
    }
})

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;