import {Injectable} from "@nestjs/common";
import {BookDTO} from "../../Controllers/DTO/books.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Book} from "../Interfaces/book.interface";

@Injectable()
export class BookRepository {

    constructor(
        @InjectModel("book") private readonly bookModel : Model<Book>
    ) {}

    async saveBook(newBook: BookDTO): Promise<Book>{
        const saveBook = this.bookModel(newBook);
        return saveBook.save();
    }

    async getAllBooks(): Promise<Book[]>{
        return await this.bookModel.find({}, {__v : false}).sort({name:+1}).exec();
    }

    async getBookById(bookId: string): Promise<Book>{
        return await this.bookModel.findById(bookId, {__v : false});
    }

    async getBookByAuthorName(authorName: string[]): Promise<Book[]>{
        return await this.bookModel.find({
            $or : [
                {"author.name" : {$in : authorName}},
                {"author.surname" : {$in : authorName}},
            ]
        });
    }

    async updateBookById(bookId: string, newBook : BookDTO): Promise<Book>{
        return await this.bookModel.replaceOne({ _id : bookId}, newBook);
    }

    async deleteBookById(bookId: string): Promise<Book>{
        return await this.bookModel.findOneAndDelete({_id : bookId});
    }

}