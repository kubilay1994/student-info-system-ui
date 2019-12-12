const axios = require('axios');

const tokenUrl = 'http://localhost:8082/api/auth/generatetoken';

const getToken = async () => {
    const res = await axios.post(tokenUrl, {
        username: '15011039',
        password: 'secret'
    });
    return res.data.accessToken;
};

const spamRequest = async () => {
    let i = 0;
    const url = 'http://localhost:8082/api/rest/student/sections/2019/Guz';
    const token = await getToken();
    while (true) {
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        i++;

        console.log(res,i);
    }
};

spamRequest().catch(err => console.log(err.response.data));
