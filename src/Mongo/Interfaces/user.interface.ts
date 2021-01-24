import { Document } from "mongoose";
import * as mongoose from "mongoose";

export interface User extends Document{

    readonly _id : mongoose.Schema.Types.ObjectId;
    readonly name : string;
    readonly login : string;
    readonly password : string;

}