import styles from "./editPost.module.scss";
import { useState } from "react";
import { EditPostProps, ErrorType } from "../../entities/types";
import { validateForm, validateInput } from "../../utils/validateForm";
import { useStoreSubscribe } from "../../hooks/useStoreSubscribe";

const EditPost = ({
    handleEditClick,
    post: {
        title: postTitle,
        author: postAuthor,
        content: postContent,
        _id: mongoID,
        id,
    },
}: EditPostProps) => {
    const [validation, setValidation] = useState<ErrorType>({});
    const [title, setTitle] = useState<string>(postTitle);
    const [author, setAuthor] = useState<string>(postAuthor);
    const [content, setContent] = useState<string>(postContent);

    const sending = useStoreSubscribe("sending");
    const editPost = useStoreSubscribe("editPost");
    const openConfirmationModal = useStoreSubscribe("openConfirmationModal");

    const handleCancelClick = () => {
        openConfirmationModal({ type: "cancel", callback: handleEditClick });
    };

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

        const formValidationCheck = () => {
            const errors = validateForm({ title, author, content });

            if (Object.keys(errors).length === 0) {
                setValidation({});
                editPost(mongoID!, title, author, content, id, handleEditClick);
            } else {
                setValidation(errors);
            }
        };

        formValidationCheck();
    };

    return (
        <div className={styles.container}>
            <form className={styles.post_form} onSubmit={handleSubmit}>
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
                            onChange={(e) => {
                                setTitle(e.target.value);
                                inputValidation(e);
                            }}
                            value={title}
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
                            onChange={(e) => {
                                setAuthor(e.target.value);
                                inputValidation(e);
                            }}
                            value={author}
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
                        onChange={(e) => {
                            setContent(e.target.value);
                            inputValidation(e);
                        }}
                        value={content}
                        id="content"
                        name="content"
                        placeholder="Type your post content"
                    />
                </div>
                <div className={styles.buttons_container}>
                    <button disabled={sending}>Edit post</button>
                    <button
                        type="button"
                        disabled={sending}
                        onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
