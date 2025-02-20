import { StoreTypeKeys } from "../entities/types";
import { useBoundStore } from "../store/store";

export const useStoreSubscribe = <T extends StoreTypeKeys>(variable: T) =>
    useBoundStore((state) => state[variable]);
