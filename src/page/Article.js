import { React, useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import { useRecoilState } from 'recoil'
import { articleSlugStore } from '../recoil/article-slug'
import Comment from '../components/Comment'

function Article(props) {
    const BASE_URL = 'https://api.realworld.io/api'
    const [articleSlug, setArticleSlug] = useRecoilState(articleSlugStore)
    const slug = useLocation().pathname.split('/')[2]
    const [author, setAuthor] = useState('')
    const [dateString, setDateString] = useState('')
    const [comments, setComments] = useState([])
    const [inputComment, setInputComment] = useState('')

    const history = useNavigate()

    const getArticleSlug = async () => {
        try {
            const res = await axios.get(`https://api.realworld.io/api/articles/${slug}`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            setArticleSlug(res.data.article)
            setAuthor(res.data.article.author)
            // console.log(articleSlug)
        }
        catch (e) {
            console.log(e)
        }
    }

    const getDate = () => {
        const date = new Date(articleSlug.updatedAt)
        setDateString(date.toDateString().substring(4))
    }

    const handleDeleteArticle = () => {
        const deleteArticle = async () => {
            try {
                await axios.delete(`https://api.realworld.io/api/articles/${slug}`,
                    {
                        headers: {
                            accept: "application/json",
                            authorization: `Token ${props.data.user.token}`
                        }
                    })
                history('/')
                console.log('successfully')
            }
            catch (e) {
                console.log(e)
            }
        }
        deleteArticle()
    }

    const handleEditArticle = () => {
        history(`/newArticle/${slug}`)
    }

    const handleClickFollow = () => {
        const follow = async () => {
            try {
                const res = await axios.post(`${BASE_URL}/profiles/${author.username}/follow`, {},
                    {
                        headers: {
                            accept: "application/json",
                            authorization: `Token ${props.data.user.token}`
                        }
                    })
                console.log(res.data)
                setAuthor(res.data.profile)
            }
            catch (e) {
                console.log(e)
            }
        }
        const unFollow = async () => {
            try {
                const res = await axios.delete(`${BASE_URL}/profiles/${author.username}/follow`,
                    {
                        headers: {
                            accept: "application/json",
                            authorization: `Token ${props.data.user.token}`
                        }
                    })
                setAuthor(res.data.profile)
            }
            catch (e) {
                console.log(e)
            }
        }
        if (author.following) {
            unFollow()
        }
        else {
            follow()
        }
    }

    const handleClickLike = () => {
        const like = async () => {
            try {
                const res = await axios.post(`https://api.realworld.io/api/articles/${articleSlug.slug}/favorite`, {},
                    {
                        headers: {
                            accept: "application/json",
                            authorization: `Token ${props.data.user.token}`
                        }
                    })
                setArticleSlug(res.data.article)
            }
            catch (e) {
                console.log(e)
            }
        }
        const disLike = async () => {
            try {
                const res = await axios.delete(`https://api.realworld.io/api/articles/${articleSlug.slug}/favorite`,
                    {
                        headers: {
                            accept: "application/json",
                            authorization: `Token ${props.data.user.token}`
                        }
                    })
                setArticleSlug(res.data.article)
            }
            catch (e) {
                console.log(e)
            }
        }
        if (articleSlug.favorited) {
            disLike()
        }
        else {
            like()
        }
    }

    const getComments = async () => {
        try {
            const res = await axios.get(`https://api.realworld.io/api/articles/${articleSlug.slug}/comments`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            // console.log(res.data.comments)
            setComments(res.data.comments)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleClickPostComment = (e) => {
        e.preventDefault()
        const comment = {
            comment: {
                body: inputComment
            }
        }
        const postComment = async (comment) => {
            try {
                const res = await axios.post(`https://api.realworld.io/api/articles/${articleSlug.slug}/comments`, comment,
                    {
                        headers: {
                            accept: "application/json",
                            authorization: `Token ${props.data.user.token}`
                        }
                    })
                getComments()
                console.log(res.data.comment)
            }
            catch (e) {
                console.log(e)
            }
        }
        postComment(comment)
        setInputComment('')
    }



    useEffect(() => {
        getArticleSlug()
        getDate()
        getComments()
    }, [])

    return (

        <div className="article-page">

            <div className="banner">
                <div className="container">

                    <h1>{articleSlug.title}</h1>

                    <div className="article-meta">
                        <Link to={`/${author.username}`} ><img src={author.image} /></Link>
                        <div className="info">
                            <Link to={`/${author.username}`} className="author" >{author.username}</Link>
                            <span className="date">{dateString}</span>
                        </div>
                        {author.username === props.data.user.username ?
                            <>
                                <button className="btn btn-sm btn-outline-secondary" onClick={handleEditArticle}>
                                    <i className="ion-edit"></i>
                                    &nbsp;Edit Article
                                </button>
                                &nbsp;
                                <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteArticle}>
                                    <i className="ion-trash-a"></i>
                                    &nbsp;Delete Article
                                </button>
                            </>
                            :
                            <>
                                {author.following ?
                                    <button className="btn btn-sm btn-secondary" onClick={handleClickFollow}>
                                        <i className="ion-plus-round"></i>
                                        &nbsp;
                                        Unfollow {author.username}
                                    </button>
                                    :
                                    <button className="btn btn-sm btn-outline-secondary" onClick={handleClickFollow}>
                                        <i className="ion-plus-round"></i>
                                        &nbsp;
                                        Follow {author.username}
                                    </button>
                                }
                                &nbsp;
                                {articleSlug.favorited ?
                                    <button className="btn btn-sm btn-primary" onClick={handleClickLike}>
                                        <i className="ion-heart"></i>
                                        &nbsp;
                                        Unfavorite Article <span className="counter">({articleSlug.favoritesCount})</span>
                                    </button>
                                    :
                                    <button className="btn btn-sm btn-outline-primary" onClick={handleClickLike}>
                                        <i className="ion-heart"></i>
                                        &nbsp;
                                        Favorite Article <span className="counter">({articleSlug.favoritesCount})</span>
                                    </button>
                                }
                            </>
                        }
                    </div>

                </div>
            </div>

            <div className="container page">

                <div className="row article-content">
                    <div className="col-md-12">
                        <p>{articleSlug.body}</p>
                        {/* <h2 id="introducing-ionic">{articleSlug.description}</h2> */}
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    <div className="article-meta">
                        <Link to={`/${author.username}`} ><img src={author.image} /></Link>
                        <div className="info">
                            <Link to={`/${author.username}`} className="author" >{author.username}</Link>
                            <span className="date">{dateString}</span>
                        </div>

                        {author.username === props.data.user.username ?
                            <>
                                <button className="btn btn-sm btn-outline-secondary" onClick={handleEditArticle}>
                                    <i className="ion-edit"></i>
                                    &nbsp;Edit Article
                                </button>
                                &nbsp;
                                <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteArticle}>
                                    <i className="ion-trash-a"></i>
                                    &nbsp;Delete Article
                                </button>
                            </>
                            :
                            <>
                                {author.following ?
                                    <button className="btn btn-sm btn-secondary" onClick={handleClickFollow}>
                                        <i className="ion-plus-round"></i>
                                        &nbsp;
                                        Unfollow {author.username}
                                    </button>
                                    :
                                    <button className="btn btn-sm btn-outline-secondary" onClick={handleClickFollow}>
                                        <i className="ion-plus-round"></i>
                                        &nbsp;
                                        Follow {author.username}
                                    </button>
                                }
                                &nbsp;
                                {articleSlug.favorited ?
                                    <button className="btn btn-sm btn-primary" onClick={handleClickLike}>
                                        <i className="ion-heart"></i>
                                        &nbsp;
                                        Unfavorite Article <span className="counter">({articleSlug.favoritesCount})</span>
                                    </button>
                                    :
                                    <button className="btn btn-sm btn-outline-primary" onClick={handleClickLike}>
                                        <i className="ion-heart"></i>
                                        &nbsp;
                                        Favorite Article <span className="counter">({articleSlug.favoritesCount})</span>
                                    </button>
                                }
                            </>
                        }
                    </div>
                </div>

                <div className="row">

                    <div className="col-xs-12 col-md-8 offset-md-2">

                        <form className="card comment-form">
                            <div className="card-block">
                                <textarea
                                    className="form-control"
                                    placeholder="Write a comment..."
                                    rows="3"
                                    value={inputComment}
                                    onChange={(e) => setInputComment(e.target.value)}>
                                </textarea>
                            </div>
                            <div className="card-footer">
                                <Link to={`/${author.username}`} ><img src={author.image} className="comment-author-img" /></Link>
                                <button className="btn btn-sm btn-primary" onClick={handleClickPostComment}>
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment} date={dateString} article={articleSlug} getComments={getComments} />
                        ))}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Article
