export interface Posts {
    posts: Post[];
}

export interface Post {
    id: string;
    author: string;
    title: string;
    content: string;
    createdAt: string;
}
