import styles from "./postList.module.scss";
import Post from "../post/Post";
import { usePostStore } from "../../store";

const PostsList = () => {
    const posts = usePostStore((state) => state.posts);
    const loading = usePostStore((state) => state.loading);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.posts_container}>
            {posts.map((post) => {
                return <Post post={post} key={post.id} />;
            })}
        </div>
    );
};

export default PostsList;
