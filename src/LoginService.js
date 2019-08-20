const axios = require('axios');

export default class LoginService {

    static async login(user) {
        var wasLoginSuccessful = await this.sendLoginRequest(user);
        if (wasLoginSuccessful)
            this.saveInLocalStorage(user);
        return wasLoginSuccessful;
    }

    static saveInLocalStorage(user) {
        localStorage.setItem("credentials", JSON.stringify(user));
    }

    static logout() {
        localStorage.removeItem("credentials");
    }

    static isLoggedIn() {
        return localStorage.getItem("credentials");
    }

    static async sendLoginRequest(user) {
        let successfulLogin = false;
        await axios.post('https://localhost:5001/api/person/login', user)
            .then(function (response) {
                successfulLogin = response.data;
            })
            .catch(function (error) {
                console.log("ERROR searching person: ", error);
            });
        return successfulLogin;
    }

}