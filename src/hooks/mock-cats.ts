const mockCats: any = [{
    "breeds": [],
    "id": "OLbkinYGZ",
    "url": "https://cdn2.thecatapi.com/images/OLbkinYGZ.jpg",
    "width": 275,
    "height": 183,
    "sub_id": null,
    "created_at": "2021-10-18T23:01:33.000Z",
    "original_filename": "images.jpeg",
    "breed_ids": null
},
{
    "breeds": [],
    "id": "HOlJwDSV7",
    "url": "https://cdn2.thecatapi.com/images/HOlJwDSV7.jpg",
    "width": 1200,
    "height": 1200,
    "sub_id": null,
    "created_at": "2021-10-18T22:43:34.000Z",
    "original_filename": "file-20200803-24-50u91u.jpeg",
    "breed_ids": null
}];

const mockFavorites: any = [{
    "id": 2137749,
    "user_id": "b6vedd",
    "image_id": "OLbkinYGZ",
    "sub_id": null,
    "created_at": "2021-10-20T22:55:29.000Z",
    "image": {
        "id": "OLbkinYGZ",
        "url": "https://cdn2.thecatapi.com/images/OLbkinYGZ.jpg"
    }
},
{
    "id": 2137870,
    "user_id": "b6vedd",
    "image_id": "HOlJwDSV7",
    "sub_id": null,
    "created_at": "2021-10-21T21:46:14.000Z",
    "image": {
        "id": "HOlJwDSV7",
        "url": "https://cdn2.thecatapi.com/images/HOlJwDSV7.jpg"
    }
},];

const mockVotes: any = [{
    "id": 470757,
    "image_id": "OLbkinYGZ",
    "sub_id": null,
    "created_at": "2021-10-21T22:28:25.000Z",
    "value": 1,
    "country_code": "GB"
},
{
    "id": 471831,
    "image_id": "HOlJwDSV7",
    "sub_id": null,
    "created_at": "2021-10-26T23:53:52.000Z",
    "value": 1,
    "country_code": "GB"
}];

export {
    mockCats,
    mockFavorites,
    mockVotes
};