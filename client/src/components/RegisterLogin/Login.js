import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/user_actions';


class Login extends React.Component {
    state={
        email: '',
        password: '',
        errors: []
    };

    handleChange=(e)=>{
        
        this.setState({[e.target.name]: e.target.value}) 
       
    }

    
    displayErrors=(errors)=>errors.map((error, index)=><p key={index}>{error}</p>)
    

    isFormValid=({email, password})=>email && password;
    
    handleSubmit=(e)=>{
        e.preventDefault();
        let dataToSubmit={
            email: this.state.email,
            password: this.state.password
        };
        if(this.isFormValid(this.state)){
            this.setState({errors:[]})
            this.props.dispatch(loginUser(dataToSubmit))
                .then(res=> {
                    if(res.payload.loginSuccess){
                        this.props.history.push('/')
                    }
                    else{
                        this.setState({
                            errors: this.state.errors.concat(
                                'Failed to log in, Incorrect Email or Password'
                            )
                        })
                    }
                })
        }
        else {
            this.setState({
                errors: this.state.errors.concat('Either Email or Password is missing')
            })
        }
    }



    render() {
    return (
        <div className='container'>
            <h2>Login</h2>
            <div className="row">
                <form className="col s12" /*onSubmit={event=>submitForm(event)}*/>
                    <div className="row">
                    <div className="input-field col s12">
                    <label className='active' htmlFor='email'>Email</label>
                        <input
                            name='email'
                            value={this.state.email}
                            onChange={e=>this.handleChange(e)}
                            id='email'
                            type='email'
                            className='validate'
                        />
                        
                        <span className='helper-text' 
                        data-error='Type a correct type email'
                        data-success='Correct Email Type' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <label className='active' htmlFor='password'>Password</label>
                        <input
                            name='password'
                            value={this.state.password}
                            onChange={e=>this.handleChange(e)}
                            id='password'
                            type='password'
                            className='validate'
                        />
                        
                        <span className='helper-text' 
                        data-error='Incorrect Password'
                        data-success='Correct Password' />

                        </div>
                    </div>

                    {this.state.errors.length>0 && (
                        <div>
                            {this.displayErrors(this.state.errors)}
                        </div>
                    )}
                    
                    <div className="row">
                        <div className="col s12">
                            <button className="btn waves-effect red lighten-2 mr-2"
                                    type='submit'
                                    name='action'
                                    onClick={this.handleSubmit} 
                                    >
                                Login
                            </button>&nbsp;&nbsp;&nbsp;&nbsp; 
                            <span>Don't have an acount? </span>
                            <Link to='/register'>
                            <button className="btn waves-effect red lighten-2"
                                    type='submit'
                                    name='action'
                                    >
                                Sign Up
                            </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
}

const mapStateToProps=(state)=>{
   return ({user: state.user})
}
export default connect(mapStateToProps)(Login);
