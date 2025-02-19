import { useBoundStore } from "../store/store";

const getErrorMessage = (error: unknown) => {
    return error instanceof Error ? error.message : "Unknown error";
};

export const handleError = (error: unknown, message: string) => {
    const showToast = useBoundStore.getState().showToast;
    const errorMessage = getErrorMessage(error);

    console.error(errorMessage);
    showToast(true, message, errorMessage);
};
