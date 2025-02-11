import { useEffect } from "react";
import styles from "./app.module.scss";
import AddPost from "./components/addPost/AddPost";
import PostsList from "./components/postsList/PostsList.tsx";
import { useStoreSubscribe } from "./hooks/useStoreSubscribe.ts";
import Notification from "./components/notification/Notification.tsx";
import ConfirmationModal from "./components/confirmationModal/ConfirmationModal.tsx";

function App() {
    const fetchPosts = useStoreSubscribe("fetchPosts");
    const showConfirmation = useStoreSubscribe("showConfirmation");

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <main className={styles.main}>
            <AddPost />

            <PostsList />

            <Notification />

            {showConfirmation && <ConfirmationModal />}
        </main>
    );
}

export default App;
