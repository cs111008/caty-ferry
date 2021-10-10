import * as React from 'react';
import { useEffect, useState } from 'react';
import { ICatInterface } from '../interfaces/cat.interface';

import { CardList } from '../componets/index';
import {createRequestPayload} from '../factories/fetch.factories';
import {HTTP_METHODS} from '../enums/http-methods.enum'
import API_ENDPOINT_CONSTANTS from '../constants/api-endpoint.constants';
import {APP_CONSTANTS} from '../constants/app.constants';


const  Home = () => {
  let [catData, setCatData] = useState<ICatInterface[]>([]);
  const [orderBy, setOrderBy] = useState('DESC');
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchCatList();
  }, [page]);
const fetchCatList = async () => {
    try {
        const getCatListRequestArgs = createRequestPayload(
            HTTP_METHODS.GET,
            `https://api.thecatapi.com${API_ENDPOINT_CONSTANTS.CAT_LIST}?limit=${APP_CONSTANTS.PAGINATION_LIMIT}&page=${page}&order=${orderBy}`,
            { "content-type": 'application/json' }
        );
        const catListResult = await fetch(...getCatListRequestArgs);
        const catListJson: any = await catListResult.json();
        if (catListResult.ok) {
            setCatData(catListJson);
        } else {
            console.log(`There is an error occurred while fetching the list of cats. Please try again. ${catListJson.message}`);
        }
    } catch (e: any) {
        console.log(`There is an error occurred while fetching the list of cats. Please try again. ${e.message || ''}`);
    }
}
  return (
    <CardList cards={catData} />
  );
}
export default Home;



/**
 * 
 * const  Home = () => {
  let [catData, setCatData] = useState<ICatInterface[]>([]);

  useEffect(() => {
    console.log('catdata ====>', catData);
    if (catData.length >= 10) {
      return;
    }
    fetch('https://api.thecatapi.com/v1/images/search', {
      method: 'GET',
      headers: {
        "x-api-key": 'd763e41e-65e9-4b93-9b99-3161f068c48b',
        "content-type": 'application/json'
      }
    })
      .then((response?: any) => response.json())
      .then((response?: any) => {
        console.log('=====>', response);

        setCatData((oldData) => [...oldData, response[0]]);
      });
  });
  return (
    <CardList cards={catData} />
  );
}
export default Home;
 */