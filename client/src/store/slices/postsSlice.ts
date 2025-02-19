import { fetchData } from "../../utils/fetchData";
import { handleError } from "../../utils/handleError";

export const createPostsSlice = (set, get) => ({
    posts: [],
    loading: false,
    sending: false,
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
            const data = await fetchData("/posts", "POST", postData);

            if (data.success) {
                set((state) => ({
                    posts: [data.data, ...state.posts],
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
            const data = await fetchData(`/posts/${mongoId}`, "DELETE", { id });

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

        const postData = { title, author, content };

        try {
            const data = await fetchData(`/posts/${mongoID}`, "PUT", postData);

            if (data.success) {
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
});
