import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginData = { usuario:'', password:'' };

  constructor(private http: HttpClient, private router: Router, private fb: FacebookService) {
    let initParams: InitParams = {
      appId: 'Pon aqui tu ID',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);
   }

  ngOnInit() {
    
    // Si ya tengo token entro directo a privado
    let token = localStorage.getItem('jwtToken');
    if (token)
      this.router.navigate(['privado']);
  }

  login()
  {
    this.http.post('/login',this.loginData,{responseType: 'text' }).subscribe( (data) => {
      let resp=JSON.parse(data);
      if (resp.token)
      {  
         localStorage.setItem('jwtToken', resp.token);
         this.router.navigate(['privado']);
      }
      else  
        console.log("ERROR, no me autentifican")
    })
  }

  loginFB(): void {
    const options: LoginOptions = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
    .then((response: LoginResponse) => {
      console.log(response);
      this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
        this.loginData.usuario=res.name;
        this.login();
      })
    })
    .catch((error: any) => console.error(error));


  }

  
}

