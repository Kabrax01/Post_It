import { PostProps } from "../../entities/types";
import { usePostStore } from "../../store";
import styles from "./post.module.scss";

const Post = ({ post }: PostProps) => {
    const { title, author, content, createdAt, _id: mongoID, id } = post;
    const deletePost = usePostStore((state) => state.deletePost);

    const handleClick = () => {
        deletePost(mongoID!, id);
    };

    return (
        <article className={styles.post}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.author}>
                Author: <span>{author}</span>
            </p>
            <p className={styles.content}>{content}</p>
            <div className={styles.footer}>
                <p className={styles.date}>Posted {createdAt}</p>
                <div className={styles.buttons}>
                    <button onClick={handleClick}>delete</button>
                    <button>edit</button>
                </div>
            </div>
        </article>
    );
};

export default Post;
