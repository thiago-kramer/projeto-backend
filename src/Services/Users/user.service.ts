import {BadRequestException, Injectable} from '@nestjs/common';
import {UserDTO} from "../../Controllers/DTO/users.dto";
import {UserRepository} from "../../Mongo/Repository/users.repository";
import {User} from "../../Mongo/Interfaces/users.interface";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository : UserRepository
    ){}

    async saveUser(newUser: UserDTO): Promise<User>{
        return await this.userRepository.saveUser(newUser);
    }

    async getAllUsers(): Promise<User[]>{
        const allUsers = await this.userRepository.getAllUsers();

        if(!allUsers.length){
            throw new BadRequestException("There are no users registered yet!");
        }

        return await allUsers;
    }

    async getUserById(userId: string): Promise<User>{
        try {
            return await this.userRepository.getUserById(userId);
        } catch (e) {
            throw new BadRequestException("There are no results.")
        }
    }

    async getUserByAuthorName(authorName: string): Promise<User[]>{

        const splittedAuthorNames = authorName.split(" ");
        const foundUserds = await  this.userRepository.getUserByAuthorName(splittedAuthorNames);

        if(!foundUserds){
            throw new BadRequestException("No results found.")
        }

        return foundUserds
    }

    // async updateUserById(userId: string, newUser : UserDTO): Promise<User>{
    //
    //     const oldUser = this.userRepository.getUserById(userId);
    //
    //     if(!oldUser) {
    //         throw new BadRequestException("There is no user with this ID.");
    //     }
    //
    //     const updatedUser = this.userRepository.updateUserById(userId, newUser);
    //
    //     if(updatedUser) {
    //         return await this.userRepository.getUserById(userId);
    //     } else {
    //         throw new BadRequestException("There is a problema on the UPDATE. ");
    //     }
    // }

    // async deleteUserById(userId: string): Promise<User>{
    //     try {
    //         return await this.userRepository.deleteUserById(userId);
    //     } catch (e) {
    //         throw new BadRequestException("There are no users with this id.")
    //     }
    // }

}
