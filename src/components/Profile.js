import '../App.css';
import React from 'react'
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";

window.addEventListener('load', ()=>{
  if(sessionStorage.getItem('USER') !== null){
firebase.database().ref('users/' + sessionStorage.getItem('USER').replace('.','')).on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      
      var data = childSnapshot.val();

      //console.log(data.userName);
      //console.log(data.userEmail)

      if (data.userName !== undefined){
        document.getElementById('UserName').innerHTML = data.userName
      }
      if(data.userEmail !== undefined){
        document.getElementById('UserEmail').innerHTML = data.userEmail
      }



    });

  });
}

})








function Profile() {
  return (
    <div id='ProfileContainer' className="ProfileContainer">
        <h1 id="UserName"></h1>
        <h1 id='UserEmail'></h1>
    </div>

  );
}

export default Profile;