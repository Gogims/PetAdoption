const axios = require('axios');

const defaultAxios = axios.create({
    headers:{
        common: {
            Origin: "http://localhost:8080"
        }
    }
});

module.exports = defaultAxios;