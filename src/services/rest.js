const url = "https://ariadna.dk/kea/Dortes-Training/wp/wp-json/wp/v2/";

export function getData(endpoint, callback){
    fetch(url + endpoint)
    .then(res => res.json())
    .then((data) => callback(data));
}