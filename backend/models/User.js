const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        uid : {
            type:String,
            unique: true,
        },
        email : {
            type : String,
            required : true,
            trim : true,
            unique:true,
            lowercase:true
        },
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model('Users',userSchema);
