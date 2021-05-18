const baseEndpoint = "https://ariadna.dk/kea/Dortes-Training/wp/wp-json/wp/v2/";

class Wordpress {

    static getCategories = async () => {
        const response = await fetch(baseEndpoint + "categories")
        return await response.json();
    }

    static getCategory = async (id) => {
        const response = await fetch(baseEndpoint + `categories/${id}`)
        return await response.json();
    }

}

export default Wordpress;