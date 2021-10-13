import * as React from 'react';
import { useEffect, useState } from 'react';
import { ICatInterface } from '../interfaces/cat.interface';

import { CardList } from '../componets/index';
import { createRequestOptions } from '../factories/fetch.factories';
import { HTTP_METHODS } from '../enums/http-methods.enum'
import API_ENDPOINT_CONSTANTS from '../constants/api-endpoint.constants';

import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import CatService from '../services/cat.service';


const Home = () => {
    let [catData, setCatData] = useState<ICatInterface[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCatList(true);
    }, []);


    const fetchCatList = async (isLoading = false) => {
        try {
            setLoading(isLoading);
            const getCatListRequestArgs = createRequestOptions(
                HTTP_METHODS.GET,
                `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_LIST}?limit=100`,
                { "content-type": 'application/json' }
            );
            const catListResult = await fetch(...getCatListRequestArgs);
            const catListJson: any = await catListResult.json();
            if (catListResult.ok) {
                const favorites = await CatService.getFavorites();
                const votes = await CatService.getVotes();
                const catsWithFavAndVotes = CatService.mergeFavoritesAndVotes(catListJson, favorites, votes);
                console.log('catList=====>', catsWithFavAndVotes);
                setCatData(catsWithFavAndVotes);
            } else {
                console.log(`There is an error occurred while fetching the list of cats. Please try again. ${catListJson.message}`);
            }
            setLoading(false);
        } catch (e: any) {
            console.log(`There is an error occurred while fetching the list of cats. Please try again. ${e.message || ''}`);
        }
    }

    const voteHandler = async (targetCat: ICatInterface, value: number) => {
        const targetCatIndex = catData.findIndex(cat => cat.id === targetCat.id);
        const catsCopy = [...catData];
        catsCopy[targetCatIndex].disableVoting = true;
        setCatData(catsCopy);

        const votePayload = {
            image_id: targetCat.id,
            value: value
        };
        try {
            const setCatVoteReq = createRequestOptions(
                HTTP_METHODS.POST,
                `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_VOTES}`,
                { "content-type": 'application/json' },
                JSON.stringify(votePayload)
            );
            const catVoteResult = await fetch(...setCatVoteReq);
            const catVoteRespJson: any = await catVoteResult.json();
            if (catVoteResult.ok) {
                console.log(`Your vote has been registered.`);
                fetchCatList();
            } else {
                console.error(`There is an error occurred while registering your vote. Please try again. ${catVoteRespJson.message}`);
            }
        } catch (err) {
            console.error(`There is an error occurred while registering your vote. Please try again. ${err || ''}`);
        }
    }

    const favoriteHandler = async (targetCat: ICatInterface) => {
        const targetCatIndex = catData.findIndex(cat => cat.id === targetCat.id);
        const catsCopy = [...catData];
        catsCopy[targetCatIndex].disableFavorite = true;
        setCatData(catsCopy);

        const favoritePayload = {
            image_id: targetCat.id
        };
        const messageText = targetCat.isFavourite ? 'unfavorite' : 'favorite';
        try {
            let setCatFavoriteReq;

            if (targetCat.isFavourite) {
                setCatFavoriteReq = createRequestOptions(
                    HTTP_METHODS.DELETE,
                    `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_FAVOURITES}/${targetCat.favoriteId}`,
                    { "content-type": 'application/json' }
                );
            } else {
                setCatFavoriteReq = createRequestOptions(
                    HTTP_METHODS.POST,
                    `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_FAVOURITES}`,
                    { "content-type": 'application/json' },
                    JSON.stringify(favoritePayload)
                );
            }

            const catFavoriteResult = await fetch(...setCatFavoriteReq);
            const catVoteFavoriteJson: any = await catFavoriteResult.json();
            if (catFavoriteResult.ok) {
                console.log(`The cat is set as ${messageText}.`);
                fetchCatList();
            } else {
                console.log(`There is an error occurred while setting the cat as ${messageText}. Please try again. ${catVoteFavoriteJson.message}`);
            }
        } catch (err) {
            console.log(`There is an error occurred while setting the cat as ${messageText}. Please try again. ${err || ''}`);
        }
    }

    const loader = (
        <Container fixed>
            <Box sx={{ display: 'flex', height: '60vh' }} justifyContent="center">
                <CircularProgress />
            </Box>
        </Container>
    )

    return loading ? loader : <CardList cards={catData} onFavorite={favoriteHandler} onVote={voteHandler} />

}
export default Home;