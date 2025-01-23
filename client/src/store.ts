import { create } from "zustand";
import { InitialState, PostStore } from "./entities/types";

const initialState: InitialState = {
    posts: [],
    loading: false,
};

export const usePostStore = create<PostStore>((set) => ({
    ...initialState,
    setLoading: (loading) => set({ loading }),
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
}));
