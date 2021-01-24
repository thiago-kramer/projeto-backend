import {Schema} from "mongoose";
import {AuthroSchema} from "./author.schema";

export const BookSchema = new Schema({

    name : String,
    author : [AuthroSchema],
    language : String,
    releaseYear : Number,
    publisher : String,
    pages : Number

})