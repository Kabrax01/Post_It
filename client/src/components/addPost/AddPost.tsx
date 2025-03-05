import styles from "./addPost.module.scss";
import { useEffect, useRef, useState } from "react";
import { ErrorType, Post } from "../../entities/types";
import formatDate from "../../utils/formatDate";
import { validateForm, validateInput } from "../../utils/validateForm";
import { useStoreSubscribe } from "../../hooks/useStoreSubscribe";

const AddPost = () => {
    const [validation, setValidation] = useState<ErrorType>({});
    const [isHeadingOpen, setIsHeadingOpen] = useState<boolean>(false);
    const [headingSize, setHeadingSize] = useState<number>(0);

    const addPost = useStoreSubscribe("addPost");
    const sending = useStoreSubscribe("sending");

    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const headingSize = headingRef.current?.getBoundingClientRect();

        if (headingSize) setHeadingSize(headingSize.height);
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
                    const status = await addPost(postData as Post);
                    if (status === "success") {
                        formRef.current?.reset();
                        setIsHeadingOpen(false);
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
                height: isHeadingOpen === true ? "100vh" : headingSize,
            }}>
            <header className={styles.header_container}>
                <h1 ref={headingRef}>Post It!</h1>
                <button
                    data-testid="open form button"
                    onClick={() => setIsHeadingOpen((prev) => !prev)}
                    aria-label="expand and collapse post form">
                    <img
                        src="../../../img/arrow_icon.png"
                        className={` ${isHeadingOpen ? styles.open : ""}`}
                        alt="arrow"
                        aria-label="expand and collapse post form"
                    />
                </button>
            </header>
            <form
                data-testid="form"
                style={{ opacity: isHeadingOpen ? "1" : "0" }}
                ref={formRef}
                className={styles.post_form}
                onSubmit={handleSubmit}>
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
                            placeholder="Title"
                            maxLength={50}
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
                            placeholder="Author"
                            maxLength={20}
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
                        placeholder="Type your post content"
                    />
                    <button disabled={sending}>Post it !</button>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
