import { create } from "zustand";
import { InitialState, PostStore } from "./entities/types";

const initialState: InitialState = {
    posts: [],
    loading: false,
    sending: false,
};

export const usePostStore = create<PostStore>((set, get) => ({
    ...initialState,
    setLoading: (loading) => set({ loading }),
    setSending: (sending) => set({ sending }),
    setPosts: (data) => set({ posts: data }),
    addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
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
                }));
            }
        } catch (error) {
            console.log(`${(error as Error).message}`);
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
