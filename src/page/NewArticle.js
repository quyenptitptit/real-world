import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { articleSlugStore } from '../recoil/article-slug'
function NewArticle(props) {
    const [article, setArticle] = useRecoilState(articleSlugStore)
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')
    const [body, setBody] = useState('')
    const [tag, setTag] = useState('')

    const slug = useLocation().pathname.split('/')[2]


    const history = useNavigate()

    const createArticle = async (newArticles) => {
        try {
            const res = await axios.post(`https://api.realworld.io/api/articles`, newArticles,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${props.data.user.token}`
                    }
                })
            history(`/article/${res.data.article.slug}`)
        }
        catch (e) {
            console.log(e)
        }
    }

    const updateArticle = async (article) => {
        try {
            const res = await axios.put(`https://api.realworld.io/api/articles/${slug}`, article,
            {
                headers: {
                    accept: "application/json",
                    authorization: `Token ${props.data.user.token}`
                }
            })
            setArticle(res.data.article)
            history(`/article/${res.data.article.slug}`)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSubmitArticle = (e) => {
        e.preventDefault()
        if (slug) {
            const updatedArticle = {
                article: {
                    title: title,
                    description: des,
                    body: body,
                    tagList: article.tagList
                }
            }
            updateArticle(updatedArticle)
        }
        else {
            const newArticle = {
                article: {
                    title: title,
                    description: des,
                    body: body,
                    tagList: tag.split(' ')
                }
            }
            createArticle(newArticle)
        }
    }

    useEffect(() => {
            if(slug) {
                setTitle(article.title)
                setDes(article.description)
                setBody(article.body)
            }
    }, [])

    return (

        <div className="editor-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <form onSubmit={handleSubmitArticle} >
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="What's this article about?"
                                        value={des}
                                        onChange={(e) => setDes(e.target.value)} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control" rows="8"
                                        placeholder="Write your article (in markdown)"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)} ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)} />
                                    <div className="tag-list"></div>
                                </fieldset>
                                <button className="btn btn-lg pull-xs-right btn-primary">
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default NewArticle
