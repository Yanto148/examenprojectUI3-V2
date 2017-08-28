const BASE_PATH = "backend/";

export function getHallsFromBackend()
{
    return fetch(BASE_PATH + 'halls.json')
        .then((res) => {return res.json()})
        .then((resJson) => {return resJson.hallen});
}

export function getHallFromBackend(id)
{
    return fetch(BASE_PATH + 'hall' + id + '.json')
        .then((res) => {return res.json()});
}