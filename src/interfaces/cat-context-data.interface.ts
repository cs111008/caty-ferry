import { ICatInterface } from "./cat.interface";

export interface ICatContextData {
    cats: ICatInterface[];
    isLoading: boolean;
    fetchCats: (showLoader: boolean) => void;
    favoriteCat: (cat: ICatInterface) => void;
    voteCat: (cat: ICatInterface, value: number) => void;
}
