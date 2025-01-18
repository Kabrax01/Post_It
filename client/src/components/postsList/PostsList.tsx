import styles from "./postList.module.scss";
import { PostsListProps } from "../../entities/types";
import Post from "../post/Post";

const PostsList = ({ posts, loading }: PostsListProps) => {
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
