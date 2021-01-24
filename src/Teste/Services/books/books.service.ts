import {BadRequestException, Injectable} from '@nestjs/common';
import {BookDTO} from "../../Controllers/DTO/books.dto";
import {BookRepository} from "../../Mongo/Repository/book.repository";
import {Book} from "../../Mongo/Interfaces/book.interface";

@Injectable()
export class BooksService {

    constructor(
        private readonly bookRepository : BookRepository
    ){}

    async saveBook(newBook: BookDTO): Promise<Book>{
        return await this.bookRepository.saveBook(newBook);
    }

    async getAllBooks(): Promise<Book[]>{
        const allBooks = await this.bookRepository.getAllBooks();

        if(!allBooks.length){
            throw new BadRequestException("There are no books registered yet!");
        }

        return await allBooks;
    }

    async getBookById(bookId: string): Promise<Book>{
        try {
            return await this.bookRepository.getBookById(bookId);
        } catch (e) {
            throw new BadRequestException("There are no results.")
        }
    }

    async getBookByAuthorName(authorName: string): Promise<Book[]>{

        const splittedAuthorNames = authorName.split(" ");
        const foundBookds = await  this.bookRepository.getBookByAuthorName(splittedAuthorNames);

        if(!foundBookds){
            throw new BadRequestException("No results found.")
        }

        return foundBookds
    }

    async updateBookById(bookId: string, newBook : BookDTO): Promise<Book>{

        const oldBook = this.bookRepository.getBookById(bookId);

        if(!oldBook) {
            throw new BadRequestException("There is no book with this ID.");
        }

        const updatedBook = this.bookRepository.updateBookById(bookId, newBook);

        if(updatedBook) {
            return await this.bookRepository.getBookById(bookId);
        } else {
            throw new BadRequestException("There is a problema on the UPDATE. ");
        }
    }

    async deleteBookById(bookId: string): Promise<Book>{
        try {
            return await this.bookRepository.deleteBookById(bookId);
        } catch (e) {
            throw new BadRequestException("There are no books with this id.")
        }
    }

}
