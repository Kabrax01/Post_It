import { useEffect, useState } from "react";
import { PostProps } from "../../entities/types";
import styles from "./post.module.scss";
import EditPost from "../editPost/EditPost";
import { useStoreSubscribe } from "../../hooks/useStoreSubscribe";

const MAX_CHARS = 200;

const Post = ({ post }: PostProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<boolean>(false);
    const [textForDisplay, setTextForDisplay] = useState<string>("");
    const { title, author, content, createdAt, _id: mongoID, id } = post;

    const openConfirmationModal = useStoreSubscribe("openConfirmationModal");

    const exceedsMaxChars = content.length > MAX_CHARS;

    const handleDeleteClick = () => {
        openConfirmationModal({ type: "delete post", data: { mongoID, id } });
    };

    const handleEditClick = () => {
        setEditMode((prev) => !prev);
    };

    useEffect(() => {
        if (!exceedsMaxChars || showMore) {
            setTextForDisplay(content);
        } else {
            setTextForDisplay(content.substring(0, MAX_CHARS) + "...   ");
        }
    }, [content, exceedsMaxChars, showMore]);

    if (editMode)
        return <EditPost handleEditClick={handleEditClick} post={post} />;

    return (
        <li>
            <article className={styles.post}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.author}>
                    Author: <span>{author}</span>
                </p>
                <div className={styles.content}>
                    <p>{textForDisplay}</p>
                    {exceedsMaxChars && (
                        <span onClick={() => setShowMore((prev) => !prev)}>
                            {showMore ? "Show less" : "Show more"}
                        </span>
                    )}
                </div>
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
