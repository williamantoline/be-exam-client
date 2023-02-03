import Book from "./Book";
import User from "./User";

export default interface Borrowing {
    id: string,
    userId: string,
    bookId: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    user: User,
    book: Book,
}