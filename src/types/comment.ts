import { User } from "./user"

export type CommentType = {
    id: number,
    userId: number,
    postId: number,
    image: string | null,
    publicId: string | null,
    comment: string,
    user: User
    _count: {
        reply: number,
    }
    createdAt: string,
    updatedAt: string
}