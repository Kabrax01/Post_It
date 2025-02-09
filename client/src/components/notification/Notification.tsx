// import { NotificationProps } from "../../entities/types";
import { useEffect, useState } from "react";
import { useStoreSubscribe } from "../../hooks/useStoreSubscribe";
import styles from "./notification.module.scss";

const Notification = () => {
    const [progressValue, setProgressValue] = useState<number>(1);
    const toast = useStoreSubscribe("toast");
    const removeToast = useStoreSubscribe("removeToast");

    const DELAY = 3000;

    useEffect(() => {
        setProgressValue(1);

        const progressInterval = setInterval(() => {
            setProgressValue((prev) => prev + 1);
        }, DELAY / 100);

        const delay = setTimeout(() => {
            removeToast();
        }, DELAY);

        return () => {
            clearTimeout(delay);
            clearInterval(progressInterval);
        };
    }, [toast, removeToast]);

    return (
        <div
            className={`${styles.container} ${toast.status ? styles.show : ""}`}
            style={{ boxShadow: toast.error ? "0 0 10px 10px red" : "" }}>
            <p className={styles.message}>
                {toast.message} {toast.error ? "😥" : "🥳"}
            </p>
            {toast.error && <p className={styles.error}>{toast.error}</p>}
            <progress value={progressValue} max={100}></progress>
        </div>
    );
};

export default Notification;
