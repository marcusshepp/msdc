import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// Zorro Component library
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AccountBookFill, AlertFill, AlertOutline, HomeOutline } from '@ant-design/icons-angular/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PointerComponent } from './pointer/pointer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointButtonsComponent } from './pointer/point-buttons/point-buttons.component';

const icons: IconDefinition[] = [
  AccountBookFill,
  AlertOutline,
  AlertFill,
  HomeOutline,
 ];

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    PointerComponent,
    PointButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Zorro Component library
    NzLayoutModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzButtonModule,
    NzMenuModule,
    NzInputModule,
    NzIconModule.forRoot(icons),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
