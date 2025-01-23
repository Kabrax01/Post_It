// export interface Posts {
//     posts: Post[];
// }

export interface Post {
    id: number;
    author: string;
    title: string;
    content: string;
    createdAt: string;
    _id?: string;
}

export interface PostsListProps {
    posts: Post[];
    loading: boolean;
}

export interface PostProps {
    post: Post;
}

// export interface AddPostProps {
//     setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
//     posts: Post[];
// }

export interface PostData {
    author: FormDataEntryValue | null;
    title: FormDataEntryValue | null;
    content: FormDataEntryValue | null;
}

export type ErrorType = {
    [key: string]: string;
};

export interface InitialState {
    posts: Post[] | [];
    loading: boolean;
}

export interface PostStore extends InitialState {
    setLoading: (loading: boolean) => void;
    setPosts: (data: Post[]) => void;
    addPost: (post: Post) => void;
    fetchPosts: () => Promise<void>;
    deletePost: (mongoId: string, id: number) => Promise<void>;
}
