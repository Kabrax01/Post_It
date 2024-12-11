import styles from "./postList.module.scss";
import { Posts } from "../../entities/types";

const PostsList = ({ posts }: Posts) => {
    return (
        <div className={styles.posts_container}>
            {posts.map((post) => {
                return (
                    <article className={styles.post} key={post.id}>
                        <h3>{post.title}</h3>
                        <p>Author: {post.author}</p>
                        <p>{post.content}</p>
                        <p>Posted {post.createdAt}</p>
                        <div className={styles.buttons}>
                            <button>delete</button>
                            <button>edit</button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default PostsList;
