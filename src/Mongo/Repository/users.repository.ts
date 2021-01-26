import {Injectable} from "@nestjs/common";
import {UserDTO} from "../../Controllers/DTO/users.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../Interfaces/users.interface";

@Injectable()
export class UserRepository {

    constructor(
        @InjectModel("user") private readonly userModel : Model<User>
    ) {}

    async saveUser(newUser: UserDTO): Promise<User>{
        const saveUser = new this.userModel(newUser);
        return saveUser.save();
    }

    async getAllUsers(): Promise<User[]>{
        return await this.userModel.find({}, {__v : false}).sort({name:+1}).exec();
    }

    async getUserById(userId: string): Promise<User>{
        return await this.userModel.findById(userId, {__v : false});
    }

    async getUserByAuthorName(authorName: string[]): Promise<User[]>{
        return await this.userModel.find({
            $or : [
                {"author.name" : {$in : authorName}},
                {"author.surname" : {$in : authorName}},
            ]
        });
    }

    // async updateUserById(userId: string, newUser : UserDTO): Promise<User>{
    //     return await this.userModel.replaceOne({ _id : userId}, newUser);
    // }

    // async deleteUserById(userId: string): Promise<User>{
    //     return await this.userModel.findOneAndDelete({_id : userId});
    // }

}