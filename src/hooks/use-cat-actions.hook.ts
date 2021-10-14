import { useCallback } from "react";
import { ICatInterface } from "../interfaces/cat.interface";
import useCatContext from "./use-cat-context.hook";

const useCatActions = () => {
    const { cats, favoriteCat, voteCat, isLoading } = useCatContext();

    const handleFavoriteCat = useCallback((cat: ICatInterface) => () => {
        favoriteCat(cat);
    }, [favoriteCat]);

    const handleVoteCat = useCallback((cat: ICatInterface, count: number) => () => {
        voteCat(cat, count);
    }, [voteCat]);

    return {
        handleFavoriteCat,
        handleVoteCat,
        cats,
        isLoading
    }
}

export default useCatActions;