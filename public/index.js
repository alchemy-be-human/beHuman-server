// import superagent from 'superagent';
// import request from './node_modules/superagent/dist/superagent.js';
import * as request from 'https://cdn.jsdelivr.net/npm/superagent';
console.log(request);
const logInForm = document.querySelector('form');
const URL = 'https://be-human-demo-staging.herokuapp.com'

console.log('tests');


logInForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(logInForm);

    const user = {
        username: data.get('username-input'),
        password: data.get('password-input')
    }

    const error = {
        message: null
    }

    console.log(user)
    console.log(error)



        window.location.href = './admin/';



    try {
        const response = await request
            .post(`${URL}/api/v1/login`)
            .send(user);

        console.log('RESPONSE' + response.body);

        // ***receive authorization from backend; token?***
        //if received, redirect user/admin to Admin page
        // if(response.body = '???') {
        //     window.location.href = './admin/';
        // }

    } catch(error) {
        // ***if not received, display error message***
        error.message = 'Email or Password Invalid'
        console.log(error);
    }

});
