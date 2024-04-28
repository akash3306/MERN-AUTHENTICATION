import mongoose from "mongoose";

//creating Schema

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true,  unique: true, default: ''},
    email: {type:String, required:true,  unique: true, default: ''},
    password: {type:String, required:true, default: ''},
})

//creating models

const UserModel = mongoose.model("User",UserSchema)

export{UserModel as User}