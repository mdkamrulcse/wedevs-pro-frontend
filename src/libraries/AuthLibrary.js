import Cookies from "cookies-js";
import _ from "lodash";
import axios from "axios";
import store from '../redux-store'

class AuthLibrary {
    constructor() {
        this.user = store.getState().userReducer.user;
    }

    /**
     *
     * @param access_token
     * @param token_type
     * @param expired_at
     * @returns {Cookies}
     */
    setTokenToCookie = (access_token, token_type, expired_at) => {
        try {
            return Cookies.set("access_token", token_type + ' ' + access_token, {
                expires: expired_at
            });
        } catch (err) {
            throw Error("Auth generation is failed.");
        }
    };

    login = (callback) => {
        // redirection...
        if (sessionStorage.getItem("redirectURL")) {
            return window.location.href = sessionStorage.getItem("redirectURL");
        }

        if (typeof callback === "function") {
            return callback();
        }
        window.location.href = '/'
    };

    /**
     *
     * @param callback
     * @returns {boolean|*}
     */
    logout = async (callback) => {
        //sessionStorage.clear();
        Cookies.expire("access_token");
        // this.user = {};
        // localStorage.clear();
        //  await this.revokeAccessToken();

        if (typeof callback === "function") {
            return callback();
        }

        // window.location.href = '/sign-in'


    };

    revokeAccessToken = async () => {
        try {
            let response = await axios.get('/api/logout', {
                headers: {
                    Authorization: Cookies.get('access_token')
                }
            });

            if (response.data.data) {
                return response.data.data;
            }
            return false;
        } catch (err) {
            throw Error("Failed to load current auth data.");
        }
    }

    /**
     *
     * @returns {string | string}
     */
    token = () => {
        return Cookies.get('access_token') ?? '';
    };


    /**
     *
     * @returns {*|null}
     */
    id = () => {
        return this.user.id.toString() ?? null
    };

    /**
     *
     * @returns {boolean}
     */
    status = () => {
        if (_.isEmpty(this.user)) return false;
        return !(_.isEmpty(this.user.id.toString()) || _.isEmpty(Cookies.get('access_token')));
    };


}

export default new AuthLibrary();
