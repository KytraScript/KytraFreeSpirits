import React from 'react';

const Login = (props) => {
    return (
        <div className={'login-main'}>
            <div className={'login-title'}>Free Spirits</div>
            <div className={'login-card'}>
                <div className={'login-submit'}>
                    <form>
                        <div id={'login-user'}>
                            User:
                            <input type={"text"} name={"userName"} onChange={props.handleChange}/>
                        </div>
                        <div  id={'login-password'}>
                            Password:
                            <input type={"password"} name={"password"}/>
                        </div>
                        <div id={'login-btn-wrapper'}>
                        <button id={'btn-login'} onClick={props.validate}>Login</button>
                        <button id={'btn-join'} onClick={props.joinUs}>Join</button>
                        </div>
                    </form>
                    <a id={'login-forgot'} href={'#'}>Forgot Password</a>
                </div>
            </div>
        </div>
    )
}

export default Login;