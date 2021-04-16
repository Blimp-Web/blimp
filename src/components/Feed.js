import '../App.css';
import React from 'react'
import ReactDOM from "react-dom";
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import Stripe from './Stripe'
import LikeComponent from './Like'
import { Link } from 'react-router-dom'



sessionStorage.setItem('NUM', 0)
console.log(sessionStorage.getItem('NUM'))
var scroll_distance = 0;
var max_scroll = 20;
var num = 0
num = 0
var num_index = []
var total_scroll = 0
var num_add = 1
var img2_list = []
var price_list = []
var store_names = []
var like_list = []
var img_list = []
var title_list = []
var color_list = []
var color_list2 = []
var color_list3 = []
var color_list4 = []
var color_list5 = []
var keyList = []

window.addEventListener('load', ()=>{
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
              var color = data[k].color;
              var color2 = data[k].color2;
              var color3 = data[k].color3;
              var color4 = data[k].color4;
              var color5 = data[k].color5;
              var titlex = data[k].title;
              var price = data[k].price;
              var likes = data[k].likes
              img_list.push(image);
              //console.log(img_list)
              img2_list.push(JSON.stringify(image2));
              title_list.push(JSON.stringify(titlex));
              price_list.push(JSON.stringify(price));
              color_list.push(JSON.stringify(color));
              color_list2.push(JSON.stringify(color2));
              color_list3.push(JSON.stringify(color3));
              color_list4.push(JSON.stringify(color4));
              color_list5.push(JSON.stringify(color5));
              like_list.push((likes))
              keyList.push(k)


    
    
          }
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
})



function off(){

    //scroll_distance = 0;
    //console.log(`new scrooll ${num}`)
    //var bodyRect = document.getElementById('scroll_box').getBoundingClientRect(),
    var elemRect = document.getElementById(`box${num}`).getBoundingClientRect()
    //offset = elemRect.top - bodyRect.top;
  
    //console.log(offset + "important new element vertical offset from body" );
  
      if (elemRect.top <= 0){
        document.getElementById('scroll_box').removeChild(document.getElementById(`box${num}`));
        //num_index.shift();
        //num_index.push(num)
        console.log(num)
        num++;
        renderBox()
  
    }
  
  };
  

  function renderBox(){
    const rootElement = document.getElementById("scroll_box");
    const box = document.createElement('div')
    const box2= document.createElement('div')
    box.setAttribute('id', `box${num}`)
    box.setAttribute('class', 'big-div')

    box2.setAttribute('class', 'big-div')
    box2.setAttribute('style', 'background-color: transparent; margin-top: 100px; margin-bottom: 100px;')

    rootElement.appendChild(box)
    rootElement.appendChild(box2)
    const widget = document.getElementById(`box${num}`)

    let img = document.createElement('img')
    img.setAttribute('src', img_list[num])
    img.setAttribute('class', 'img-style')
    widget.appendChild(img)

    sessionStorage.setItem('CURRENT_ITEM', title_list[num].replace('"', '').replace('"', ''))


    sessionStorage.setItem('CURRENT_PRICE', parseFloat(price_list[num].split('-')[0].replace('"', '').replace('$', '').split('.')[0].replace("US", '') * 1.25))


    let paymentContainer = document.createElement('div')
    paymentContainer.setAttribute('id', `payDiv${num}`)

    widget.appendChild(paymentContainer)

    let payDivId = document.getElementById(`payDiv${num}`)

    ReactDOM.render(<Stripe/>, payDivId);
    sessionStorage.setItem("NUM", num)

    sessionStorage.setItem("KEYS", keyList[num])

    SetLikeValueFalse()

    let likeDiv = document.createElement('div')
    likeDiv.setAttribute('id', `likeDiv${num}`)

    widget.appendChild(likeDiv)

    ReactDOM.render(<LikeComponent/>, document.getElementById(`likeDiv${num}`))

    document.getElementById(`like_count${num}`).innerHTML = like_list[num]

    let LinkDiv = document.createElement('div')
    LinkDiv.setAttribute('id', `linkDiv${num}`)

    widget.appendChild(LinkDiv)

    ReactDOM.render(<a className={'ViewMore'} href={`/feed/${title_list[num].replace('"', '').replace('"', '')}`}>ViewMore</a>, document.getElementById(`linkDiv${num}`))

    

  }

function scrollBox(){
    var scroll_box = document.getElementById('scroll_box')

    console.log(scroll_box.getBoundingClientRect())
}

function SetLikeValueFalse(){
  let title = sessionStorage.getItem('CURRENT_ITEM')
  firebase.database().ref(/users/+ sessionStorage.getItem('USER').replace('.','') + '/liked/' + title).on("value", function(snapshot) {
    if (snapshot.exists()) {
      
      //var data = childSnapshot.val();

      //console.log(JSON.stringify(data.liked));

     /* if (data.liked == 'true'){
        console.log('liked = true')
      }
      if (data.liked == null){
        console.log('liked = not true')
      }*/
      console.log('SnapShot Exists')


    }
    else{
      console.log('No record of such snapshot')


      firebase.database().ref(/users/+ sessionStorage.getItem('USER').replace('.','') + '/liked/' + title).set({
        liked: 'false'
      });
      console.log('Snapshot Created')
    }

  });
}

function ResetNum(){
  num = 0
}



    
class Feed extends React.Component {
    constructor(props) {
      super(props)
      this.myRef = React.createRef()
      this.state = {scrollTop: 0}
    }
    
    onScroll = () => {
        off()
        //scroll_distance++;
        //console.log(scroll_distance);
        
        //if (scroll_distance == max_scroll){

            
        //}
    }
  
    render() {
      const {
        scrollTop
      } = this.state
      return (
        <div
          id='scroll_box'
          ref={this.myRef}
          onScroll={this.onScroll}
          style={{
            position: 'relative',
            top: '5%',
            border: '1px solid black',
            width: '100%',
            height: '100%',
            overflow: 'scroll'
          }} onLoad={ResetNum()}>
              <div className='big-div-main' id='box0'>Welcome</div>
              <div className='big-div' style={{backgroundColor: 'transparent'}}></div>
        </div>
      )
    }
  }
  

export default Feed;


  