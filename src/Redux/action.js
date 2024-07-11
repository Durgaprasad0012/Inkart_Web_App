import { LOGIN, SIGNOUT, CATEGORY } from "./constants"

export const login = data => ({
    type: LOGIN,
    payload: {
        userId: data.userId,
        name: data.name,
        email: data.email,
        contact: data.contact,
    },
})

export const categoriesList = data => ({
    type: CATEGORY,
    payload: {
        categoryList: data,
    },
})
export const signOut = data => ({
    type: SIGNOUT,
    payload: {},
})
