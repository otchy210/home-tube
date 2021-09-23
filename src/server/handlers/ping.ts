import { GetHandler } from "./Handler"

export const getPing: GetHandler = {
    getPath: () => '/ping',
    handle: async () => {
        return true;
    }
}