export const createConfirmationSlice = (set, get) => ({
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
