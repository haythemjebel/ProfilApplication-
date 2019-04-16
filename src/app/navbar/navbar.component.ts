import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
   isLoggedIn=false;
   email :string;


  constructor( private auth : AngularFireAuth, private route :Router,private LoginEvent : LoginService ) { 
    //this.user=auth.authState;


    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     this.isLoggedIn=true
    //   } else {
    //     // No user is signed in.
    //     this.isLoggedIn=false
    //     this.route.navigate(['/login'])
    //   }
    // });

    


  }
  logout(){
    this.auth.auth.signOut();
    //this.isLoggedIn=false
    this.LoginEvent.Mylogin.emit({LogAction:false})
    localStorage.setItem('isLoggedIn','false')
    this.route.navigate(['/login'])
  }

  ngOnInit() {
    let status = localStorage.getItem('isLoggedIn')
    console.log(status)
    if (status === 'true') {
      this.isLoggedIn =true ;
    }else{
      this.isLoggedIn =false ;
    }

    this.LoginEvent.Mylogin.subscribe((call)=>{
      
      if(call.LogAction===true){
        this.isLoggedIn =true ;
        console.log('set to true')
      }else if(call.LogAction===false){
        this.isLoggedIn =false ;
        console.log('set to false')
      }
      // console.log("isloggedin : ",this.isLoggedIn)

    })

  }

}
