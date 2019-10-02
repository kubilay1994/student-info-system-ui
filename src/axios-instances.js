import axios from 'axios';


const restAPI = axios.create({
    baseURL : 'https://identitytoolkit.googleapis.com/v1',

});


export default restAPI;