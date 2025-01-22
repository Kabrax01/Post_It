import styles from "./postList.module.scss";
import Post from "../post/Post";
import { usePostStore } from "../../store";

const PostsList = () => {
    const { posts, loading } = usePostStore();
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
