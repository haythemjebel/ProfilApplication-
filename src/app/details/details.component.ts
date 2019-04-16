import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
id:any;
itemList:AngularFireList<any>
itemArray=[]
data={
  name:"",
  phone:"",
  skill:"",
  address:"",
  price:"",
  comments:"",
  email:""
}
  constructor(public db: AngularFireDatabase,private routt:ActivatedRoute) { 
    this.routt.params.subscribe(params=>{
      this.id=params

      this.itemList = db.list('skills')
      this.itemList.snapshotChanges().subscribe(actions=>{
        actions.forEach(action=>{
          let y =action.payload.toJSON()
          y['$key']=action.key
          if (action.key===this.id['id']) {
            this.itemArray.push(y as ListItemClass)
            this.data.name=this.itemArray[0]['name']
            this.data.phone=this.itemArray[0]['phone']
            this.data.skill=this.itemArray[0]['skill']
            this.data.address=this.itemArray[0]['address']
            this.data.price=this.itemArray[0]['price']
            this.data.comments=this.itemArray[0]['comments']
            this.data.email=this.itemArray[0]['email']
          }
          
        })
      })
      console.log(this.itemArray)
  
      
    })
  }

  ngOnInit() {
    console.log(this.id['id'])
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
  email:string;
}
