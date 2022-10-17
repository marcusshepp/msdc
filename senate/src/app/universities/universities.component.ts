import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { University } from '../models/university.models';
import { UniversitiesService } from '../services/university.service';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss']
})
export class UniversitiesComponent implements OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator; 
    public universities: University[] = [];
    public universitiesBeingDisplayed: University[] = [];
    public pageSizeOptions: number[] = [10, 25, 50, 100];
    
    private startIndex: number = 0;
    private endIndex: number = 9;
    private searchTerm: string = '';
    private countryNames: string[] = [];
    private destroy$: Subject<boolean> = new Subject<boolean>();

    public constructor(
        private service: UniversitiesService,
    ) { 
        this.setUpUniversitiesObservable();
        this.resetIndex();
    }

    public get indexedUniversities(): University[] {
        return this.universitiesBeingDisplayed
            .slice(this.startIndex, this.endIndex);
    }

    public get countriesAvailableForSelect(): string[] {
        const countryNames: string[] = this.universities
            .map((u: University): string => u.country);
        return Array.from(new Set([...countryNames]));
    }

    public ngOnDestroy(): void {
        this.destroy$.next(false);
        this.destroy$.complete();
    }

    public receiveSearchInput(searchTerm: string): void {
        this.searchTerm = searchTerm;
        if (searchTerm && searchTerm.length > 2) {
            this.universitiesBeingDisplayed = this.universities.filter(this.filter.bind(this));
            if (this.countryNames && this.countryNames.length > 0) {
                this.universitiesBeingDisplayed = this.universitiesBeingDisplayed
                    .filter((u: University): boolean => this.countryNames.includes(u.country));
            }
        }
        if (!searchTerm || searchTerm.length === 0) {
            this.universitiesBeingDisplayed = this.universities;
        }
        this.resetIndex();
    }

    public countrySelectedAction(countryNames: string[]): void {
        this.countryNames = countryNames;
        if (countryNames && countryNames.length > 0) {
            this.universitiesBeingDisplayed = this.universities
                .filter((u: University): boolean => countryNames.includes(u.country));
            if (this.searchTerm && this.searchTerm.length > 2) {
                this.universitiesBeingDisplayed = this.universitiesBeingDisplayed
                    .filter(this.filter.bind(this));
            }
        }
    }

    public changePage(event: PageEvent): void {
        const pageIndex: number = event.pageIndex;
        const pageSize: number = event.pageSize;
        this.startIndex = pageIndex * pageSize;
        this.endIndex = this.startIndex + pageSize;
    }

    public clearSearchAndFilters(): void {
        this.universitiesBeingDisplayed = this.universities;
    }

    public onlyCustomAction(onlyCustom: boolean): void {
        if (onlyCustom) {
            this.universitiesBeingDisplayed = this.universitiesBeingDisplayed
                .filter((u: University): boolean => u.isCustom === onlyCustom)
        } else {
            this.universitiesBeingDisplayed = this.universities;
        }
    }

    private setUpUniversitiesObservable(): void {
        this.service.universities$
            .pipe(takeUntil(this.destroy$))
            .subscribe((unis: University[]): void => {
                this.universities = unis;
                this.universitiesBeingDisplayed = unis;
            });
    }

    private resetIndex(): void {
        this.startIndex = 0;
        this.endIndex = 10;
    }

    private filter(uni: University): boolean {
        if (
            (
                uni.name && 
                uni.name.length > 0 &&
                uni.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            ) ||
            (
                uni.country &&
                uni.country.length > 0 &&
                uni.country.toLowerCase().includes(this.searchTerm.toLowerCase())
            ) ||
            (
                uni.alphaTwoCode &&
                uni.alphaTwoCode.length > 0 &&
                uni.alphaTwoCode.toLowerCase().includes(this.searchTerm.toLowerCase())
        )) {
            return true;
        }
        return false;
    }
}