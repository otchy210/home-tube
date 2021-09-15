import { GetHandler } from "./Handler"

export const getPing: GetHandler = {
    getPath: () => '/ping',
    handle: () => {
        return true;
    }
}