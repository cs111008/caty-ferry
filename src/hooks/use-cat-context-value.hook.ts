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
      const getCatListRequestOptions = createRequestOptions(
        `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_LIST}?limit=100`,
        HTTP_METHODS.GET,
        { "content-type": 'application/json' }
      );
      const catListResponse = await fetch(...getCatListRequestOptions);
      const catListData: any = await catListResponse.json();
      if (catListResponse.ok) {
        const favorites = await CatService.getFavorites();
        const votes = await CatService.getVotes();
        const catsWithFavAndVotes = CatService.mergeFavoritesAndVotes(catListData, favorites, votes);
        setCats(catsWithFavAndVotes);
      } else {
        enqueueSnackbar(`${NOTIFICATION_MESSAGES.CAT_FETCH_FAILED}: ${catListData.message}`, { variant: 'error' });
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
      let setFavoriteCatRequestOptions;

      if (selectedCat.isFavourite) {
        setFavoriteCatRequestOptions = createRequestOptions(
          `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_FAVOURITES}/${selectedCat.favoriteId}`,
          HTTP_METHODS.DELETE,
          { "content-type": 'application/json' }
        );
      } else {
        setFavoriteCatRequestOptions = createRequestOptions(
          `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_FAVOURITES}`,
          HTTP_METHODS.POST,
          { "content-type": 'application/json' },
          JSON.stringify(favoritePayload)
        );
      }

      const favoriteCatResponse = await fetch(...setFavoriteCatRequestOptions);
      const favoriteCatData = await favoriteCatResponse.json();
      if (favoriteCatResponse.ok) {
        enqueueSnackbar(`${NOTIFICATION_MESSAGES.FAVOURITES_SUCCESS} ${messageText}`, { variant: 'success' });
        fetchCats();
      } else {
        enqueueSnackbar(`${NOTIFICATION_MESSAGES.FAVOURITES_FAILED} ${messageText}: ${favoriteCatData.message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${NOTIFICATION_MESSAGES.FAVOURITES_FAILED} ${messageText}: ${error}`, { variant: 'error' });
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
      const setVoteRequestOptions = createRequestOptions(
        `${API_ENDPOINT_CONSTANTS.DOMAIN}${API_ENDPOINT_CONSTANTS.CAT_VOTES}`,
        HTTP_METHODS.POST,
        { "content-type": 'application/json' },
        JSON.stringify(votePayload)
      );
      const votesResponse = await fetch(...setVoteRequestOptions);
      const votesData = await votesResponse.json();
      if (votesResponse.ok) {
        enqueueSnackbar(NOTIFICATION_MESSAGES.VOTE_SUCCESS, { variant: 'success' });
        fetchCats();
      } else {
        enqueueSnackbar(`${NOTIFICATION_MESSAGES.VOTE_FAILED}: ${votesData.message}`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${NOTIFICATION_MESSAGES.VOTE_FAILED}: ${error}`, { variant: 'error' });
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
