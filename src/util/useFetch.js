import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
        fetch(url, { signal: abortCont.signal })
        .then(res => {
            if (!res.ok) { 
                // error coming back from server
                throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(data => {
            setData(data);
            setError(null);
        })
        .catch(err => {
            setError(err.message);
        })
        }, 1000);

        // abort the fetch. 완료되기 전에 DOM 요청 중단
        return () => abortCont.abort();
    }, [url])

    return [ data, setData, error ];
}


export default useFetch;