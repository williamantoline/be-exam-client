export default interface Book {
    id: string,
    title: string,
    author?: string,
    publisher?: string,
    description?: string,
    page?: number,
    language?: string,
    stock: number,
    image?: string,
    category: any,
    createdAt: Date,
    updatedAt: Date,
}