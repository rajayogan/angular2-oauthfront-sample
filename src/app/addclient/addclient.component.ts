import { Component, OnInit, NgZone } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addclient',
  templateUrl: 'addclient.component.html',
  styleUrls: ['addclient.component.css']
})
export class AddclientComponent implements OnInit {

  name;
   appid='';
   appsecret = '';
   showids: boolean = false;
  constructor(private auth:AuthService, private zone: NgZone, private router: Router) { }

  ngOnInit() {
  }
  
  addclient(appname){
    let newClient = this.auth.addclient(appname);
    newClient.then((res) => {
      this.appid = res.json().data.id;
      this.appsecret = res.json().data.secret;
      this.zone.run(()=> {
        this.showids = true;
      })
    })
  }
  
  goback(){
    this.router.navigate(['/dashboard']);
  }
  
  

}
