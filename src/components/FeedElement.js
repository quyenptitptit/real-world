import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
function FeedElement(props) {
    let data = JSON.parse(localStorage.getItem('user_login')) || ''
    const article = props.article
    const [liked, setliked] = useState(article.favorited)
    const [countFavorite, setCountFavorite] = useState(article.favoritesCount)
    const date = new Date(article.updatedAt.substring(0, 10))
    const dateString = date.toDateString().substring(4)
    const like = async () => {
        try {
            const res = await axios.post(`https://api.realworld.io/api/articles/${article.slug}/favorite`, {},
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${data.user.token}`
                    }
                })
            setliked(res.data.article.favorited)
            setCountFavorite(res.data.article.favoritesCount)
            // setArticle(res.data.article)
        }
        catch (e) {
            console.log(e)
        }
    }

    const disLike = async () => {
        try {
            const res = await axios.delete(`https://api.realworld.io/api/articles/${article.slug}/favorite`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${data.user.token}`
                    }
                })
            setliked(res.data.article.favorited)
            setCountFavorite(res.data.article.favoritesCount)
            // setArticle(res.data.article)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleClickLike = () => {
        if (liked) {
            disLike()
        }
        else {
            like()
        }
    }

    

    return (
        <div>
            <div className="article-preview">
                <div className="article-meta">
                    <Link to={`/${article.author.username}`} ><img src={article.author.image} /></Link>
                    <div className="info">
                        <Link to={`/${article.author.username}`}><p className='author'>{article.author.username}</p></Link>
                        <span className="date">{dateString}</span>
                    </div>
                    {liked ?
                        <button className='btn btn-sm pull-xs-right btn-primary' onClick={handleClickLike} >
                            <i className="ion-heart"></i> {countFavorite}
                        </button>
                        :
                        <button className='btn btn-sm pull-xs-right btn-outline-primary' onClick={handleClickLike} >
                            <i className="ion-heart"></i> {countFavorite}
                        </button>
                    }
                </div>
                <Link to={`/article/${article.slug}`} className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <div className='read-more'>
                        <span>Read more...</span>
                        <div className='tag-list'>
                            {article.tagList.map(tag => (
                                <p className='tag'>{tag}</p>
                            ))}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default FeedElement
