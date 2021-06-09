const baseEndpoint = "https://ariadna.dk/kea/Dortes-Training/wp/wp-json/wp/v2/";

class Wordpress {

    static getpost = async (id) => {
        const response = await fetch(baseEndpoint + `login_pages/${id}`)
        return await response.json();
    }

    static getCategories = async () => {
        const response = await fetch(baseEndpoint + "categories")
        return await response.json();
    }

    static getCategory = async (id) => {
        const response = await fetch(baseEndpoint + `categories/${id}`)
        return await response.json();
    }
    static getExercises = async (ids) => {
        const queryString = ids? `?include[]=${ids.join('&include[]=')}` : '';
        const response = await fetch(baseEndpoint + `exercise${queryString}`)
        return await response.json();
    }
    static getExercise = async (id) => {
        const response = await fetch(baseEndpoint + `exercise/${id}`)
        return await response.json();
    }

    static getAllExercises = async () => {
        const response = await fetch(baseEndpoint + "exercise")
        return await response.json();
    }

}

export default Wordpress;