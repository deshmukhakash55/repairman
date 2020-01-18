import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { HeaderModule} from '../header/header.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderModule,
    CoreModule,
    RouterModule.forChild([{ path: '', component: SearchPage }])
  ],
  declarations: [
    SearchPage
  ]
})
export class SearchModule {}
