import '../App.css';
import React from 'react'
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import { Link } from 'react-router-dom'
import ReactDOM from "react-dom";
import Stripe from './Stripe'
import LikeComponent from './Like'




var img2_list = []
var price_list = []
var store_names = []
var like_list = []
var img_list = []
var title_list = []
var keyList = []

var item


function getItemDetails(){
    var niche = "Men's Clothing:";

        var db = firebase.database()
        var ref = db.ref('My_Products/' + niche);
        
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
          var data = snapshot.val();
          var keys = Object.keys(data);
          for (var i = 0 ; i < keys.length; i++){
              var k = keys[i]
              var image = data[k].image;
              var image2 = data[k].image2;
              /*var color = data[k].color;
              var color2 = data[k].color2;
              var color3 = data[k].color3;
              var color4 = data[k].color4;
              var color5 = data[k].color5;*/
              var titlex = data[k].title;
              var price = data[k].price;
              var likes = data[k].likes


                if(titlex == item){
                    console.log('fart%$%%$%#$#%$%$%$%$@@$##@#@$@#$#%##@#%#@@@$#$@$@$$$@$@#@$@$$$')
                    console.log(item)
                    img_list.push(image);
                    img2_list.push(JSON.stringify(image2));
                    title_list.push((titlex));
                    price_list.push(JSON.stringify(price));
                    like_list.push((likes))
                    keyList.push(k)
                    console.log(img_list[0])
                    console.log(like_list[0])
                    RenderDetails()
                }



    
    
          }
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
}

function RenderDetails(){
    let payDiv = document.createElement('div')
    payDiv.setAttribute('id', 'payDiv')
    document.getElementById('Container').appendChild(payDiv)

    let likeDiv = document.createElement('div')
    likeDiv.setAttribute('id', 'likeDiv')

    document.getElementById('Container').appendChild(likeDiv)

    document.getElementById('img1').setAttribute('src', img_list[0])
    ReactDOM.render(<Stripe/>, document.getElementById('payDiv'));
    document.getElementById('name').setAttribute('hidden', 'true')

    ReactDOM.render(<LikeComponent/>, document.getElementById('likeDiv'))
    document.getElementById(`like_count${sessionStorage.getItem('NUM')}`).innerHTML = like_list[0]
}

function Item({match}) {
    console.log(match.params.item)
    item = (match.params.item).replace('%20', ' ')
  return (
    <div onLoad={getItemDetails()} className={'Container'} id={'Container'}>
    <h1>{(match.params.item).replace('%20', ' ')}</h1>
    <img id={'img1'}></img>
    <div id={'payDiv'}></div>
    </div>

  );
}

export default Item;