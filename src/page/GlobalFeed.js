import axios from 'axios'
import { React, useState, useEffect } from 'react'
import FeedElement from '../components/FeedElement'

function GlobalFeed(props) {
    const [globalArticles, setGlobalArticles] = useState([])
    const getGlobalArticles = async () => {
        props.setLoading(true)
        try {
            const res = await axios.get(`https://api.realworld.io/api/articles`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.isLogin ? props.data.user.token : ''}`
                    }
                })
            setGlobalArticles(res.data.articles)
            props.setLoading(false)
            // console.log(res.data.articles)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getGlobalArticles()
    }, [])


    return (
        <div>
            {globalArticles.length ?
                !props.loading && globalArticles.map(article => (
                    <FeedElement key={article.slug} article={article} data={props.data} />
                ))
                :
                !props.loading && <p className='no-article'>No articles are here... yet.</p>
            }
        </div>
    )
}

export default GlobalFeed
