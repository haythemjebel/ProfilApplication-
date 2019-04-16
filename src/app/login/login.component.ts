import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  constructor(private fire :AngularFireAuth, private route : Router,private LoginEvent : LoginService) { }

  ngOnInit() {
  }
  mylogin(){
    this.fire.auth.signInWithEmailAndPassword(this.email,this.password)
    .then(user=>{
      console.log(this.email,this.password)
      localStorage.setItem('isLoggedIn','true')
      localStorage.setItem('email',this.fire.auth.currentUser.email)

      this.fire.authState.subscribe(au=>{
        if(au){
          localStorage.setItem('uid',au.uid)
          this.LoginEvent.Mylogin.emit({LogAction:true})
        }
      })

      this.route.navigate(['/home'])
    }).catch(error=>{
      console.error(error)
    })
  }

}
