import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {BookDTO} from "../DTO/books.dto";
import {BooksService} from "../../Services/books/books.service";
import {Book} from "../../Mongo/Interfaces/book.interface";

@Controller('books')
export class BooksController {

    constructor(
        private readonly bookService : BooksService
    ){}

    @Get()
    async getAllBooks(): Promise<Book[]>{
        return await this.bookService.getAllBooks();
    }

    @Get("id/:bookId")
    async getBookById(@Param('bookId') bookId: string): Promise<Book>{
        return await this.bookService.getBookById(bookId);
    }

    @Get("author/:authorName")
    async getBookByAuthorName(@Param('authorName') authorName: string): Promise<Book[]>{
        return await this.bookService.getBookByAuthorName(authorName);
    }

    @Post()
    async saveBook(@Body() newBook: BookDTO): Promise<Book>{
        return await this.bookService.saveBook(newBook);
    }

    @Patch(":bookId")
    async  updateBookById(@Param("bookId") bookId : string, @Body() newBook : BookDTO): Promise<Book>{
        return await this.bookService.updateBookById(bookId, newBook);
    }

    @Delete(":bookId")
    async deleteBookById(@Param('bookId') bookId: string): Promise<Book>{
        return await this.bookService.deleteBookById(bookId);
    }

}
