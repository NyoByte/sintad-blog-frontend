import { CommentModel, UserModel } from ".";

export type ArticleModel = {
    id?: number;
    title: string;
    content: string;
    author: UserModel;
    views: number;
    createdAt?: string;
    comments?: CommentModel[];
};

export type ArticleCrudModel = {
    id: number;
    title: string;
    content: string;
}