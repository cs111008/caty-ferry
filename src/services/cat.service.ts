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
        const favoriteMatchedToCat = _.find(_.uniq(favorites), ['image_id', cat.id]);
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
        const getFavoriteRequestOptions = createRequestOptions(
            `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_FAVOURITES}`,
            HTTP_METHODS.GET,
            { "content-type": 'application/json' }
        );
        const favoritesResponse = await fetch(...getFavoriteRequestOptions);
        const favoritesData: any = await favoritesResponse.json();
        if (favoritesResponse.ok) {
            return favoritesData;
        } else {
            console.error(`There is an error occurred while fetching the votes. Please try again. ${favoritesData.message}`); // TODO: error logging and notofocation
        }
    } catch (error: any) {
        console.error(`There is an error occurred while fetching the votes. Please try again. ${error.message || ''}`); // TODO: error logging and notofocation
    }
    return [] as IFavoriteInterface[];
}

const getVotes = async (): Promise<IVoteInterface[]> => {
    try {
        const getVotesRequestOptions = createRequestOptions(
            `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_VOTES}`,
            HTTP_METHODS.GET,
            { "content-type": 'application/json' }
        );
        const votesResponse = await fetch(...getVotesRequestOptions);
        const votesData = await votesResponse.json();
        if (votesResponse.ok) {
            return votesData;
        } else {
            console.error(`There is an error occurred while fetching the votes. Please try again. ${votesData.message}`);// TODO: error logging and notofocation
        }
    } catch (error: any) {
        console.error(`There is an error occurred while fetching the votes. Please try again. ${error.message || ''}`);// TODO: error logging and notofocation
    }
    return [] as IVoteInterface[];
}


const CatService = {
    mergeFavoritesAndVotes,
    getFavorites,
    getVotes
}
export default CatService;