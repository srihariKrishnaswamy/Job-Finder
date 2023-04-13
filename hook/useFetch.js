import {useState, useEffect} from 'react'
import axios from 'axios'
const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    console.log(endpoint)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '1b15468b40msh54887018bbb018ap153e39jsn0ab2fa8056d6',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },

    };
    // query: 'Python developer in Texas, USA', page: '1', num_pages: '1'
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data)
            setIsLoading(false)
        } catch (err) {
            setError(err)
            alert(err)
        } finally {
            setIsLoading(false) 
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch };

}

export default useFetch;