import {createContext} from 'react';
import { ICatContextData } from "../interfaces/cat-context-data.interface";

export const CatContext = createContext<ICatContextData | undefined>(undefined);