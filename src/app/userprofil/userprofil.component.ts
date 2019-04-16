import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
@Component({
  selector: 'app-userprofil',
  templateUrl: './userprofil.component.html',
  styleUrls: ['./userprofil.component.css']
})
export class UserprofilComponent implements OnInit {

  itemList:AngularFireList<any>
  itemArray=[]
  email:string;
  myuid:string;
  data={
    name:"",
    phone:"",
    age:"",
    address:"",
    city:"",
    job:"",
    email:"",
    image:""
  }
  userkey:any

  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;
  downloadurl:Observable<string>;
  imageUrl:string;
  

  constructor(public db: AngularFireDatabase,private fstore :AngularFireStorage) {
    this.email=localStorage.getItem('email')
    this.myuid=localStorage.getItem('uid')
    //--------------------------------------------
    this.itemList = db.list('users')
    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
        let y =action.payload.toJSON()
        y['$key']=action.key
        if (action.payload.child('uid').val()===this.myuid) {
          this.userkey=action.key
          this.itemArray.push(y as ListItemClass)
          this.data.name=this.itemArray[0]['name']
          this.data.phone=this.itemArray[0]['phone']
          this.data.age=this.itemArray[0]['age']
          this.data.address=this.itemArray[0]['address']
          this.data.city=this.itemArray[0]['city']
          this.data.job=this.itemArray[0]['job']
          this.data.email=this.itemArray[0]['email']
          this.data.image=this.itemArray[0]['image']
          //console.log(this.data)
        }
      })
    })
    this.myuid =localStorage.getItem('uid')
    console.log(this.itemArray)
    //-------------------------------------------file---------


   }

  ngOnInit() {
    console.log(this.email)
    console.log(this.myuid)
  }
upload(event){
  // const file = event.target.files[0];
  // const id = Math.random().toString(36).substring(2);
  // this.ref=this.fstore.ref(id);
  // this.task=this.ref.put(file);
  // this.downloadurl = this.ref.getDownloadURL()
  const id = Math.random().toString(36).substring(2);
  this.ref = this.fstore.ref(id);
  this.task = this.ref.put(event.target.files[0]);
  this.task.snapshotChanges().pipe(
    finalize(() => {
     this.ref.getDownloadURL().subscribe(url => {
       console.log(url);
       
       this.imageUrl=url// <-- do what ever you want with the url..
       this.itemList.update(this.myuid,{
        name:this.data.name,
        phone:this.data.phone,
        age:this.data.age,
        address:this.data.address,
        city:this.data.city,
        job:this.data.job,
        email:this.email,
        uid:this.myuid,
        image:this.imageUrl
      })
     });
   }))
   .subscribe();

  // const file: File = event.target.files[0];
  // const metaData = {'contentType': file.type};
  // const storRef: firebase.storage.Reference  = this.fstore.storage.ref(file.name);
  // const uploadTask: firebase.storage.UploadTask = storRef.put(file, metaData);
  // console.log('Uploading:' + file.name);
  
  // uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
  //  const imageUrl = uploadSnapshot.downloadURL;
  //  console.log('URL:' + imageUrl);
  // });
// snapshot.ref.getDownloadURL().then(function(downloadURL) {
//     console.log("File available at", downloadURL);
//   });
}

  OnEdit(){
    this.itemList.set(this.myuid,{
      name:this.data.name,
      phone:this.data.phone,
      age:this.data.age,
      address:this.data.address,
      city:this.data.city,
      job:this.data.job,
      email:this.email,
      uid:this.myuid
    })
  }

}
export class ListItemClass{
  $key:String;
  name:String;
  phone:String;
  age:String;
  address:String;
  city:String;
  job:String ;
  email:string;
}