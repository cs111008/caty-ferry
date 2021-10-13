import _ from 'lodash';
import API_ENDPOINT_CONSTANTS from '../constants/api-endpoint.constants';
import { HTTP_METHODS } from '../enums/http-methods.enum'
import { createRequestOptions } from '../factories/fetch.factories';
import { ICatInterface } from '../interfaces/cat.interface';
import { IFavoriteInterface } from '../interfaces/favorite.interface';
import { IVoteInterface } from '../interfaces/vote.interface';

const mergeFavoritesAndVotes = (catData: ICatInterface[], favorites: IFavoriteInterface[], votes: IVoteInterface[]): ICatInterface[] => {
    const cats = [...catData];
    const getTotalVoteCount = (catId: string): number => {
        const votesMatchedToCat = _.filter(votes, ['image_id', catId]);
        let totalVoteCount = 0;
        votesMatchedToCat.forEach((vote: any) => {
            if (vote.value) {
                totalVoteCount += vote.value
            } else {
                totalVoteCount -= 1;
            }
        });
        return totalVoteCount;
    }
    return cats.map(cat => {
        const favoriteMatchedToCat = _.find(favorites, ['image_id', cat.id]);
        if (favoriteMatchedToCat) {  // Update the favorites
            cat.favoriteId = favoriteMatchedToCat.id;
            cat.isFavourite = true;
        }

        cat.votes = getTotalVoteCount(cat.id); //Update Votes        
        return cat;
    });
}

const getFavorites = async (): Promise<IFavoriteInterface[]> => {
    try {
        const getFavoriteRequestArgs = createRequestOptions(
            HTTP_METHODS.GET,
            `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_FAVOURITES}`,
            { "content-type": 'application/json' }
        );
        const favoriteResult = await fetch(...getFavoriteRequestArgs);
        const favoriteResultJson: any = await favoriteResult.json();
        if (favoriteResult.ok) {
            return favoriteResultJson;
        } else {
            console.error(`There is an error occurred while fetching the votes. Please try again. ${favoriteResultJson.message}`);
        }
    } catch (e: any) {
        console.error(`There is an error occurred while fetching the votes. Please try again. ${e.message || ''}`);
        //setLoading(false);
    }
    return [] as IFavoriteInterface[];
}

const getVotes = async (): Promise<IVoteInterface[]> => {
    try {
        const getVotesRequestArgs = createRequestOptions(
            HTTP_METHODS.GET,
            `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_VOTES}`,
            { "content-type": 'application/json' }
        );
        const votesResult = await fetch(...getVotesRequestArgs);
        const votesResultJson = await votesResult.json();
        if (votesResult.ok) {
            return votesResultJson;
        } else {
            console.error(`There is an error occurred while fetching the votes. Please try again. ${votesResultJson.message}`);

        }
    } catch (e: any) {
        console.error(`There is an error occurred while fetching the votes. Please try again. ${e.message || ''}`);

    }
    return [] as IVoteInterface[];
}

const getCatList = async () => {
    try {
        const getCatListRequest = createRequestOptions(
            HTTP_METHODS.GET,
            `https://api.thecatapi.com${API_ENDPOINT_CONSTANTS.CAT_LIST}`,
            { "content-type": 'application/json' }
        );
        const response = await fetch(...getCatListRequest);
        const catList: any = await response.json();
        if (response.ok) {
            return catList;
        } else {
            console.log(`There is an error occurred while fetching the list of cats. Please try again. ${catList.message}`);
        }
    } catch (e: any) {
        console.log(`There is an error occurred while fetching the list of cats. Please try again. ${e.message || ''}`);
    }
}



const CatService = {
    mergeFavoritesAndVotes,
    getCatList,
    getFavorites,
    getVotes
}
export default CatService;