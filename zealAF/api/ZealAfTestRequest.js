import axios from 'axios';

const ZealAfTestRequest = axios.create({
    baseURL: 'http://34.138.189.81/zealaf/api',
});
//http://34.138.189.81/zealaf/api/testapi.php
ZealAfTestRequest.interceptors.request.use(
    async (config) => {
        config.headers.Accept = 'application/json';
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export const getTest = async (callback) => {
    const response = await ZealAfTestRequest.get(
        `testapi.php`
    );
    console.log(response);
    callback(response.data);
};

export const postTest = async (callback, email, password) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    // axios({
    //   method: 'post',
    //   url: '/api/event/item',
    //   data: params
    // });

    const response = await ZealAfTestRequest.post(
        `loginApi.php`,
        params
    );
    callback(response.data);
}

export const logOut = async (callback, hash) => {
    const params = new URLSearchParams();
    params.append('logOut', 'logOut');
    params.append('hash', hash);

    const response = await ZealAfTestRequest.post(
        `loginApi.php`,
        params
    );
    console.log(response)
    callback(response.data);
}

export const getUser = async (callback, hash) => {
    const params = new URLSearchParams();
    params.append('type', 'hash');
    params.append('hash', hash);

    const response = await ZealAfTestRequest.post(
        `userApi.php`,
        params
    );
    console.log(response)
    callback(response.data);
}

export const updatePassword = async (callback, hash, newPass, conf) => {
    const params = new URLSearchParams();
    params.append('type', 'updatePass');
    params.append('hash', hash);
    params.append('new', newPass);
    params.append('conf', conf);

    const response = await ZealAfTestRequest.post(
        `userApi.php`,
        params
    );
    console.log(response)
    callback(response.data);
}

export const updateUser = async (callback, hash, user) => {
    const params = new URLSearchParams();
    params.append('type', 'update');
    params.append('hash', hash);
    params.append('firstName', user.firstName);
    params.append('middleName', user.middleName);
    params.append('lastName', user.lastName);
    params.append('phone', user.phone);
    params.append('dob', user.dob);
    params.append('pronouns', user.pronouns);

    const response = await ZealAfTestRequest.post(
        `userApi.php`,
        params
    );
    console.log(response)
    callback(response.data);
}

export const createUser = async (callback, user) => {
    const params = new URLSearchParams();
    params.append('type', 'new');
    params.append('email', user.email);
    params.append('password', user.password);
    params.append('comPass', user.comPass);
    params.append('firstName', user.firstName);
    params.append('middleName', user.middleName);
    params.append('lastName', user.lastName);
    params.append('phone', user.phone);
    params.append('dob', user.dob);
    params.append('pronouns', user.pronouns);

    const response = await ZealAfTestRequest.post(
        `userApi.php`,
        params
    );
    console.log(response)
    callback(response.data);
}

export const getMerchandise = async (callback) => {
    const params = new URLSearchParams();
    params.append('type', 'getAll');

    const response = await ZealAfTestRequest.post(
        `merchApi.php`,
        params
    );
    console.log(response)
    callback(response.data);
}

export const getMerchandiseData = async (callback, id) => {
    const params = new URLSearchParams();
    params.append('type', 'getSingle');
    params.append('id', id);

    const response = await ZealAfTestRequest.post(
        `merchApi.php`,
        params
    );
    console.log(response)
    callback(response.data);
}
// axios({
//     method: 'post',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     url: 'http://my-api-site.ru/ajax.php',
//     data: { user_data : true }
//   }).then(function (response) {
//     console.log(response.data);
//   });

export default ZealAfTestRequest;