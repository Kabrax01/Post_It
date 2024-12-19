export interface Posts {
    posts: Post[];
}

export interface Post {
    id: number;
    author: string;
    title: string;
    content: string;
    createdAt: string;
}

export interface PostsListProps {
    posts: Post[];
    loading: boolean;
}

export interface AddPostProps {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    posts: Post[];
}
