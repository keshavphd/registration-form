import { model, Schema } from "mongoose";

const formSchema = new Schema({
    firstname:String,
    lastname:String,
    email:String,
    country:String,
    state:String,
    city:String,
    gender:String,
    dateOfBirth:Date,
    age:Number,
})

export const Form = new model("form",formSchema);




