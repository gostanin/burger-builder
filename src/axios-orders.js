import Axios from 'axios';

const instance = Axios.create({
    baseURL: `${process.env.DB_URL}`
});

export default instance;