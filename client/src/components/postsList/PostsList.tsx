import styles from "./postList.module.scss";
import { PostsListProps } from "../../entities/types";

const PostsList = ({ posts, loading }: PostsListProps) => {
    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.posts_container}>
            {posts.map((post) => {
                const { id, title, author, content, createdAt } = post;

                return (
                    <article className={styles.post} key={id}>
                        <h3>{title}</h3>
                        <p>Author: {author}</p>
                        <p>{content}</p>
                        <p>Posted {createdAt}</p>
                        <div className={styles.buttons}>
                            <button>delete</button>
                            <button>edit</button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default PostsList;
