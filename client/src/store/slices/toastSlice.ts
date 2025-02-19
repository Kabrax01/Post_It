import { StateCreator } from "zustand";
import {
    ConfirmationSlice,
    PostsSlice,
    ToastSlice,
} from "../../entities/types";

export const createToastSlice: StateCreator<
    PostsSlice & ToastSlice & ConfirmationSlice,
    [],
    [],
    ToastSlice
> = (set) => ({
    toast: { status: false, message: "", error: "" },
    removeToast: () =>
        set((state) => ({ toast: { ...state.toast, status: false } })),
    showToast: (status, message, error) =>
        set({ toast: { status, message, error } }),
});
