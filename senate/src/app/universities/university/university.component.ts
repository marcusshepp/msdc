import { Component, Input } from '@angular/core';
import { University } from 'src/app/models/university.models';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent {
    @Input() public uni: University | undefined;

    public getLink(domain: string): string {
        if (domain && domain.toLowerCase().includes('http')) {
            return domain;
        }
        return `http://${domain}`;
    }
}