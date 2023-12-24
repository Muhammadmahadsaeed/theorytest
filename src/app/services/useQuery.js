import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { gloabal_url } from "./constants";
// hook to for axios GET

function useQuery(url, type, body) {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(undefined);
    const [error, setError] = useState(undefined);
    const dispatch = useDispatch();

    // console.log({url});

    const apiCall = async (url2) => {
        // console.log("here")
        setLoading(true);
        const data = await axios
            .post(`${gloabal_url}${url2 || url}`, {
                body
            })
            .then((data) => {
                // console.log(data);

                if (data.data) {
                    // dispatch(Actions.saveUser(data.data));
                    setLoading(false);
                    setData(data.data);
                }
            })
            .catch((err) => {
                console.log({ err });
                console.log({ err });
                const error = { err };
                const response = error.err.response;
                let message = "";
                console.log(response?.data?.message);
                if (response?.data?.message) {
                    message = response.data.message;
                } else if (response.data?.errors?.length) {
                    message = response.data.errors[0].msg;
                } else {
                    message = error.err.response.statusText;
                }
                console.log(err.data);

                // dispatch(Actions({message}));

                setError(err);
                setLoading(false);
            });
        return data;
    };

    useEffect(() => {
        if (type === "on_load") {
            apiCall(url);
        }
    }, []);

    // console.log({data});

    if (type === "on_load") {
        return { loading, data, error };
    }

    return [apiCall, { loading, data, error }];
}

export default useQuery;