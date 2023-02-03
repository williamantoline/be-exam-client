export default interface Notification {
    id: string,
    type: string,
    subject: string,
    body: string,
    read_at: Date,
}