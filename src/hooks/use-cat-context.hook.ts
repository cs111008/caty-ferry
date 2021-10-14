import { useContext } from "react";
import { CatContext } from "../contexts/cat.context";


const useCatContext = () => {
    const catContext = useContext(CatContext);
    if (!catContext) {
      throw new Error('useCatContext must be used within the CatContext.Provider');
    }
    return catContext;
}

export default useCatContext;