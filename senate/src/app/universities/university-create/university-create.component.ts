import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { University } from 'src/app/models/university.models';
import { UniversitiesService } from 'src/app/services/university.service';


@Component({
  selector: 'app-university-create',
  templateUrl: './university-create.component.html',
  styleUrls: ['./university-create.component.scss']
})
export class UniversityCreateComponent implements OnInit {

    public form?: FormGroup;
    public name: FormControl = new FormControl(null, [Validators.required]);
    public alphaTwoCode: FormControl = new FormControl(null, [Validators.maxLength(2), Validators.minLength(2)]);
    public country: FormControl = new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]);
    public domainsFormArray: FormArray = this.fb.array([]);
    public webPagesFormArray: FormArray = this.fb.array([]);


    public constructor(
        private fb: FormBuilder,
        private service: UniversitiesService,
        private snackBar: MatSnackBar) {}

    public get domains(): FormArray {
        return this.form?.controls['domains'] as FormArray;
    }
    
    public get webPages(): FormArray {
        return this.form?.controls['webPages'] as FormArray;
    }

    public ngOnInit(): void {
        this.createForm();
    }

    public addDomain(): void {
        const domainForm: FormGroup = this.fb.group({
            name: [null, [Validators.required]]
        });
        this.domains.push(domainForm);
    }

    public removeDomain(index: number): void {
        this.domains.removeAt(index);
    }

    public addwebPage(): void {
        const webPagesForm: FormGroup = this.fb.group({
            link: [null, [Validators.required]]
        });
        this.webPages.push(webPagesForm);
    }

    public removeWebPage(index: number): void {
        this.webPages.removeAt(index);
    }

    public save(): void {
        const domains: string[] = [];
        for (let i = 0; i < this.domains.length; i += 1) {
            domains.push(this.domains.at(i)?.value?.name);
            
        }
        const webPages: string[] = [];
        for (let i = 0; i < this.webPages.length; i += 1) {
            webPages.push(this.webPages.at(i)?.value?.link);
        }
        const uni: University = {
            name: this.name.value,
            alphaTwoCode: this.alphaTwoCode.value,
            country: this.country.value,
            domains: domains,
            webPages: webPages,
            isCustom: true,
        };
        this.service.addCustomUniversity(uni);
        this.form?.reset();
        this.openSnackBar();
        this.domains.clear();
        this.webPages.clear();
    }

    private createForm(): void {
        this.form = this.fb.group({
            name: this.name,
            alphaTwoCode: this.alphaTwoCode,
            country: this.country,
            domains: this.domainsFormArray,
            webPages: this.webPagesFormArray
        });
    }

    private openSnackBar(): void {
        this.snackBar.open(
            'Successfully created custom University',
            'Ok', 
            { 
                duration: 3000,
            }
        );
      }
}6