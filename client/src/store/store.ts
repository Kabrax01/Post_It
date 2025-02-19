import { create } from "zustand";
import { createPostsSlice } from "./slices/postsSlice";
import { createToastSlice } from "./slices/toastSlice";
import { createConfirmationSlice } from "./slices/confirmationSlice";

export const useBoundStore = create((...a) => ({
    ...createPostsSlice(...a),
    ...createToastSlice(...a),
    ...createConfirmationSlice(...a),
}));
