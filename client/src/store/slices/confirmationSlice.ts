import { StateCreator } from "zustand";
import {
    PostsSlice,
    ToastSlice,
    ConfirmationSlice,
} from "../../entities/types";

export const createConfirmationSlice: StateCreator<
    PostsSlice & ToastSlice & ConfirmationSlice,
    [],
    [],
    ConfirmationSlice
> = (set) => ({
    showConfirmation: false,
    confirmationData: null,
    openConfirmationModal: (confirmationData) =>
        set(() => ({
            showConfirmation: true,
            confirmationData,
        })),
    closeConfirmationModal: () =>
        set(() => ({
            showConfirmation: false,
            confirmationType: null,
        })),
});
