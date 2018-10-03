import { AuthInterceptorProvider } from './../interceptors/auth.interceptor';
import { ClienteService } from './../services/domain/cliente.service';
import { CategoriaService } from './../services/domain/categoria.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorInterceptorProvider } from '../interceptors/error.interceptor';
import { AuthService } from '../services/authservice';
import { StorageService } from '../services/storage.service';
import { ProdutoService } from '../services/domain/produto.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AuthService,
    CategoriaService,
    ClienteService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    ProdutoService,
    StatusBar,
    StorageService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
