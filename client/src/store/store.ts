import { create } from "zustand";
import { createPostsSlice } from "./slices/postsSlice";
import { createToastSlice } from "./slices/toastSlice";
import { createConfirmationSlice } from "./slices/confirmationSlice";
import { PostsSlice, ToastSlice, ConfirmationSlice } from "../entities/types";

export const useBoundStore = create<
    PostsSlice & ToastSlice & ConfirmationSlice
>((...a) => ({
    ...createPostsSlice(...a),
    ...createToastSlice(...a),
    ...createConfirmationSlice(...a),
}));
