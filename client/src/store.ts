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
}));
