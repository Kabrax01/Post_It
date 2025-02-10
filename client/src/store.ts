import { create } from "zustand";
import { InitialState, PostStore } from "./entities/types";
import { handleError } from "./utils/handleError";

const initialState: InitialState = {
    posts: [],
    loading: false,
    sending: false,
    toast: { status: false, message: "", error: "" },
};

export const usePostStore = create<PostStore>((set, get) => ({
    ...initialState,
    removeToast: () =>
        set((state) => ({ toast: { ...state.toast, status: false } })),
    showToast: (status, message, error) =>
        set({ toast: { status, message, error } }),
    fetchPosts: async () => {
        set({ loading: true });
        try {
            const res = await fetch("http://localhost:5000/api/posts");
            if (res.status !== 200) throw new Error("Bad server response");

            const data = await res.json();

            set({ posts: data.data.reverse() });
        } catch (error) {
            handleError(error, "Failed downloading data...");
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
                }));
                get().showToast(true, "Post added !");

                return "success";
            }
        } catch (error) {
            handleError(error, "Failed adding post...");
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
                        status: true,
                        message: "Post removed !",
                    },
                }));
            }
        } catch (error) {
            handleError(error, "Failed deleting post...");
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

                set(() => ({
                    posts: updatedPosts,
                    toast: {
                        status: true,
                        message: "Post edited !",
                    },
                }));
                handleEditClick();
            }
        } catch (error) {
            handleError(error, "Post edit failed...");
        } finally {
            set({ sending: false });
        }
    },
}));
