import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginData = { usuario:'', password:'' };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login()
  {
    console.log(this.loginData)
    this.http.post('/privadoV2',this.loginData,{responseType: 'text' }).subscribe( (data) => {
      let resp=JSON.parse(data);
      if (resp.success)
        this.router.navigate(['privado']);
    })
  }
}
