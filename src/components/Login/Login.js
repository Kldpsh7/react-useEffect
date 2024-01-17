import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../context/auth-context';

const emailReducer = (state,action) => {
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')};
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.includes('@')};
  }
  return {value:'',isValid:false};
};

const passwordReducer = (state,action) => {
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.trim().length>=4};
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length>=4};
  }
  return {value:'',isValid:false}
};

const collegeReducer = (state,action) => {
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.trim().length>0};
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length>0};
  }
  return {value:'',isValid:false}
};
  
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege,setEnteredCollege] = useState('');
  // const [collegeIsValid,setCollegeIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail] = useReducer(emailReducer,{value:'',isValid:null});
  const [passwordState,dispatchPassword] = useReducer(passwordReducer,{value:'',isValid:null});
  const [collegeState,dispatchCollege] = useReducer(collegeReducer,{value:'',isValid:null});

  const {isValid:emailIsValid} = emailState;
  const {isValid:passwordIsValid} = passwordState;
  const {isValid:collegeIsValid} = collegeState;

  useEffect(()=>{
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && collegeIsValid)
    }, 500);
    
    return () =>{
      clearTimeout(identifier)
    }
  },[emailIsValid,passwordIsValid,collegeIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value});
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({type:'USER_INPUT',val:event.target.value});
  };
  
  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'});
  };

  const validateCollegeHandler = () => {
    dispatchCollege({type:'INPUT_BLUR'});
  }

  const authCxt = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    authCxt.onLogin(emailState.value, passwordState.value,collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input 
          class={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`} 
          label='Email'
          id='email'
          type='email'
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input 
          class={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`} 
          label='Password'
          id='password'
          type='password'
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input 
          class={`${classes.control} ${collegeState.isValid === false ? classes.invalid : ''}`} 
          label='College'
          id='college'
          type='text'
          value={collegeState.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
