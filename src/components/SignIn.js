import '../App.css';
import React from 'react'
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";


  // Initialize Firebase

  const auth = firebase.auth();

  
  
  


function find_userPassword(){
    firebase.database().ref('users/' + document.getElementById('email').value.replace('.','')).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          
          var data = childSnapshot.val();
    
          console.log(data.userPassword);
          console.log('$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$%$$%$%$%%$%$%$%$$%$%$')

          if (document.getElementById('password').value == data.userPassword){
            //window.location.href="../feed"
  
        }
        else{
            alert('Wrong Password Try Again')
        }
    
        });
    
      });


}
function signOut(){
    sessionStorage.setItem('USER', null)
    auth.signOut();
    alert("Signed Out");
    
  }

function signIn(){
      
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var useremail = document.getElementById("useremail");

    
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    var emi = ("")
    emi += email.value;
    //NAME


    //useremail.innerHTML = ("User Email: " + email.value);
    alert(emi);


}

function handleSubmit () {
    const name = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //const surname = document.getElementById('surname').value;

    // to set into local storage
    /* localStorage.setItem("NAME", name);
    localStorage.setItem("SURNAME", surname); */
    
    sessionStorage.setItem("NAME", name);
    sessionStorage.setItem('PASS', password);
    //sessionStorage.setItem("SURNAME", surname);

    return;
}







var active_user

auth.onAuthStateChanged(function(user){
      
    if(user){
        
        var email = user.email;
        alert("Active User " + email);
        active_user = true;
        console.log("User Connected");
        sessionStorage.setItem("USER", user.email)

        if (window.location.pathname == '/SignIn'){
            window.location.href = './feed'
        }



        
        
        //Take user to a different or home page
        



        //is signed in
        
    }else{
        
        alert("No Active User");
        active_user = false;
        console.log("User Disconnected");
        //no user is signed in
    }
    
    
    
});


function SignInComp() {

    function signInAll(){
        handleSubmit()
        signIn()
        find_userPassword()
    }

  return (
<div id="from-container">
            <h1 id="signuptxt">SignIn</h1>
        <form>
            <input type="email" id="email" name="email" placeholder="Enter email.." />
            <input type="password" id="password" name="password" placeholder="Enter password.." />
            <a id="link1" href="signup.html">Dont have an account?SignUp.</a>
        </form>
		<button id="signUp" onClick={signInAll}>SignIn</button>
        <button id='signOut' onClick={signOut}>Sign Out</button>
        </div>

  );
}

export default SignInComp;