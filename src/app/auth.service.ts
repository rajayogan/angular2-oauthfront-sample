import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
   isAuthenticated: boolean = false;
   userId;
   windowHandle;
   ourcode;
   accesstoken;
  constructor(private http: Http, private router: Router) { }

login(usercreds){
  var headers = new Headers();
        var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
        
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise((resolve) => {
        this.http.post('http://localhost:3333/authenticate', creds, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
                this.userId = data.json().userId;      
                this.isAuthenticated = true;}
                resolve(this.isAuthenticated);
            }
        )
        
        })
}

addclient(newclient) {
 
 let appid = this.randomstring(10);
 let appsecret = this.randomstring(10);
 
 var headers = new Headers();
 var client = 'name=' + newclient + '&id=' + appid + '&secret=' + appsecret + '&userId=' + this.userId;
 
 headers.append('Content-Type', 'application/X-www-form-urlencoded');  
 
 return new Promise((resolve) => {
        this.http.post('http://localhost:3333/clients', client, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
                
                
                resolve(data);
            }
        })
        
        })
  
}

authorizeuser() {
  this.windowHandle = window.open('http://localhost:3333/oauth2/authorize?client_id=XRnnexpe7N&response_type=code&redirect_uri=http://localhost:4200/books');
  var href;
  
  setTimeout(() => {
    href = this.windowHandle.location.href;
    
    this.windowHandle.close();
    var extractedcode = href.split('=');
    this.ourcode = extractedcode[1];
    if(this.ourcode)
    this.getAccessToken();
    else
    console.log('Access denied. Try again');
  },5000);
}

addbook(newbook) {
  var headers = new Headers();
  
  headers.append('Authorization', 'Bearer '+ this.accesstoken);
  headers.append('Content-Type', 'application/X-www-form-urlencoded');
  
  var book = 'name=' + newbook.name + '&type=' + newbook.type + '&quantity=' + newbook.quantity;
  return new Promise((resolve) => {
        this.http.post('http://localhost:3333/addbook', book, {headers: headers}).subscribe((data) => {
            
                console.log(data);    
                
                resolve(data);
            
        })
        
        })
  
}

getAccessToken() {
  let client_id = 'XRnnexpe7N';
  let client_secret= 'tUskPBzu64';
  var basicheader = btoa(client_id + ':' + client_secret);
  
  var headers = new Headers();
  
  headers.append('Authorization', 'Basic '+ basicheader);
  headers.append('Content-Type', 'application/X-www-form-urlencoded');
  
  var tokendata = 'code=' + this.ourcode + '&grant_type=authorization_code&redirect_uri=http://localhost:4200/books';
  
  this.http.post('http://localhost:3333/oauth2/token', tokendata, {headers: headers}).subscribe((data) => {
    
    
    this.accesstoken = data.json().access_token;
    console.log(this.accesstoken);
    this.router.navigate(['/books']);
  })
}

randomstring (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[this.getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

}
