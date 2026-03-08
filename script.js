let profiles = JSON.parse(localStorage.getItem("profiles")) || [];

function save(){
localStorage.setItem("profiles", JSON.stringify(profiles));
}

function createProfile(){

let name=document.getElementById("name").value;
let age=document.getElementById("age").value;
let city=document.getElementById("city").value;
let gender=document.getElementById("gender").value;
let preference=document.getElementById("preference").value;
let photo=document.getElementById("photo").files[0];

if(!name || !photo){
alert("Enter name and photo");
return;
}

let reader=new FileReader();

reader.onload=function(){

let profile={
name:name,
age:age,
city:city,
gender:gender,
preference:preference,
photo:reader.result,
likes:0
};

profiles.push(profile);

save();

display();

}

reader.readAsDataURL(photo);

}

function like(i){

profiles[i].likes++;

save();

display();

}

function display(){

let container=document.getElementById("profiles");

container.innerHTML="";

profiles.sort((a,b)=>b.likes-a.likes);

profiles.forEach((p,i)=>{

container.innerHTML+=`

<div class="card">

<img src="${p.photo}">

<div class="info">

<h3>${p.name}, ${p.age}</h3>

<p>${p.city}</p>

<p>❤️ ${p.likes} likes</p>

<button class="like" onclick="like(${i})">Like</button>

</div>

</div>

`;

});

}

display();
