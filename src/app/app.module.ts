import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { WelcomeModule } from './modules/welcome/welcome.module';
import { ProductsModule } from './modules/products/products.module';
import { PageNotFoundModule } from './modules/page-not-found/page-not-found.module';
import { AuthentificationModule } from './modules/authentification/authentification.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    WelcomeModule,
    ProductsModule,
    AuthentificationModule,
    HttpClientModule,
    PageNotFoundModule,
  ],
  providers: [
    HttpClient,
    /*{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },*/
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
