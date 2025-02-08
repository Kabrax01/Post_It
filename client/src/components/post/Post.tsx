import { useState } from "react";
import { PostProps } from "../../entities/types";
import { usePostStore } from "../../store";
import styles from "./post.module.scss";
import EditPost from "../editPost/EditPost";

const Post = ({ post }: PostProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const { title, author, content, createdAt, _id: mongoID, id } = post;
    const deletePost = usePostStore((state) => state.deletePost);

    const handleDeleteClick = () => {
        deletePost(mongoID!, id);
    };

    const handleEditClick = () => {
        setEditMode((prev) => !prev);
    };

    if (editMode)
        return <EditPost handleEditClick={handleEditClick} post={post} />;

    return (
        <li>
            <article className={styles.post}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.author}>
                    Author: <span>{author}</span>
                </p>
                <p className={styles.content}>{content}</p>
                <div className={styles.footer}>
                    <p className={styles.date}>Posted {createdAt}</p>
                    <div className={styles.buttons}>
                        <button onClick={handleDeleteClick}>delete</button>
                        <button onClick={handleEditClick}>edit</button>
                    </div>
                </div>
            </article>
        </li>
    );
};

export default Post;
