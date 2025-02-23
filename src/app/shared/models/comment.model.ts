import { UserModel } from ".";

export type CommentModel = {
    id?: number;
    content: string;
    user: UserModel;
    articleId?: number;
    createdAt?: string;
}