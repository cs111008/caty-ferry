import { useState, useCallback, useMemo } from "react";
import { useSnackbar } from 'notistack';
import API_ENDPOINT_CONSTANTS from "../constants/api-endpoint.constants";
import { NOTIFICATION_MESSAGES } from "../constants/app.constants";
import { HTTP_METHODS } from "../enums/http-methods.enum";
import { createRequestOptions } from "../factories/fetch.factories";
import { ICatContextData } from "../interfaces/cat-context-data.interface";
import { ICatInterface } from "../interfaces/cat.interface";
import CatService from "../services/cat.service";

const useCatContextValue = (): ICatContextData => {
  const { enqueueSnackbar } = useSnackbar();
  const [cats, setCats] = useState<ICatInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCats = useCallback(async (showLoader = false) => {

    try {
      setIsLoading(showLoader);
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
        setCats(catsWithFavAndVotes);
      } else {
        enqueueSnackbar(`${NOTIFICATION_MESSAGES.CAT_FETCH_FAILED}: ${catListJson.message}`, { variant: 'error' });
      }
      setIsLoading(false);
    } catch (e: any) {
      enqueueSnackbar(`${NOTIFICATION_MESSAGES.CAT_FETCH_FAILED}: ${e.message}`, { variant: 'error' });
    }

  }, [enqueueSnackbar, setCats]);

  const favoriteCat = useCallback(async (selectedCat: ICatInterface) => {
    const selectedCatIndex = cats.findIndex(cat => cat.id === selectedCat.id);
    const catsCopy = [...cats];
    catsCopy[selectedCatIndex].disableFavorite = true;
    setCats(catsCopy);

    const favoritePayload = {
      image_id: selectedCat.id
    };
    const messageText = selectedCat.isFavourite ? 'unfavorite' : 'favorite';
    try {
      let setCatFavoriteReq;

      if (selectedCat.isFavourite) {
        setCatFavoriteReq = createRequestOptions(
          HTTP_METHODS.DELETE,
          `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_FAVOURITES}/${selectedCat.favoriteId}`,
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
        enqueueSnackbar(`${NOTIFICATION_MESSAGES.FAVOURITES_SUCCESS} ${messageText}`, { variant: 'success' });
        fetchCats();
      } else {
        enqueueSnackbar(`${NOTIFICATION_MESSAGES.FAVOURITES_FAILED} ${messageText}: ${catVoteFavoriteJson.message}`, { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar(`${NOTIFICATION_MESSAGES.FAVOURITES_FAILED} ${messageText}: ${err}`, { variant: 'error' });
    }

  }, [cats, enqueueSnackbar, fetchCats]);

  const voteCat = useCallback(async (selectedCat: ICatInterface, count: number) => {

    const selectedCatIndex = cats.findIndex(cat => cat.id === selectedCat.id);
    const catsCopy = [...cats];
    catsCopy[selectedCatIndex].disableVoting = true;
    setCats(catsCopy);

    const votePayload = {
      image_id: selectedCat.id,
      value: count
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
        enqueueSnackbar(NOTIFICATION_MESSAGES.VOTE_SUCCESS, { variant: 'success' });
        fetchCats();
      } else {
        enqueueSnackbar(`${NOTIFICATION_MESSAGES.VOTE_FAILED}: ${catVoteRespJson.message}`, { variant: 'error' });
      }
    } catch (err) {
      enqueueSnackbar(`${NOTIFICATION_MESSAGES.VOTE_FAILED}: ${err}`, { variant: 'error' });
    }

  }, [cats, enqueueSnackbar, fetchCats]);

  return useMemo(() => ({
    cats,
    isLoading,
    fetchCats,
    favoriteCat,
    voteCat
  }), [
    cats,
    isLoading,
    fetchCats,
    favoriteCat,
    voteCat
  ]);
}

export default useCatContextValue;
