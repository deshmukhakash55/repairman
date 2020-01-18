import { StarsComponent } from './stars/stars.component';
import { StarInputComponent } from './star-input/star-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule.forRoot(), HttpClientModule, IonicStorageModule.forRoot()],
  declarations: [
    StarsComponent,
    StarInputComponent
  ],
  exports: [
    StarsComponent,
    StarInputComponent
  ]
})
export class CoreModule { }
