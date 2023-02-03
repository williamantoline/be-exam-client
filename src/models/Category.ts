import Book from "./Book";

export default interface Category {
    id: string,
    name: string,
    books: Book[],
    createdAt: Date,
    updatedAt: Date,
}