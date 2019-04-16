import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';
@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
  data={
    name:"",
    phone:"",
    skill:"",
    address:"",
    price:"",
    comments:""
  }
  email:string ='';
  uid:any;

  itemList:AngularFireList<any>
  constructor(public db: AngularFireDatabase, public route:Router,private auth:AngularFireAuth) {
    this.itemList = db.list('skills')
    let user =localStorage.getItem('email')
    this.email=user
    // this.auth.authState.subscribe(au=>{
    //   if(au){
    //     this.uid=au.uid
    //   }
    // })
    this.uid=localStorage.getItem('uid')
  }

  ngOnInit() {
     
  }
  insertskill(){
    this.itemList.push({
      name:this.data.name,
      phone:this.data.phone,
      skill:this.data.skill,
      address:this.data.address,
      price:this.data.price,
      comments:this.data.comments,
      email:this.auth.auth.currentUser.email,
      uid:this.uid
    })
    this.route.navigate(['/myskill'])
  }

}
