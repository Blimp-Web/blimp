import '../App.css';
import React from 'react'
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";


var keys = sessionStorage.getItem("KEYS")


function LikeButton(){


    document.getElementById('like_count' + (sessionStorage.getItem("NUM"))).innerHTML++
  
    /*var y = +x + 1
    console.log(y)
  
    document.getElementById('like_count' + (sessionStorage.getItem("NUM"))).innerHTML = y*/
  
  let title = sessionStorage.getItem('CURRENT_ITEM')
  firebase.database().ref("My_Products/Men's Clothing:/" + sessionStorage.getItem("KEYS")).update({
    likes: document.getElementById('like_count' + (sessionStorage.getItem('NUM'))).innerHTML
  
  }, (error) => {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
    }
  });
  
  firebase.database().ref(/users/+ sessionStorage.getItem('USER').replace('.','') + '/liked/' + title).set({
    liked: 'true'
  });
  }

  function LikeButtonFront(){

    let title = sessionStorage.getItem('CURRENT_ITEM')
  firebase.database().ref('/users/'+ sessionStorage.getItem('USER').replace('.','') + '/liked/' + title).on("value", function(snapshot) {
      
      var data = snapshot.val();
  
      console.log((data.liked));
  
      if(data.liked == 'false'){
        console.log('False')
        LikeButton()
  
      }
  
      if(data.liked == 'true'){
        console.log('True')
      }
  
  
  
  
  });
  }


  function LikeComponent() {
    return (
        <div className={'likeButtonContainer'} id={`likeButton${sessionStorage.getItem("NUM")}`}>
            <h1 id={`like_count${sessionStorage.getItem("NUM")}`}>1</h1>
            <button className={'LikeButton'} onClick={LikeButtonFront}>Like</button>
        </div>
  
    );
  }
  
  export default LikeComponent;