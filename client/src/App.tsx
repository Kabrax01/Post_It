import styles from "./app.module.scss";
import AddPost from "./components/addPost/AddPost";

function App() {
    return (
        <main className={styles.main}>
            <AddPost />
        </main>
    );
}

export default App;
