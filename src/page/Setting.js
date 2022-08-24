import axios from 'axios'
import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Setting(props) {
    let data = JSON.parse(localStorage.getItem('user_login')) || ''

    const [inputURL, setInputURL] = useState('')
    const [inputName, setInputName] = useState(data.user.username)
    const [inputBio, setInputBio] = useState('')
    const [inputEmail, setInputEmail] = useState(data.user.email)
    const [inputPassword, setInputPassword] = useState('')
   
    const BASE_URL = 'https://api.realworld.io/'
    const history = useNavigate()

    const handleOnClickLogOut = () => {
        props.setIsLogin(false)
        localStorage.removeItem('user_login')
        localStorage.setItem('isLogin', false)
        history('/')
    }

    const updateUser = async (updatedData) => {
        try {
            const res = await axios.put(`${BASE_URL}api/user`, updatedData, 
                {
                    headers: {
                        accept: "application/json",
                        authorization: `Token ${data.user.token}`
                    }
                })
            console.log(res.data)
            props.setName(res.data.user.username)
            localStorage.setItem('user_login', JSON.stringify(res.data))
            history('/myprofile')
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        const updatedData = {
            user: {
                email: inputEmail,
                username: inputName,
                bio: inputBio,
                image: inputURL
            }
        }
        updateUser(updatedData)
    }

    return (

        <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={handleSubmitUpdate}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="URL of profile picture"
                                        value={inputURL}
                                        onChange={(e) => setInputURL(e.target.value)} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input 
                                        className="form-control form-control-lg" 
                                        type="text" 
                                        placeholder="Your Name" 
                                        value={inputName}
                                        onChange={(e) => setInputName(e.target.value)} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea  
                                        className="form-control form-control-lg" 
                                        rows="8"
                                        placeholder="Short bio about you"
                                        value={inputBio}
                                        onChange={(e) => setInputBio(e.target.value)} ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input 
                                        className="form-control form-control-lg" 
                                        type="text" 
                                        placeholder="Email"
                                        value={inputEmail}
                                        onChange={(e) => setInputEmail(e.target.value)} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input 
                                        className="form-control form-control-lg" 
                                        type="password" 
                                        placeholder="Password"
                                        value={inputPassword}
                                        onChange={(e) => setInputPassword(e.target.value)} />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right">
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>

                        <div className='logout'>
                            <button onClick={handleOnClickLogOut} className='logout-btn' >Or click here to logout</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Setting
