import { useContext } from "react";
import { Api } from "./Api";
import ApiContext from "./ApiContext";

export const useApi = (): Api => {
    const api = useContext<Api>(ApiContext);
    return api;
}
