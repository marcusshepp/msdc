import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UNIVERSITIES } from './models/routing.models';
import { UniversitiesComponent } from './universities/universities.component';

const routes: Routes = [
    { path: UNIVERSITIES, component: UniversitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
