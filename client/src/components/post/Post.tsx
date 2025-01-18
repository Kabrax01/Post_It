import { PostProps } from "../../entities/types";
import styles from "./post.module.scss";

const Post = ({ post }: PostProps) => {
    const { title, author, content, createdAt, _id } = post;

    const deletePost = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${_id!}`, {
                method: "DELETE",
                body: JSON.stringify({
                    _id,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(`${(error as Error).message}`);
        }
    };

    return (
        <article className={styles.post}>
            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>{content}</p>
            <p>Posted {createdAt}</p>
            <div className={styles.buttons}>
                <button onClick={deletePost}>delete</button>
                <button>edit</button>
            </div>
        </article>
    );
};

export default Post;
