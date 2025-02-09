import { create } from "zustand";
import { InitialState, PostStore } from "./entities/types";

const initialState: InitialState = {
    posts: [],
    loading: false,
    sending: false,
    toast: { type: "", status: true, message: "Post added !", error: "" },
};

export const usePostStore = create<PostStore>((set, get) => ({
    ...initialState,
    removeToast: () =>
        set((state) => ({ toast: { ...state.toast, status: false } })),
    fetchPosts: async () => {
        set({ loading: true });
        try {
            const res = await fetch("http://localhost:5000/api/posts");
            if (res.status !== 200) throw new Error("Bad server response");

            const data = await res.json();

            set({ posts: data.data.reverse() });
        } catch (error) {
            console.error((error as Error).message);
        } finally {
            set({ loading: false });
        }
    },
    addPost: async (postData) => {
        set({ sending: true });
        try {
            const data = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                body: JSON.stringify(postData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const res = await data.json();

            if (res.success) {
                set((state) => ({
                    posts: [res.data, ...state.posts],
                    toast: {
                        type: "success",
                        status: true,
                        message: "Post added !",
                    },
                }));
                return "success";
            }
        } catch (error) {
            console.error((error as Error).message);
            set({
                toast: {
                    type: "error",
                    status: true,
                    message: `Something went wrong...`,
                    error: (error as Error).message,
                },
            });
        } finally {
            set({ sending: false });
        }
    },
    deletePost: async (mongoId, id) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/posts/${mongoId!}`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        id,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );

            const data = await res.json();

            if (data.success) {
                set((state) => ({
                    posts: state.posts.filter((post) => post.id !== id),
                    toast: {
                        type: "success",
                        status: true,
                        message: "Post removed !",
                    },
                }));
            }
        } catch (error) {
            console.log(`${(error as Error).message}`);
            set({
                toast: {
                    type: "error",
                    status: true,
                    message: `Something went wrong...`,
                    error: (error as Error).message,
                },
            });
        }
    },
    editPost: async (mongoID, title, author, content, id, handleEditClick) => {
        set({ sending: true });
        try {
            const data = await fetch(
                `http://localhost:5000/api/posts/${mongoID!}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        title,
                        author,
                        content,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            const res = await data.json();

            if (res.success) {
                const updatedPosts = get().posts.map((post) => {
                    if (post.id === id) {
                        return { ...post, title, author, content };
                    }

                    return post;
                });

                set({ posts: updatedPosts });
                handleEditClick();
            }
        } catch (error) {
            console.error((error as Error).message);
        } finally {
            set({ sending: false });
        }
    },
}));
