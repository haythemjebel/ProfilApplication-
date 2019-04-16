import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css']
})
export class MyskillComponent implements OnInit {
  data={
    name:"",
    phone:"",
    skill:"",
    address:"",
    price:"",
    comments:""
  }
  myuid :any;

  itemList:AngularFireList<any>
  itemArray=[]

  constructor(public db: AngularFireDatabase,public route:Router) {
    this.itemList = db.list('skills')
    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
        let y =action.payload.toJSON()
        y['$key']=action.key
        this.itemArray.push(y as ListItemClass)
      })
    })
    this.myuid =localStorage.getItem('uid')
    console.log(this.itemArray)
   }

  ngOnInit() {
  }

  editForm($key){
    for (let value of this.itemArray) {
      if (value['$key']==$key) {
        console.log(value['$key'])
        this.data.name=value['name']
        this.data.phone=value['phone'] 
        this.data.skill=value['skill'] 
        this.data.address=value['address'] 
        this.data.price=value['price'] 
        this.data.comments=value['comments']  
      }
    }

  }
  OnEdit($key){
    this.data.name
    this.data.phone
    this.data.skill 
    this.data.address 
    this.data.price
    this.data.comments
    this.itemList.set($key,{
      name:this.data.name,
      phone:this.data.phone,
      skill:this.data.skill,
      address:this.data.address,
      price:this.data.price,
      comments:this.data.comments
    })
    this.itemArray=[]
  }
  OnDelete($key){
    this.itemList.remove($key);
    this.itemArray=[]
  }

}
export class ListItemClass{
  $key:String;
  name:String;
  phone:String;
  skill:String;
  address:String;
  price:String;
  comments:String ;
}
