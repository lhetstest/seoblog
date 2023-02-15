import _fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../config";


export const signup = user => {
    return _fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) 
    }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
};

export const signin = user => {
    return _fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) 
    }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
};

export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user');
    next();

    return fetch(`${API}/signout`, {
        method: 'GET'
    })
    .then(response => {
        console.log('signout success')
    })
    .catch(err => console.log(err))
}


const checkBrowser = () => typeof window === undefined

// set cookie
export const setCookie = (key, value) => {
    if (!checkBrowser()) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}
// remove cookie

export const removeCookie = (key) => {
    if (!checkBrowser()) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

// get cookie

export const getCookie = (key) => {
    if (!checkBrowser()) {
        return cookie.get(key)
    }
}
// localstorage

export const setLocalStorage = (key, value) => {
    if (!checkBrowser()) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key, value) => {
    if (!checkBrowser()) {
        localStorage.removeItem(key)
    }
}
// authenticate user by pass data to cookie and localstorage
export const authenticate = (data,next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth =() => {
    if(!checkBrowser()) {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
    }
}

