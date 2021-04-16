import '../App.css';
import React from 'react'
import Chart from 'chart.js/auto';

import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";


var payment_history = []
var payment_arr = []
var time_arr = []
var time_arr_orders = []
var order_arr = []
var time_separation_arr = []
var order_separation_arr = []

var time_obj = {}

function getBalance(){
    var db = firebase.database()
        var ref = db.ref('/users/joey@gmailcom/balance');
        
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
          var data = snapshot.val();
          var keys = Object.keys(data);
          console.log(keys)
          for (var i = 0 ; i < keys.length; i++){
            var k = keys[i]

            var payment = data[k].payment
            var time = data[k].time

            payment_history.push(parseFloat(JSON.stringify(payment).replace('"', '').replace('"', '')))
            payment_arr.push(parseFloat(JSON.stringify(payment).replace('"', '').replace('"', '')))
            time_arr.push(time)
            console.log(time_arr)
            console.log(payment_history)
            console.log(payment_history[0])

            if(payment_arr.length < keys.length){
                console.log('to small')
            }
            else{
                addValues()
                show()
                chart()
                getOrders()
                allcards()
            }


          }
        })

  
                
}
function getOrders(){
    var db = firebase.database()
        var ref = db.ref('/users/joey@gmailcom/orders');
        
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
          var data = snapshot.val();
          var keys = Object.keys(data);
          console.log(keys)
          for (var i = 0 ; i < keys.length; i++){
            var k = keys[i]

            var order = data[k].item
            var time = data[k].time

            order_arr.push(order)
            time_arr_orders.push(time)
            console.log(order_arr)


            if (time_obj[time] !== undefined){
                time_obj[time] += 1
            }
            if (time_obj[time] == undefined){
                time_obj[time] = 1
            }



            if(order_arr.length < keys.length){
                console.log('to small to')
            }
            else{
                if(window.location.pathname == '/dashboard'){
                chart2()
                allcards()
                }
            }


          }
        })

  
                
}


function addValues(){

    console.log(payment_history.reduce((a, b) => a + b, 0))
    
    sessionStorage.setItem('BALANCE', payment_history.reduce((a, b) => a + b, 0))

    document.getElementById('balance').innerHTML = sessionStorage.getItem('BALANCE') + '$'

    console.log('added the values')

    


}


function chart(){

    var ctx = document.getElementById('myChart').getContext('2d');
    document.getElementById('myChart').setAttribute('style', "background-color: white;")
    var myChart = new Chart(ctx, {
        type: 'line',
        responsive: false,
        width:200,
        height:100,
        scaleShowGridLines: false,
        showScale: false,
        maintainAspectRatio: window.maintainAspectRatio,
        barShowStroke: false,
        data: {
            labels: time_arr,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Payments',
                data: payment_arr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
        maintainAspectRatio: true,
    });


}

function chart2(){
    orderDays()
    ordersPerDay()
    var ctx = document.getElementById('myChart2').getContext('2d');
    document.getElementById('myChart2').setAttribute('style', "background-color: white;")
    var myChart = new Chart(ctx, {
        type: 'bar',
        responsive: false,
        width:200,
        height:100,
        scaleShowGridLines: false,
        showScale: false,
        maintainAspectRatio: window.maintainAspectRatio,
        barShowStroke: false,
        data: {
            labels: time_separation_arr,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Total Orders',
                data: order_separation_arr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
        maintainAspectRatio: true,
    });
}

function orderCards(){
    let orderDiv = document.getElementById('orders')

    let orderCard = document.createElement('div')

    orderCard.setAttribute('class', 'cards')
    orderCard.innerHTML = order_arr[0]

    orderDiv.appendChild(orderCard)

    
}

function allcards(){
    var x  = order_arr.length
    for (var i = 0; i < x; i++){
        let orderCard = document.createElement('div')
        let orderDiv = document.getElementById('orders')
        orderCard.setAttribute('class', 'cards')
        orderCard.innerHTML = order_arr[i]
        orderCard.setAttribute('style', 'font-family: Arial, Helvetica, sans-serif; font-size: 100%;')
        
        orderDiv.appendChild(orderCard)
    }
    document.getElementById('div-text').innerHTML = `Orders(${x})`

  
}

function orderDays(){
    var x = time_arr_orders.length
    for (var i = 0; i < x; i++){
        var bool = time_separation_arr.includes(time_arr_orders[i]);

        if(bool == false){
            time_separation_arr.push(time_arr_orders[i])
        }
        else{
            
        }
    }
    console.log(time_separation_arr + ' big array')
}


function ordersPerDay(){

    for(var i = 0;i < (time_separation_arr.length); i++){
        order_separation_arr.push(time_obj[time_separation_arr[i]])
    }

}
function show(){
    let canvas = document.createElement('canvas')
    let canvas2 = document.createElement('canvas')
    canvas.setAttribute('id', 'myChart')
    document.getElementById('dashBoard').appendChild(canvas)
    canvas2.setAttribute('id', 'myChart2')
    document.getElementById('dashBoard').appendChild(canvas2)

}


window.onload = function(){
    if(window.location.pathname == '/dashboard'){
    getBalance()
    document.getElementById('orders').removeChild(document.getElementById('refresh'))
    }
}



function DashBoard() {

  return (
    <div id={'dashBoard'}  className="dashboard">
        <h1 id={'balance'}>0$</h1>
        <div class='card' id="orders">
        <h4 id="div-text">Orders</h4>
        <h1 id='refresh'>Refresh to load analytics</h1>
        </div>
    </div>

  );
}

export default DashBoard;