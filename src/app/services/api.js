import axios from "axios";
import { baseURL, baseURL1, book_serivce, forgot_password, get_appointment, get_categories, get_config, get_news, get_payment_method, get_seller_by_category, get_seller_by_id, get_services_by_category, get_tags, google_login, login, register, reset_password, search_by_name_loc, seller_by_tags, seller_category, seller_near_you, time_slots, top_offers, top_seller, update_profile, verify_otp } from "./constants";
import { store } from './../redux/store/index';

export const Api_Header = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

Api_Header.interceptors.request.use(async config => {
    const token = store.getState()?.userReducer?.token;
    if (token) {
        config.headers.Authorization = `${token}`;
        config.headers.Accept = '*/*'
    }
    return config;
},
    function (error) {
        return Promise.reject(error);
    },
);

// export const Api_Header1 = axios.create({
//     baseURL: baseURL1,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// Api_Header1.interceptors.request.use(async config => {
//     const token = store.getState()?.userReducer?.token;
//     if (token) {
//         config.headers.Authorization = `${token}`;
//         config.headers.Accept = '*/*'
//     }
//     return config;
// },
//     function (error) {
//         return Promise.reject(error);
//     },
// );

const getParams = (body) => {
   
    let params = {
        "jsonrpc": "2.0",
        "params": body
    }
    return params
}

export const postRegister = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(register, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postLogin = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(login, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const searchByNameLocation = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(search_by_name_loc, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const getConfiguration = async (body) => {
    try {
        const res = await Api_Header.post(get_config, body);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const getSellerCategory = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(seller_category, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const getOffers = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(top_offers, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}


export const getHomeData = (body) => {
    return Promise.all([
        getTopSeller(body.first),
        getCategories(body.second),
        postAppointment(body.third),
        getNews(body.fourth)
    ])
        .then((responses) => {
            const [topSellerData, categoriesData, appointmentData, newsData] = responses;
            return {
                topSeller: topSellerData,
                categories: categoriesData,
                appointment: appointmentData,
                news: newsData
            };
        })
        .catch((error) => {
            // Handle the error when all API requests fail
            console.log('All API requests failed:', error);
            throw error;
        });
}

export const getTopSeller = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(top_seller, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const getNews = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(get_news, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const getCategories = async (body) => {
    let params = getParams(body)

    try {
        const res = await Api_Header.post(get_categories, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const getTags = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(get_tags, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const getSellerByCategory = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(get_seller_by_category, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const getServiceByCategory = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(get_services_by_category, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postVerifyOtp = async (body, token) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(verify_otp, params, {
            headers: {
                'Authorization': token
            }
        });
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postForgotPassword = async (body, token) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(forgot_password, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postUpdatePassword = async (body, token) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(reset_password, params, {
            headers: {
                'Authorization': token
            }
        });
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postTimeSlots = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(time_slots, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postBookService = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(book_serivce, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postSellerByTags = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(seller_by_tags, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postSellerNearYou = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(seller_near_you, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postAppointment = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(get_appointment, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postSellerById = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(get_seller_by_id, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postPaymentMethods = async (body) => {
    let params = getParams(body)
    try {
        const res = await Api_Header.post(get_payment_method, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postUpdateProfile = async (body) => {
    let params = getParams(body)

    try {
        const res = await Api_Header.post(update_profile, params);
        return res.data
    } catch (e) {
        throw e.response
    }
}

export const postGoogleLogin = async (body) => {
   
    try {
        const res = await Api_Header.post(google_login, body);
        return res.data
    } catch (e) {
        throw e.response
    }
}

