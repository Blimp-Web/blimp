import '../App.css';
import React from 'react'
import ReactDOM from 'react-dom';
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import Profile from './Profile'




function openProfile(){
    let ProfileDiv = document.createElement('div')
    ProfileDiv.setAttribute('id', 'profileDiv')

    document.getElementById('root').appendChild(ProfileDiv)

    ReactDOM.render(<Profile/>, document.getElementById('profileDiv'))
}




function ProfileButton() {
  return (
    <div id='ProfileButtonContainer'>
        <button id="ProfileButton" onClick={openProfile()}>Profile</button>
    </div>

  );
}

export default ProfileButton;