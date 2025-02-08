import { PostStore } from "../entities/types";
import { usePostStore } from "../store";

export const useStoreSubscribe = <T extends keyof PostStore>(variable: T) =>
    usePostStore((state) => state[variable]);
