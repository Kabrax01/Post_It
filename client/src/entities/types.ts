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

export interface PostData {
    author: FormDataEntryValue | null;
    title: FormDataEntryValue | null;
    content: FormDataEntryValue | null;
}

export type ErrorType = {
    [key: string]: string;
};

export interface EditPostProps {
    handleEditClick: () => void;
    post: Post;
}
export interface InitialState {
    posts: Post[] | [];
    loading: boolean;
    sending: boolean;
}

export interface PostStore extends InitialState {
    setLoading: (loading: boolean) => void;
    setSending: (sending: boolean) => void;
    setPosts: (data: Post[]) => void;
    fetchPosts: () => Promise<void>;
    addPost: (postData: Post) => Promise<void>;
    deletePost: (mongoId: string, id: number) => Promise<void>;
    editPost: (
        mongoId: string,
        title: string,
        author: string,
        content: string,
        id: number,
        handleEditClick: () => void
    ) => Promise<void>;
}
