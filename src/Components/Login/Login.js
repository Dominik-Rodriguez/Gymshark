import axios from 'axios';
import React from 'react';
// import {connect} from 'react-redux';
import './Login.scss';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            verPassword: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            country: '',
            state: '',
            registerView: false
        };
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleToggle = () => {
        this.setState({registerView: !this.state.registerView});
    }

    // sendEmail = () => {
    //     const {email} = this.state
    //     axios.post('/api/email', {email})
    //     .then((res)=> {}).catch((err) => console.log(err));
    // }

    handleRegister = () => {
        const {email, password, verPassword, firstName, lastName, address, city, country, state} = this.state;
        if(password && password === verPassword){
            axios
                .post('/api/register', {email, password, firstName, lastName, address, city, country, state})
                .then((res) => {
                    this.props.history.push('/profileInfo');
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
                this.props.history.push('/profileInfo');
        }).catch(err => alert('Email or password is incorrect.'))
    };

    render(){
        console.log(this.state.firstName);
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
                            <>
                                <h3>LOG INTO MY GYMSHARK</h3>
                                <h5>EMAIL ADDRESS:</h5>
                                <input 
                                    value={this.state.email}
                                    name='email'
                                    className="email"
                                    onChange={(e) => this.handleInput(e)}    
                                />
                                <h5>PASSWORD: </h5>
                                <input 
                                    value={this.state.password}
                                    name='password'
                                    type="password"
                                    className="password"
                                    onChange={(e) => this.handleInput(e)}
                                />
                            </>
                        )}
                        {this.state.registerView ? (
                            <>
                            <h5>FIRST NAME: </h5>
                                <input 
                                    value={this.state.firstName}
                                    type="firstName"
                                    className="firstName"
                                    name="firstName"
                                    onChange={(e) => this.handleInput(e)}
                                />
                                
                                <h5>LAST NAME: </h5>
                                <input 
                                    className="lastName"
                                    value={this.state.lastName}
                                    type="lastName"
                                    name="lastName"
                                    onChange={(e) => this.handleInput(e)}
                                />
                               
                               <h5>EMAIL ADDRESS:</h5>
                                <input 
                                    value={this.state.email}
                                    name='email'
                                    type="email"
                                    className="email"
                                    onChange={(e) => this.handleInput(e)}    
                                />

                                <h5>ADDRESS: </h5>
                                <input 
                                    className="address"
                                    type="text"
                                    value={this.state.address}
                                    name="address"
                                    onChange={(e) => this.handleInput(e)}
                                />

                                <h5>CITY: </h5>
                                <input 
                                    className="city"
                                    type="city"
                                    value={this.state.city}
                                    name="city"
                                    onChange={(e) => this.handleInput(e)}
                                />
                                
                                <h5>STATE: </h5>
                                <input 
                                    className="state"
                                    type="text"
                                    value={this.state.state}
                                    name="state"
                                    onChange={(e) => this.handleInput(e)}
                                />
                                
                                <h5>COUNTRY: </h5>
                                <input 
                                    className="COUNTRY"
                                    type="text"
                                    value={this.state.country}
                                    name="country"
                                    onChange={(e) => this.handleInput(e)}
                                />
                                
                                <h5>PASSWORD: </h5>
                                <input 
                                    value={this.state.password}
                                    name='password'
                                    type="password"
                                    className="password"
                                    onChange={(e) => this.handleInput(e)}
                                />

                                <h5>VERIFY PASSWORD: </h5>
                                <input 
                                    className="verPassword"
                                    type="password"
                                    value={this.state.verPassword}
                                    name="verPassword"
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