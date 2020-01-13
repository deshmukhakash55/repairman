import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HeaderModule } from '../header/header.module';
import { StarsComponent } from '../stars/stars.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
    HeaderModule
  ],
  declarations: [
    HomePage,
    StarsComponent
  ]
})
export class HomeModule {}
