import { useEffect, useState } from "react";
import { axiosRequest } from "@/constants/axiosRequest";

function useFetch(method: string, url: string, token: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            axiosRequest(method, token, url).then((response) => {
                setData(response)
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false)
            });
        };

        fetchData();
    }, [method, url, token]);

    return { data, loading, error };
}

export default useFetch;
