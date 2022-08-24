import { React, useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { articleTagStore } from '../recoil/article-tag'
import FeedElement from '../components/FeedElement'
import GlobalFeed from './GlobalFeed'
import YourFeed from './YourFeed'
import Tag from './Tag'


function Home(props) {
    let data = JSON.parse(localStorage.getItem('user_login')) || ''
    const [isYourFeed, setIsYourFeed] = useState(false)
    const [isTag, setIsTag] = useState(false)
    const [isGlobalFeed, setIsGlobalFeed] = useState(true)
    const [tags, setTags] = useState([])
    const [nameTag, setNameTag] = useState('')
    const [loading, setLoading] = useState(false)


    const getTags = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://api.realworld.io/api/tags`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.isLogin ? data.user.token : ''}`
                    }
                })
            setTags(res.data.tags)
            setLoading(false)
            // console.log(res.data.tags)
        }
        catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        getTags()
    }, [])



    return (
        <div className="home-page">

            {!props.isLogin ?
                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>
                :
                null
            }

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle feed">
                            <ul className="nav nav-pills outline-active">
                                {props.isLogin ?
                                    <li className={`nav-item nav-link ${isYourFeed ? 'active' : ''}`} >
                                        <p onClick={() => {
                                            setIsYourFeed(true)
                                            setIsTag(false)
                                            setIsGlobalFeed(false)
                                        }} >Your Feed</p>
                                    </li>
                                    :
                                    null
                                }
                                <li className={`nav-item nav-link ${isGlobalFeed ? 'active' : ''}`}>
                                    <p onClick={() => {
                                        setIsGlobalFeed(true)
                                        setIsYourFeed(false)
                                        setIsTag(false)
                                    }} >Global Feed</p>
                                </li>
                                {isTag ?
                                    <li className={`nav-item nav-link ${isTag ? 'active' : ''}`} >
                                        #{nameTag}
                                    </li>
                                    :
                                    null
                                }
                            </ul>
                        </div>

                        {isGlobalFeed ?
                            <GlobalFeed data={data} isLogin={props.isLogin} loading={loading} setLoading={setLoading} /> : null
                        }

                        {isYourFeed ?
                            <YourFeed data={data} loading={loading} setLoading={setLoading} /> : null
                        }

                        {isTag ?
                            <Tag tag={nameTag} isLogin={props.isLogin} loading={loading} setLoading={setLoading} /> : null
                        }

                        {loading ?
                            <p className='no-article'>Loading articles... </p> : null
                        }

                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                {tags.map(tag => (
                                    <p className="tag-pill tag-default" onClick={(e) => {
                                        e.preventDefault()
                                        setNameTag(tag)
                                        setIsTag(true)
                                        setIsYourFeed(false)
                                        setIsGlobalFeed(false)
                                    }} >{tag}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home
