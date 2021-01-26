import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserDTO} from "../DTO/users.dto";
import {UserService} from "../../Services/Users/user.service";
import {User} from "../../Mongo/Interfaces/users.interface";

@Controller('users')
export class UserController {

    constructor(
        private readonly userService : UserService
    ){}

    @Get()
    async getAllUsers(): Promise<User[]>{
        return await this.userService.getAllUsers();
    }

    @Get("id/:userId")
    async getUserById(@Param('userId') userId: string): Promise<User>{
        return await this.userService.getUserById(userId);
    }

    @Get("author/:authorName")
    async getUserByAuthorName(@Param('authorName') authorName: string): Promise<User[]>{
        return await this.userService.getUserByAuthorName(authorName);
    }

    @Post()
    async saveUser(@Body() newUser: UserDTO): Promise<User>{
        return await this.userService.saveUser(newUser);
    }

    // @Patch(":userId")
    // async  updateUserById(@Param("userId") userId : string, @Body() newUser : UserDTO): Promise<User>{
    //     return await this.userService.updateUserById(userId, newUser);
    // }

    // @Delete(":userId")
    // async deleteUserById(@Param('userId') userId: string): Promise<User>{
    //     return await this.userService.deleteUserById(userId);
    // }

}
