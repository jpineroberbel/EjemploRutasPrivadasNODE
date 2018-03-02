import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PrivadoComponent } from './privado/privado.component';
import { HttpClientModule } from '@angular/common/http';
import { FacebookModule } from 'ngx-facebook';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privado', component: PrivadoComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FacebookModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
