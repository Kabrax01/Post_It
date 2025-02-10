import { useStoreSubscribe } from "../../hooks/useStoreSubscribe";
import styles from "./confirmationModal.module.scss";

const ConfirmationModal = () => {
    const confirmationType = useStoreSubscribe("confirmationType");
    const confirmationCallback = useStoreSubscribe("confirmationCallback");

    const handleClick = () => {
        confirmationCallback!();
    };

    return (
        <div className={styles.container}>
            <h3>{confirmationType} 4realz ??</h3>
            <div className={styles.buttons_container}>
                <button onClick={handleClick}>Confirm</button>
                <button>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
