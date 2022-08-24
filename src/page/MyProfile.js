import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FeedElement from '../components/FeedElement'
import '../App.css'

function MyProfile(props) {
    const BASE_URL = 'https://api.realworld.io/api'
    const [profile, setProfile] = useState('')
    const [myArticles, setMyArticles] = useState([])
    const [favoritedArticels, setFavoritedArticels] = useState([])
    const [isMyArticle, setIsMyArticle] = useState(true)
    const [loading, setLoading] = useState(false)
    const username = useLocation().pathname.split('/')[1]

    const getProfile = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/profiles/${username}`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            setProfile(res.data.profile)
            // console.log(res.data.profile)
        }
        catch (e) {
            console.log(e)
        }
    }

    const getMyArticles = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}/articles?author=${username}`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            setMyArticles(res.data.articles)
            setLoading(false)
            // console.log(res.data.articles)
        }
        catch (e) {
            console.log(e)
        }
    }

    const getFavoritedArticles = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}/articles?favorited=${username}`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            setLoading(false)
            setFavoritedArticels(res.data.articles)
        }
        catch (e) {
            console.log(e)
        }
    }

    const follow = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/profiles/${username}/follow`, {},
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            setProfile(res.data.profile)
            // console.log(res.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    const unFollow = async () => {
        try {
            const res = await axios.delete(`${BASE_URL}/profiles/${username}/follow`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            setProfile(res.data.profile)
            // console.log(res.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleClickFollow = () => {
        if (profile.following) {
            unFollow()
        }
        else {
            follow()
        }
    }

    useEffect(() => {
        getMyArticles()
        getProfile()
    }, []);

    return (

        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img src={profile.image} className="user-img" />
                            <h4>{profile.username}</h4>
                            <p>{profile.bio}</p>
                            {username === props.data.user.username ?
                                <Link to='/settings' ><button className="btn btn-sm btn-outline-secondary action-btn">
                                    <i className="ion-gear-a"></i>&nbsp;
                                    Edit Profile Settings
                                </button></Link>
                                :
                                profile.following ?
                                    <button className="btn btn-sm btn-outline-secondary action-btn" onClick={handleClickFollow}>
                                        <i className="ion-plus-round"></i>&nbsp;
                                        Unfollow {username}
                                    </button>
                                    :
                                    <button className="btn btn-sm btn-outline-secondary action-btn" onClick={handleClickFollow}>
                                        <i className="ion-plus-round"></i>&nbsp;
                                        Follow {username}
                                    </button>
                            }
                        </div>

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">

                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <Link to='' ><li className={`nav-item nav-link ${isMyArticle ? 'active' : ''}`}>
                                    <p onClick={() => {
                                        setIsMyArticle(true)
                                        getMyArticles()
                                    }} >My Articles</p>
                                </li></Link>
                                <Link to='' ><li className={`nav-item nav-link ${!isMyArticle ? 'active' : ''}`}>
                                    <p onClick={() => {
                                        setIsMyArticle(false)
                                        getFavoritedArticles()
                                    }} >Favorited Articles</p>
                                </li></Link>
                            </ul>
                        </div>

                        {loading && <p className='no-article'>Loading articles...</p>}

                        {isMyArticle ?
                            (
                                myArticles.length ?
                                    !loading && myArticles.map((article, idx) => (
                                        <FeedElement key={article.slug} article={article} data={props.data} />
                                    ))
                                    :
                                    !loading && <p className='no-article'>No articles are here... yet.</p>
                            )
                            :
                            (
                                favoritedArticels.length ?
                                    !loading && favoritedArticels.map((article, idx) => (
                                        <FeedElement key={article.slug} article={article} data={props.data} />
                                    ))
                                    :
                                    !loading && <p className='no-article'>No articles are here... yet.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
