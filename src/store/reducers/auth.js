import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';


const initialState = { 
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
}

const authStart = (state) => {
    return updateObject(state, {error:null, loading: true})
}

const authSuccess = (state, action) => {
    return updateObject( state,
        {
            token: action.token,
            userId: action.userId,
            error: null,
            loading: false
        })
}

const authFail = (state, action) => {
    return updateObject ( state, {
        error: action.error,
        loading: false
    })
}

const logout = (state, action) => {
    return updateObject (state, {
        token: null,
        userId: null
    })
}

const setAuthRedirect = (state, action) => {
    return updateObject(state, {
        authRedirect: action.path
    })
}

const reducer =(state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return logout(state, action)
        case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirect(state, action)
        default: return state
    }
}

export default reducer;
