export const GET_DATA = 'GET_DATA'


// action creators
export const getData = (date) => {
    return { type: GET_DATA, date }
}