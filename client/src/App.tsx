import { useState } from "react";
import styles from "./app.module.scss";
import AddPost from "./components/addPost/AddPost";
import PostsList from "./components/postsList/PostsList.tsx";
import { fakePosts } from "./assets/fakePosts.ts";
import { Post } from "./entities/types";

function App() {
    const [posts, setPosts] = useState<Post[]>(fakePosts);

    return (
        <main className={styles.main}>
            <AddPost />
            <PostsList posts={posts} />
        </main>
    );
}

export default App;
