import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/user_actions';

class Register extends Component {
    
            state={
                name:'',
                lastname:'',
                email: '',
                password: '',
                confirmPassword:'',
                errors: [],
            };
        
            handleChange=(e)=>{
                
                this.setState({[e.target.name]: e.target.value}) 
               
            }
        
            
            displayErrors=(errors)=>errors.map((error, index)=><p key={index}>{error}</p>)
            
            isFormEmpty=({name, lastname, email, password, confirmPassword})=>{
                return (
                    !name.length || 
                    !lastname.length || 
                    !email.length || 
                    !password.length || 
                    !confirmPassword.length
                    );
            }

            isPasswordMatching=({password, confirmPassword})=>{
                if(password.length < 6 || confirmPassword.length < 6){
                    return false;
                } else if( password!==confirmPassword){
                    return false;
                } else {
                    return true;
                }
            }
            isFormValid=()=> {
                let errors=[];
                let error;
                if(this.isFormEmpty(this.state)){
                    error= {message: 'Fill into all fields'};
                    this.setState({errors: errors.concat(error)});
                }
                else if(!this.isPasswordMatching(this.state)){
                    error={message: 'Password is invalid or doesn\'t match with the confirm password'};
                    this.setState({errors: errors.concat(error)});
                } else{
                    return true;
                }

            }
            

            handleSubmit=(e)=>{
                e.preventDefault();
                let dataToSubmit={
                    name:this.state.name,
                    lastname:this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword:this.state.confirmPassword
                };
                if(this.isFormValid(this.state)){
                    this.setState({errors:[]})
                    this.props.dispatch(registerUser(dataToSubmit))
                        .then(res=> {
                            
                            if(res.payload.success){
                                this.props.history.push('/login')
                            }
                            else{
                                this.setState({
                                    errors: this.state.errors.concat(
                                        'Failed to Register, Incorrect or missing details'
                                    )
                                })
                            }
                        }).catch(err=>{
                            this.setState({
                            errors: this.state.errors.concat(err)
                        })
                        }) 
                }
                else {
                    console.log('Form is not valid');
                    
                    this.setState({
                        errors: this.state.errors.concat('Either Email or Password is missing')
                    })
                }
            }
        
            render() {
                return (
        <div className='container'>
        <h2>Sign Up</h2>
        <div className="row">
            <form className="col s12" /*onSubmit={event=>submitForm(event)}*/>
                
            <div className="row">
                <div className="input-field col s6">
                <label htmlFor='name'>Name</label>
                    <input
                        name='name'
                        value={this.state.name}
                        onChange={e=>this.handleChange(e)}
                        id='name'
                        type='text'
                        className='validate'
                    />
                    
                    <span className='helper-text' 
                    data-error='Type a correct type name'
                    data-success='Correct Name Type' />
                    </div>

                <div className="input-field col s6">
                <label htmlFor='lastname'>Lastname</label>
                    <input
                        name='lastname'
                        value={this.state.lastname}
                        onChange={e=>this.handleChange(e)}
                        id='lastname'
                        type='text'
                        className='validate'
                    />
                    
                    <span className='helper-text' 
                    data-error='Type a correct type lastname'
                    data-success='Correct Lastname Type' />
                    </div>
                </div>
                

                <div className="row">
                <div className="input-field col s12">
                <label htmlFor='email'>Email</label>
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
                    <label htmlFor='password'>Password</label>
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

                
                <div className="row">
                    <div className="input-field col s12">
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        name='confirmPassword'
                        value={this.state.confirmPassword}
                        onChange={e=>this.handleChange(e)}
                        id='confirmPassword'
                        type='password'
                        className='validate'
                    />
                    
                    <span className='helper-text' 
                    data-error='Password do not match'
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
                            Create an Account
                        </button>&nbsp;&nbsp;&nbsp;&nbsp; 
                        <span>Already have an account? </span>
                        <Link to='/login'>
                        <button className="btn waves-effect red lighten-2"
                                type='submit'
                                name='action'
                                >
                            Login
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
    return ({
        user: state.user
    })
}
export default connect(mapStateToProps)(Register);