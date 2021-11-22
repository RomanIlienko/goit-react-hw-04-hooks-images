import axios from "axios";

const API_KEY = '23479864-16575353206961163feee44f8';
const BASE_URL = 'https://pixabay.com/api/';
const PERPAGE = 12;

function fetchPagesList( searchQuery = '', currentPage = 1) {
  return axios
    .get(
      `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PERPAGE}`,
    )
    .then(response => response.data.hits)
    .catch(error => console.log(error));
  
}
export { fetchPagesList };
