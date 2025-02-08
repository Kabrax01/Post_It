import styles from "./addPost.module.scss";
import { useEffect, useRef, useState } from "react";
import { ErrorType, Post } from "../../entities/types";
import formatDate from "../../utils/formatDate";
import { validateForm, validateInput } from "../../utils/validateForm";
import { usePostStore } from "../../store";

const AddPost = () => {
    const [validation, setValidation] = useState<ErrorType>({});
    const [isHeadingOpen, setIsHeadingOpen] = useState<boolean>(true);
    const [headingSize, setHeadingSize] = useState<number>(0);

    const addPost = usePostStore((state) => state.addPost);
    const sending = usePostStore((state) => state.sending);
    const success = usePostStore((state) => state.success);

    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const headingSize = headingRef.current?.getBoundingClientRect();

        if (headingSize) setHeadingSize(headingSize.height + 32);
    }, [isHeadingOpen]);

    const inputValidation = (
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

        const postData = { title, author, content, id, createdAt };

        const formValidationCheck = () => {
            const errors = validateForm({ title, author, content });

            if (Object.keys(errors).length === 0) {
                setValidation({});
                (async () => {
                    await addPost(postData as Post);
                    if (success) {
                        formRef.current?.reset();
                    }
                })();
            } else {
                setValidation(errors);
            }
        };

        formValidationCheck();
    };

    return (
        <div
            className={styles.container}
            style={{
                maxHeight: isHeadingOpen === true ? "50rem" : headingSize,
            }}>
            <div className={styles.heading_container}>
                <h1 ref={headingRef}>Post It!</h1>
                <img
                    src="../../../img/arrow_icon.png"
                    className={`${styles.arrow} ${
                        isHeadingOpen ? styles.open : ""
                    }`}
                    alt="arrow"
                    role="button"
                    aria-label="expand and collapse post form"
                    onClick={() => setIsHeadingOpen((prev) => !prev)}
                />
            </div>
            <form
                ref={formRef}
                className={styles.post_form}
                onSubmit={handleSubmit}
                style={{
                    opacity: isHeadingOpen === true ? "1" : "0",
                }}>
                <div className={styles.credentials}>
                    <div className={styles.title}>
                        <label htmlFor="title">Title</label>
                        {validation?.title && (
                            <span className={styles.error}>
                                <img src="../../../img/error_icon.png"></img>
                                {validation.title}
                            </span>
                        )}
                        <input
                            onChange={inputValidation}
                            type="text"
                            id="title"
                            name="title"
                        />
                    </div>
                    <div className={styles.author}>
                        <label htmlFor="author">Author</label>
                        {validation?.author && (
                            <span className={styles.error}>
                                <img src="../../../img/error_icon.png"></img>
                                {validation.author}
                            </span>
                        )}
                        <input
                            onChange={inputValidation}
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
                            <img src="../../../img/error_icon.png"></img>
                            {validation.content}
                        </span>
                    )}
                    <textarea
                        onChange={inputValidation}
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
