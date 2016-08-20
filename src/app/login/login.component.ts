import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
   user = {
     username: '',
     password: ''
   };
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  
  
  login(usercreds) {
    let userlogin = this.auth.login(usercreds);
    userlogin.then((res) => {
      if(res)
      this.router.navigate(['/dashboard']);
    })
  }

}
