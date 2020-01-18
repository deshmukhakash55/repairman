import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { RepairsService } from './services/repairs.service';
import { RepairmanService } from './services/repairman.service';
import { SearchService } from './services/search.service';
import { AddressService } from './services/address.service';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { FeedbackService } from './services/feedback.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AuthModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    RepairsService,
    RepairmanService,
    SearchService,
    AddressService,
    FeedbackService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    CallNumber,
    WebIntent,
    NativeGeocoder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
