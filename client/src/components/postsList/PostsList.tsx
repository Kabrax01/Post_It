import styles from "./postList.module.scss";
import Post from "../post/Post";
import { useStoreSubscribe } from "../../hooks/useStoreSubscribe";
import FilterPosts from "../filterPosts/FilterPosts";
import { useState } from "react";
import { Post as PostType } from "../../entities/types";

const PostsList = () => {
    const [filteredPosts, setFilteredPosts] = useState<null | PostType[]>(null);

    const posts = useStoreSubscribe("posts");
    const loading = useStoreSubscribe("loading");

    const postsToDisplay = !filteredPosts ? posts : filteredPosts;

    if (loading)
        return (
            <div className={styles.loader_container}>
                Loading... <span className={styles.loader}></span>
            </div>
        );

    return (
        <div className={styles.posts_container}>
            <FilterPosts posts={posts} setFilteredPosts={setFilteredPosts} />
            <ul className={styles.posts_list}>
                {!posts.length ? (
                    <p className={styles.placeholder}>No posts to display...</p>
                ) : (
                    postsToDisplay.map((post) => (
                        <Post post={post} key={post.id} />
                    ))
                )}
            </ul>
        </div>
    );
};

export default PostsList;
