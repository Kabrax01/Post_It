export const createToastSlice = (set) => ({
    toast: { status: false, message: "", error: "" },
    removeToast: () =>
        set((state) => ({ toast: { ...state.toast, status: false } })),
    showToast: (status, message, error) =>
        set({ toast: { status, message, error } }),
});
