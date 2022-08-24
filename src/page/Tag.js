import { React, useState, useEffect } from 'react'
import FeedElement from '../components/FeedElement'
import axios from 'axios'

function Tag(props) {
  let data = JSON.parse(localStorage.getItem('user_login')) || ''
  const [articles, setArticles] = useState([]);
  const getArticlesTag = async () => {
    props.setLoading(true)
    try {
      const res = await axios.get(`https://api.realworld.io/api/articles?tag=${props.tag}`,
        {
          headers: {
            accept: "application/json",
            authorization: `Token ${props.isLogin ? data.user.token : ''}`
          }
        })
      setArticles(res.data.articles)
      console.log(res.data.articles)
      props.setLoading(false)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getArticlesTag()
  }, [props.tag])

  return (
    <div>
      {!props.loading && articles.map(article => (
        <FeedElement article={article}  />
      ))}
    </div>
  )
}

export default Tag
