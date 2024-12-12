import styles from "./addPost.module.scss";

const AddPost = () => {
    return (
        <div className={styles.container}>
            <h1>Post It!</h1>
            <form className={styles.post_form}>
                <div className={styles.credentials}>
                    <div className={styles.title}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" />
                    </div>
                    <div className={styles.author}>
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" />
                    </div>
                </div>
                <div className={styles.content}>
                    <label htmlFor="content">Post content</label>
                    <textarea id="content" />
                </div>
                <button>Post it!</button>
            </form>
        </div>
    );
};

export default AddPost;
