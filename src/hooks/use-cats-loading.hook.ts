import { useEffect } from "react";
import useCatContext from "./use-cat-context.hook";

const useCatsLoading = () => {
    const { fetchCats } = useCatContext();

    useEffect(() => {
        fetchCats(true);
    }, [fetchCats])
}

export default useCatsLoading;