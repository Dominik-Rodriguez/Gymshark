import axios from 'axios';
import React from 'react';
// import {connect} from 'react-redux';
import './Login.scss';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            // username: '',
            password: '',
            verPassword: '',
            registerView: false
        };
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleToggle = () => {
        this.setState({registerView: !this.state.registerView});
    }

    handleRegister = () => {
        const {email, password, verPassword} = this.state;
        if(password && password === verPassword){
            axios
                .post('/api/register', {email, password})
                .then((res) => {
                    // this.props.getUser(res.data);
                    this.props.history.push('/')
                }) .catch((err) => console.log(err));
        } else {
            alert('Passwords do not match.');
        }
    };

    handleLogin = () => {
        const {email, password} = this.state;
        axios
            .post('/api/login', {email, password})
            .then((res) => {
                // this.props.getUser(res.data);
                this.props.history.push('/');
        });
    };

    render(){
        return(
            <div className="loginPage">
                <div className="login">
                    <section>
                        {this.state.registerView ? (
                            <>
                                <h3>CREAT AN ACCOUNT</h3>
                                <p>Sign up and you'll be able to manage your account, track</p>
                                <p>orders, save products and access easier returns</p>
                            </>
                        ) : (
                            <h3>LOG INTO MY GYMSHARK</h3>
                        )}
                        <h5>EMAIL ADDRESS:</h5>
                        <input 
                            value={this.state.email}
                            name='email'
                            // placeholder='Email'
                            className="email"
                            onChange={(e) => this.handleInput(e)}    
                        />
                        <h5>PASSWORD: </h5>
                        <input 
                            value={this.state.password}
                            name='password'
                            type="password"
                            // placeholder="Password"
                            className="password"
                            onChange={(e) => this.handleInput(e)}
                        />
                        {this.state.registerView ? (
                            <>
                            <h5>VERIFY PASSWORD: </h5>
                                <input 
                                    className="verPassword"
                                    type="password"
                                    value={this.state.verPassword}
                                    name="verPassword"
                                    // placeholder="Verify password"
                                    onChange={(e) => this.handleInput(e)}
                                />
                                <button onClick={this.handleRegister} className="login">
                                    CREATE ACCOUNT
                                </button>
                                <p className="loginbottomtxt">
                                    Have an account? {" "}
                                    <span onClick={this.handleToggle} className='Link'>
                                        Login Here
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <button onClick={this.handleLogin} className="login">
                                    LOGIN
                                </button>
                                <p className="loginbottomtxt">
                                    New to Gymshark? {" "}
                                    <span onClick={this.handleToggle} className="link">
                                        Creat An Account
                                    </span>
                                </p>
                            </>
                        )}
                    </section>
                </div>
            </div>
        )
    }


}


export default Login;