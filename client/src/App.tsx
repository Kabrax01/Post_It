import { useEffect } from "react";
import styles from "./app.module.scss";
import AddPost from "./components/addPost/AddPost";
import PostsList from "./components/postsList/PostsList.tsx";
import { usePostStore } from "./store.ts";

function App() {
    const { setPosts, setLoading } = usePostStore();

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/posts");
            if (res.status !== 200) throw new Error("Bad server response");

            const data = await res.json();

            setPosts(data.data.reverse());
        } catch (error) {
            console.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <main className={styles.main}>
            <AddPost />

            <PostsList />
        </main>
    );
}

export default App;
