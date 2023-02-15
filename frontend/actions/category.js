import _fetch from "isomorphic-fetch";
import { API } from "../config";


export const create = (category, token) => {
    return _fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category) 
    }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
};

export const getCategories = () => {
    return _fetch(`${API}/categories`, {
        method: 'GET'
    }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
};

export const singleCategory = (slug) => {
    return _fetch(`${API}/category/${slug}`, {
        method: 'GET'
    }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
};

export const removeCategory = (slug, token) => {
    return _fetch(`${API}/category/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
};
