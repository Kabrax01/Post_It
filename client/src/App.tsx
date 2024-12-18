import { useEffect, useState } from "react";
import styles from "./app.module.scss";
import AddPost from "./components/addPost/AddPost";
import PostsList from "./components/postsList/PostsList.tsx";
import { fakePosts } from "./assets/fakePosts.ts";
import { Post } from "./entities/types";

function App() {
    const [posts, setPosts] = useState<Post[]>(fakePosts);
    const [loading, setIsLoading] = useState<boolean>(false);

    const fetchPosts = async () => {
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/posts");
            if (res.status !== 200) throw new Error("Bad server response");

            const data = await res.json();

            setPosts(data.data);
        } catch (error) {
            console.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <main className={styles.main}>
            <AddPost />

            <PostsList posts={posts} loading={loading} />
        </main>
    );
}

export default App;
