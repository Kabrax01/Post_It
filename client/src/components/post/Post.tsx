import { PostProps } from "../../entities/types";
import styles from "./post.module.scss";

const Post = ({ post }: PostProps) => {
    const { title, author, content, createdAt } = post;

    return (
        <article className={styles.post}>
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
};

export default Post;
