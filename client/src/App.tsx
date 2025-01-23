import { useEffect } from "react";
import styles from "./app.module.scss";
import AddPost from "./components/addPost/AddPost";
import PostsList from "./components/postsList/PostsList.tsx";
import { usePostStore } from "./store.ts";

function App() {
    const fetchPosts = usePostStore((state) => state.fetchPosts);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <main className={styles.main}>
            <AddPost />

            <PostsList />
        </main>
    );
}

export default App;
