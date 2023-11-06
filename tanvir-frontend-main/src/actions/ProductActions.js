import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
    SORT_PRODUCT,
    SORT_HIGH_TO_LOW_PRODUCT,
    SORT_LOW_TO_HIGH_PRODUCT
} from '../constants/ProductConstants'

import axios from 'axios'


export const getProductsForTest = (keyword, currentPage, price, category, rating) => {
    return (dispatch) => {
      // You can perform your asynchronous logic here, e.g., making an API call
      // Once you have the data, dispatch the action
      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: { keyword, currentPage, price, category, rating },
      });
    };
  };

export const getProducts=(keyword="",currentPage=1,price,category="",rating=0)=>async(dispatch)=>{

    try {

        dispatch({type: ALL_PRODUCTS_REQUEST})

        let route=`https://walmart-backend.vercel.app/api/v1/products?name=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating=${rating}`

        if(category){
            route=`https://walmart-backend.vercel.app/api/v1/products?name=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating=${rating}`
        }

        const {data} = await axios.get(route)

        dispatch({type:ALL_PRODUCTS_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.error
        })
    }
}

export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.post(`https://walmart-backend.vercel.app/api/v1/admin/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const sortProduct=(val,products)=> async (dispatch) => {
    if(val==="0"){
        dispatch({ type: SORT_HIGH_TO_LOW_PRODUCT,payload:{products} })
    }
    if(val==="1"){
        dispatch({ type: SORT_LOW_TO_HIGH_PRODUCT,payload:{products} })
    }

}

export const newSellerProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.post(`https://walmart-backend.vercel.app/api/v1/seller/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails=(id)=>async(dispatch)=>{

    try {

        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`https://walmart-backend.vercel.app/api/v1/product/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS, 
            payload:data.product
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.error
        })
    }
}

export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.get(`https://walmart-backend.vercel.app/api/v1/admin/products`,config)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getSellerProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.get(`https://walmart-backend.vercel.app/api/v1/seller/products`,config)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.delete(`https://walmart-backend.vercel.app/api/v1/admin/product/${id}`,config)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteSellerProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.delete(`https://walmart-backend.vercel.app/api/v1/seller/product/${id}`,config)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put(`https://walmart-backend.vercel.app/api/v1/admin/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateSellerProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put(`https://walmart-backend.vercel.app/api/v1/seller/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors=() => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put(`https://walmart-backend.vercel.app/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.get(`https://walmart-backend.vercel.app/api/v1/reviews?id=${id}`,config)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.delete(`https://walmart-backend.vercel.app/api/v1/reviews?id=${id}&productId=${productId}`,config)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}