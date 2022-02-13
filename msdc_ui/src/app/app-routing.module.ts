import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POINTING } from './app-routing.models';
import { PointerComponent } from './pointer/pointer.component';

const routes: Routes = [
  { path: POINTING, component: PointerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
