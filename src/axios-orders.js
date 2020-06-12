import Axios from 'axios';

const instance = Axios.create({
    baseURL: '***REMOVED***'
});

export default instance;