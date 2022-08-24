import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function Comment(props) {
    let data = JSON.parse(localStorage.getItem('user_login')) || ''

    const handleClickDeleteComment = () => {
        const deleteComment = async () => {
            try {
                await axios.delete(`https://api.realworld.io/api/articles/${props.article.slug}/comments/${props.comment.id}`,
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${data.user.token}`
                    }
                })
                console.log('ok')
                props.getComments()
            }
            catch (e) {
                console.log(e)
            }
        }
        deleteComment()
    }

    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{props.comment.body}</p>
            </div>
            <div className="card-footer-comment">
                <div className='card-avt'>
                    <Link to={`/${props.comment.author.username}`} className="comment-author" ><img src={props.comment.author.image} className="comment-author-img" /></Link>
                    &nbsp;
                    <Link to={`/${props.comment.author.username}`} className="comment-author" >{props.comment.author.username}</Link>
                    <span className="date-posted">{props.date}</span>
                </div>
                {props.comment.author.username === data.user.username ?
                    <div>
                        <button className="btn btn-sm delete-comment" onClick={handleClickDeleteComment}>
                            <i className="ion-trash-a"></i>
                        </button>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default Comment
