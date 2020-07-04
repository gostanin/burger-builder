import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSucess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = '***REMOVED***:signUp?key=***REMOVED***'
        if (!isSignup) {
            url = '***REMOVED***:signInWithPassword?key=***REMOVED***'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response)
                const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSucess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout());
        }
        else {
            const expTime = new Date(localStorage.getItem('expirationDate'));

            if (expTime > new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSucess(token, userId))
                dispatch(checkAuthTimeout((expTime.getTime() - new Date().getTime()) / 1000))
            }
            else {
                dispatch(logout())
            }
        }
    }
}