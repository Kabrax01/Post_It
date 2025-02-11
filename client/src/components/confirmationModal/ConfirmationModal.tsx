import { useStoreSubscribe } from "../../hooks/useStoreSubscribe";
import styles from "./confirmationModal.module.scss";

const ConfirmationModal = () => {
    const confirmationData = useStoreSubscribe("confirmationData");
    const closeConfirmationModal = useStoreSubscribe("closeConfirmationModal");
    const deletePost = useStoreSubscribe("deletePost");

    if (!confirmationData) return;

    const type = confirmationData.type;

    const handleConfirm = () => {
        if (type === "delete post") {
            const { mongoID, id } = confirmationData.data;
            deletePost(mongoID, id);
            closeConfirmationModal();
        }

        if (type === "cancel") {
            confirmationData.callback();
            closeConfirmationModal();
        }
    };

    const handleCancel = () => {
        closeConfirmationModal();
    };

    return (
        <div className={styles.container}>
            <h3>Are you sure you want to {type} ?</h3>
            <div className={styles.buttons_container}>
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
