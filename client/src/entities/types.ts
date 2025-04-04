export interface Post {
    id: number;
    author: string;
    title: string;
    content: string;
    createdAt: string;
    _id: string;
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

export interface FilterPostProps {
    posts: Post[];
    setFilteredPosts: React.Dispatch<React.SetStateAction<null | Post[]>>;
}

export type FilterType = "author" | "title";

export type ErrorType = {
    [key: string]: string;
};

export interface EditPostProps {
    handleEditClick: () => void;
    post: Post;
}

type NotificationType = {
    status: boolean;
    message: string;
    error?: string;
};

export interface NotificationProps {
    data: NotificationType;
}

interface DeleteConfirmation {
    type: "delete post";
    data: { mongoID: string; id: number };
    callback?: never;
}

interface CancelConfirmation {
    type: "cancel";
    callback: () => void;
    data?: never;
}

type EditPostData = { title: string; author: string; content: string };

export type FetchRequestBody =
    | Post
    | { mongoID: string }
    | { id: number }
    | EditPostData;

export type FetchMethodType = "POST" | "PUT" | "DELETE";

type Confirmation = DeleteConfirmation | CancelConfirmation;

export interface ConfirmationSlice {
    showConfirmation: boolean;
    confirmationData: Confirmation | null;
    openConfirmationModal: (confirmationType: Confirmation) => void;
    closeConfirmationModal: () => void;
}

export interface ToastSlice {
    toast: NotificationType;
    removeToast: () => void;
    showToast: (status: boolean, message: string, error?: string) => void;
}

export interface PostsSlice {
    posts: Post[] | [];
    loading: boolean;
    sending: boolean;
    fetchPosts: () => Promise<void>;
    addPost: (postData: Post) => Promise<string | void>;
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

export type StoreTypeKeys =
    | keyof PostsSlice
    | keyof ToastSlice
    | keyof ConfirmationSlice;
