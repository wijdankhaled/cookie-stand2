'use strict';
const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function randomNum(min,max ){
  return Math.floor(Math.random()*(max,min+1)+min);
}


let locationarr = [];

function Location(locname, Mincust, maxcust, avgcookie) {
  this.locname = locname;
  this.Mincust = Mincust;
  this.maxcust = maxcust;
  this.avgcookie = avgcookie;
  this.cusechhour= [];
 this.cookiesechhour= [];
 this.totalsales=0;

 locationarr.push(this);
}

Location.prototype.calccuseachhour = function () {

  for (let i = 0; i < hours.length; i++) {

    this.cusechhour.push(randomNum(this.Mincust, this.maxcust));
  }
}

Location.prototype.calccookieseachhour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.cookiesechhour.push(Math.floor(this.cusechhour[i] * this.avgcookie));

    this.totalsales += this.cookiesechhour[i];
  }
  

}

let Seattle = new Location('seattle', 23, 65,3.6);
let tokyo = new Location('tokyo', 23,24,1.2);
let Dubai = new Location('Dubai', 11, 38, 3.7);
let Paris = new Location('Paris', 20, 38, 2.3);
let Lima = new Location('Lima', 2, 16, 4.6);


let theparent = document.getElementById('parent');

let table = document.createElement('table');
theparent.appendChild(table);
// make header
function makeheder() {
  let hrow = document.createElement('tr');
  table.appendChild(hrow);

  let thead = document.createElement('th');
  hrow.appendChild(thead);
  thead.textContent = 'Name';
  for (let i=0;i<hours.length;i++){
    let theelement = document.createElement('th');
    hrow.appendChild(theelement);
    theelement.textContent=hours[i];
  }
  let thlast=document.createElement('th');
  hrow.appendChild(thlast);
  thlast.textContent='Daily location total';
}
makeheder();

Location.prototype.render=function () {
  let datarow=document.createElement('tr');
  table.appendChild(datarow);

  let namedata=document.createElement('td');
  datarow.appendChild(namedata);
  namedata.textContent=this.locname;
  for (let i=0;i<hours.length;i++){
    let tdelement=document.createElement('td');
    datarow.appendChild(tdelement);
    tdelement.textContent=this.cookiesechhour[i];
  }
  let totaldata =document.createElement('td');
  datarow.appendChild(totaldata);
  totaldata.textContent=this.totalsales;
}

function makefooter() {
  let footertable=document.createElement('tr');
 table.appendChild(footertable);
 let footerth=document.createElement('th');
 footertable.appendChild(footerth);
 footerth.textContent='total';
 for (let i=0;i<hours.length;i++){
   let totaleachhour=0;
   for(let j=0;j<locationarr.length;j++){
totaleachhour+=locationarr[j].cookiesechhour[i];
   }
   let footertotal=document.createElement('th');
   footertable.appendChild(footertotal);
   footertotal.textContent=totaleachhour;
 }

}

for (let i=0;i<locationarr.length;i++){
  locationarr[i].calccuseachhour();
  locationarr[i].calccookieseachhour();
  locationarr[i].render();
  
  

  }
  makefooter();
  //------------------------------------------------------------------------------
let form=document.getElementById('shopform');
let locname=form.shopinput;
let Mincust=form.mininput;
let maxcust=form.maxinput;
let avgcookie =form.avginput;

  
  form.addEventListener('submit',function (event) {
    event.preventDefault();
    let newlocation=new Location(locname.value,Mincust.value,maxcust.value,avgcookie.value);
    locationarr.push(newlocation);

    newlocation.calccuseachhour();
    newlocation.cookiesechhour();
    let row =document.createElement('tr');
    table.appendChild(row);

    let hrow=document.createElement('th');
    row.appendChild(hrow);
    hrow.textContent=newlocation.locname;
    for (let i=0;i<hours.length;i++){
        let tdelement=document.createElement('td');
        datarow.appendChild(tdelement);
        datarow.textContent=newlocation.cookiesechhour[i];
    }
    let totaldata =document.createElement('td');
    datarow.appendChild(totaldata);
    totaldata.textContent=newlocation.totalsales;



    function creatfoter () {
        let footertable=document.createElement('tr');
       table.appendChild(footertable);
       let footerth=document.createElement('th');
       footertable.appendChild(footerth);
       footerth.textContent='total';
       for (let i=0;i<hours.length;i++){
         let totaleachhour=0;
         for(let j=0;j<locationarr.length;j++){
      totaleachhour+=newlocation.cookiesechhour[i];
         }
         let footertotal=document.createElement('th');
         footertable.appendChild(footertotal);
         footertotal.textContent=totaleachhour;
       }
    }
    newlocation.creatfoter();
  })