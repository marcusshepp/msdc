import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { POINTING } from "../app-routing.models";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  // styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  // openMap: { [name: string]: boolean } = {
  //   sub1: true,
  //   sub2: false,
  //   sub3: false
  // };

  // openHandler(value: string): void {
  //   for (const key in this.openMap) {
  //     if (key !== value) {
  //       this.openMap[key] = false;

  //     }
  //   }
  // }

  constructor(private router: Router) {}

  public get pointing(): string {
    return POINTING;
  }

  
  public routeTo(path: string): void {
    this.router.navigateByUrl(path);
  }
  
  public routeToPointing(): void {
    this.routeTo(this.pointing);
  }
}