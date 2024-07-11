import { CATEGORY, LOGIN, SIGNOUT, } from "./constants"

const initialState = {
    isLoggedIn: false,
    userId: '',
    name:"",
    email:"",
    contact :'',
    categoryList:[]
}

export const inkartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userId: action.payload.userId,
                name: action.payload.name,
                email: action.payload.email,
                contact: action.payload.contact,
                isLoggedIn: true,
            }
        case CATEGORY:
            return {
                ...state,
                categoryList: action.payload.categoryList,
            }

        case SIGNOUT:
            return {
                ...state,
                userId: '',
                name:'',
                contact:'',
                email:'',
                isLoggedIn: false,
            }


        default: return state
    }
}