import axios from 'axios'
import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Login(props) {
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [errMess, setErrMess] = useState('')

    const BASE_URL = 'https://api.realworld.io/api'
    const history = useNavigate()

    const login = async (user) => {
        try {   
            const res = await axios.post(`${BASE_URL}/users/login`, user)
            localStorage.setItem('isLogin', "true")
            props.setIsLogin(true)
            props.setName(res.data.user.username)
            history('/')
            localStorage.setItem('user_login', JSON.stringify(res.data))
            console.log(res.data)
            setErrMess('')
        }
        catch (e) {
            console.log(e.response.data.errors["email or password"])
            setErrMess(`email or password ${e.response.data.errors["email or password"]}`)
        }
    }


    const handleSubmitSignIn = (e) => {
        e.preventDefault()
        const data = {
            user: {
                email: inputEmail,
                password: inputPassword
            }
        }
        login(data)
    }


    return (

        <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <Link to='/sign-up' >Need an account?</Link>
                        </p>

                        <form onSubmit={handleSubmitSignIn} >
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
                            <p className='errMess'>{errMess}</p>
                            <button className="btn btn-lg btn-primary pull-xs-right">
                                Sign in
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
