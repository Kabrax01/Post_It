import styles from "./postList.module.scss";
import Post from "../post/Post";
import { useStoreSubscribe } from "../../hooks/useStoreSubscribe";

const PostsList = () => {
    const posts = useStoreSubscribe("posts");
    const loading = useStoreSubscribe("loading");

    if (loading)
        return (
            <div className={styles.loader_container}>
                Loading... <span className={styles.loader}></span>{" "}
            </div>
        );

    return (
        <div className={styles.posts_container}>
            <ul className={styles.posts_list}>
                {!posts.length ? (
                    <p className={styles.placeholder}>No posts to display...</p>
                ) : (
                    posts.map((post) => <Post post={post} key={post.id} />)
                )}
            </ul>
        </div>
    );
};

export default PostsList;
