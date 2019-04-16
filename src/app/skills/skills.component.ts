import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  data={
    name:"",
    phone:"",
    skill:"",
    address:"",
    price:"",
    comments:""
  }

  itemList:AngularFireList<any>
  itemArray=[]
  constructor(public db: AngularFireDatabase,public route:Router ) {
    this.itemList = db.list('skills')
    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
        let y =action.payload.toJSON()
        y['$key']=action.key
        this.itemArray.push(y as ListItemClass)
      })
    })
    console.log(this.itemArray)


   }

  ngOnInit() {
  }

  moreInfo(key){
    this.route.navigate(['details/'+key])
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
