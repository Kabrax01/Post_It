import styles from "./addPost.module.scss";
import { useRef, useState } from "react";
import { AddPostProps, ErrorType } from "../../entities/types";
import formatDate from "../../utils/formatDate";
import { validateForm, validateInput } from "../../utils/validateForm";

const AddPost = ({ setPosts, posts }: AddPostProps) => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const authorRef = useRef<HTMLInputElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    const [sending, setSending] = useState(false);
    const [validation, setValidation] = useState<ErrorType>({});

    const validate = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.currentTarget;
        const error = validateInput(e.currentTarget.value);
        if (error) {
            setValidation({ ...validation, [target.name]: error });
        } else {
            setValidation((current) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [target.name]: _, ...rest } = current;

                return rest;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const title = form.get("title");
        const author = form.get("author");
        const content = form.get("content");
        const id = Date.now();
        const createdAt = formatDate();

        const postForm = async () => {
            setSending(true);
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

        const formValidationCheck = () => {
            const errors = validateForm({ title, author, content });

            if (Object.keys(errors).length === 0) {
                setValidation({});
                postForm();
            } else {
                setValidation(errors);
            }
        };

        formValidationCheck();
    };

    return (
        <div className={styles.container}>
            <h1>Post It!</h1>
            <form className={styles.post_form} onSubmit={handleSubmit}>
                <div className={styles.credentials}>
                    <div className={styles.title}>
                        <label htmlFor="title">Title</label>
                        {validation?.title && (
                            <span className={styles.error}>
                                <img src="../../../img/error_4457164.png"></img>
                                {validation.title}
                            </span>
                        )}
                        <input
                            ref={titleRef}
                            onChange={validate}
                            type="text"
                            id="title"
                            name="title"
                        />
                    </div>
                    <div className={styles.author}>
                        <label htmlFor="author">Author</label>
                        {validation?.author && (
                            <span className={styles.error}>
                                <img src="../../../img/error_4457164.png"></img>
                                {validation.author}
                            </span>
                        )}
                        <input
                            ref={authorRef}
                            onChange={validate}
                            type="text"
                            id="author"
                            name="author"
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <label htmlFor="content">Post content</label>
                    {validation?.content && (
                        <span className={styles.error}>
                            <img src="../../../img/error_4457164.png"></img>
                            {validation.content}
                        </span>
                    )}
                    <textarea
                        ref={contentRef}
                        onChange={validate}
                        id="content"
                        name="content"
                    />
                </div>
                <button disabled={sending}>Post it!</button>
            </form>
        </div>
    );
};

export default AddPost;
