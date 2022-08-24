import axios from 'axios'
import { React, useState, useEffect } from 'react'
import FeedElement from '../components/FeedElement'


function YourFeed(props) {
    const BASE_URL = 'https://api.realworld.io/api/articles'
    const [articles, setArticles] = useState([])
    const getArticles = async () => {
        props.setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}/feed`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            setArticles(res.data.articles)
            props.setLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getArticles()
    }, []);


    return (
        <div>
            {articles.length ?
                !props.loading && articles.map((article, idx) => (
                    <FeedElement key={article.slug} article={article} data={props.data} />
                ))
                :
                !props.loading && <p className='no-article'>No articles are here... yet.</p>
            }
        </div>
    )
}

export default YourFeed
