import axios from "axios";

export async function getImages(searchQuery, page) {
    const API_KEY = '23237542-2d5ea559b24d0c907a8c1fa21';
    const QUERY_PARAMS = `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    axios.defaults.baseURL = 'https://pixabay.com/api';

    const { data } = await axios.get(`/${QUERY_PARAMS}`);
    return { data };
}

