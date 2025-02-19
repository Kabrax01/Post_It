import { PostsSlice, ToastSlice, ConfirmationSlice } from "../entities/types";
import { useBoundStore } from "../store/store";

export const useStoreSubscribe = <
    T extends keyof PostsSlice & ToastSlice & ConfirmationSlice
>(
    variable: T
) => useBoundStore((state) => state[variable]);
