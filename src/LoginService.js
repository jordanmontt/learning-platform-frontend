const axios = require('axios');

export default class LoginService {

    static async login(user) {
        var loginResponse = await this.sendLoginRequest(user);
        if (loginResponse)
            this.saveInLocalStorage(loginResponse);
        return loginResponse;
    }

    static saveInLocalStorage(user) {
        localStorage.setItem("credentials", JSON.stringify(user));
    }

    static logout() {
        localStorage.removeItem("credentials");
    }

    static isLoggedIn() {
        return JSON.parse(localStorage.getItem("credentials"));
    }

    static async sendLoginRequest(user) {
        let loginResponse = false;
        await axios.post('https://localhost:5001/api/person/login', user)
            .then(function (response) {
                loginResponse = response.data;
            })
            .catch(function (error) {
                console.log("ERROR loging in: ", error);
            });
        return loginResponse;
    }

}