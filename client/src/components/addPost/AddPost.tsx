import { useRef, useState } from "react";
import { AddPostProps } from "../../entities/types";
import formatDate from "../../utils/formatDate";
import styles from "./addPost.module.scss";
import validateForm from "../../utils/validateForm";

const AddPost = ({ setPosts, posts }: AddPostProps) => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const authorRef = useRef<HTMLInputElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);

        const form = new FormData(e.currentTarget);
        const title = form.get("title");
        const author = form.get("author");
        const content = form.get("content");
        const id = Date.now();
        const createdAt = formatDate();

        const postForm = async () => {
            try {
                const data = await fetch("http://localhost:5000/api/posts", {
                    method: "POST",
                    body: JSON.stringify({
                        title,
                        author,
                        content,
                        id,
                        createdAt,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                });
                const res = await data.json();

                setPosts([res.data, ...posts]);
            } catch (error) {
                console.error((error as Error).message);
            } finally {
                if (
                    authorRef.current &&
                    titleRef.current &&
                    contentRef.current
                ) {
                    authorRef.current.value = "";
                    titleRef.current.value = "";
                    contentRef.current.value = "";
                }
                setSending(false);
            }
        };

        const errors = validateForm({ title, author, content });
        console.log(errors);
        // postForm();
    };

    return (
        <div className={styles.container}>
            <h1>Post It!</h1>
            <form className={styles.post_form} onSubmit={handleSubmit}>
                <div className={styles.credentials}>
                    <div className={styles.title}>
                        <label htmlFor="title">Title</label>
                        <input
                            ref={titleRef}
                            type="text"
                            id="title"
                            name="title"
                        />
                    </div>
                    <div className={styles.author}>
                        <label htmlFor="author">Author</label>
                        <input
                            ref={authorRef}
                            type="text"
                            id="author"
                            name="author"
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <label htmlFor="content">Post content</label>
                    <textarea ref={contentRef} id="content" name="content" />
                </div>
                <button disabled={sending}>Post it!</button>
            </form>
        </div>
    );
};

export default AddPost;
