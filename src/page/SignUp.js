import axios from 'axios'
import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function SignUp(props) {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users') || '[]'))
    const [inputName, setInputName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [errMess, setErrMess] = useState('')

    const BASE_URL = 'https://api.realworld.io/api'
    const history = useNavigate()

    const register = async (newUser) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, newUser)
            props.setIsLogin(true)
            localStorage.setItem('isLogin', "true")
            props.setName(res.data.user.username)
            history('/')
            localStorage.setItem('users', JSON.stringify([...users, res.data]))
            localStorage.setItem('user_loginn', JSON.stringify(res.data))
            console.log(res.data)
            setErrMess('')
        }
        catch (e) {
            const error = e.response.data.errors;
            setErrMess(`email or username ${error[Object.keys(error)[0]]}`)
            console.log(e)
        }
    }

    const handleSubmitSignUp = (e) => {
        e.preventDefault()
        const data = {
            user: {
                username: inputName,
                email: inputEmail,
                password: inputPassword
            }
        }
        register(data)
    }


    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link to='/sign-in' >Have an account?</Link>
                        </p>

                        {/* <ul className="error-messages">
                            <li>That email is already taken</li>
                        </ul> */}

                        <form onSubmit={handleSubmitSignUp}>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                    value={inputName}
                                    onChange={(e) => setInputName(e.target.value)} />
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
                            <p className='errMess'>{errMess}</p>
                            <button className="btn btn-lg btn-primary pull-xs-right">
                                Sign up
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp
