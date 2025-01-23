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
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>{content}</p>
            <p>Posted {createdAt}</p>
            <div className={styles.buttons}>
                <button onClick={handleClick}>delete</button>
                <button>edit</button>
            </div>
        </article>
    );
};

export default Post;
