import React, { useContext } from 'react';
import { useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handelFbSignIn, handelGoogleSignIn, handelSignOut, initializeLoginFramework, signInwithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    password:'',
    photo:''
  });

  initializeLoginFramework()

  const [loggedInUser, setloggedInUser]= useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const {from} = location.state || {from: {pathname:"/"}}

  const GoogleSignIn = () =>{
    handelGoogleSignIn()
    .then(res =>{
      handelResponse(res, true)
    })
  }
  const FbSignIn = () =>{
    handelFbSignIn()
    .then(res =>{
      handelResponse(res, true)
    })
  }

  const signOut = () =>{
    handelSignOut()
    .then(res =>{
      handelResponse(res, false)
    })
  }

const handelBlur = (event)=>{
  let isFormValid = true;
  if(event.target.name === 'email'){
    isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
  }
  if(event.target.name === 'password'){
    const passLength = event.target.value.length > 6;
    const passHasNumber = /\d{1}/.test(event.target.value);
    isFormValid = passLength && passHasNumber;
  }
  if(isFormValid){
    const userInfo = {...user};
    userInfo[event.target.name] = event.target.value;
    setUser(userInfo);
  }

}

const handelSubmit = (e) =>{
  if(newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name, user.email, user.password)
    .then(res =>{
      handelResponse(res, true)
    })
  }
if(!newUser && user.email && user.password){
  signInwithEmailAndPassword(user.email, user.password)
  .then(res =>{
    handelResponse(res, true)
  })
}

  e.preventDefault()
}

const handelResponse = (res, redirect) =>{
  setUser(res);
  setloggedInUser(res);
  if(redirect){
    history.replace(from);
  }
}

  return (
    <div style={{textAlign:'center'}}>
      {
         user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : 
         <button onClick={GoogleSignIn}>Sign In using Google</button>
      }
      <button onClick={FbSignIn}>Sign In using Facebook</button>
      {
       user.isSignedIn && <div>
         <p>WELCOME, {user.name}</p>
         <p>{user.email}</p>
         <img style={{height:150}} src={user.photo} alt=""/>
         </div>
      }
     <div>
       <h1>User Authentication</h1>
       <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
       <label htmlFor="newUser">New user sign up</label>
     <form onSubmit={handelSubmit}>
      {newUser && <input type="text" onBlur={handelBlur} name ='name' placeholder ='name'/>}
        <br/>
        <input type="text" onBlur={handelBlur} name ='email' placeholder ='email' required/>
        <br/>
        <input type="password" onBlur={handelBlur} name="password" placeholder ='pass' required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>user {newUser ? "created" :"logged In"} successfully</p>
      }
     </div>
    </div>
  );
}

export default Login;
