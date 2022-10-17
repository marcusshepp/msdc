import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    @Input() public countries: string[] = new Array<string>();
    @Output() public search: EventEmitter<string> = new EventEmitter<string>();
    @Output() public countrySelectedAction: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() public onlyCustomAction: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public clearSearchAndFiltersAction: EventEmitter<boolean> = new EventEmitter<boolean>();
    public searchTerm: FormControl = new FormControl(null, [Validators.minLength(3)]);
    public countrySelected: FormControl = new FormControl(null);
    public onlyCustom: FormControl = new FormControl(false);

    private destroy$: Subject<boolean> = new Subject<boolean>();

    public constructor(private fb: FormBuilder) { }

    public ngOnInit(): void {
        this.createForm();
        this.setSearchTermObservable();
        this.setCountrySelectedActionObservable();
        this.setOnlyCustomActionObservable();
    }

    public ngOnDestroy(): void {
        this.destroy$.next(false);
        this.destroy$.complete();
    }

    public clear(): void {
        this.countrySelected.setValue(null);
        this.searchTerm.setValue(null);
        this.clearSearchAndFiltersAction.emit(true);
        this.onlyCustom.setValue(false);
    }

    private createForm(): void {
        this.fb.group({
            searchTerm: this.searchTerm,
            countrySelected: this.countrySelected,
            onlyCustom: this.onlyCustom,
        });
    }

    private setSearchTermObservable(): void {
        this.searchTerm.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                debounceTime(500))
            .subscribe((term: string) => {
                    this.search.emit(term);
            });
    }

    private setCountrySelectedActionObservable(): void {
        this.countrySelected.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                debounceTime(500))
            .subscribe((countries: string[]) => {
                    this.countrySelectedAction.emit(countries);
            });
    }

    private setOnlyCustomActionObservable(): void {
        this.onlyCustom.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                debounceTime(500))
            .subscribe((onlyCustom: boolean) => {
                    this.onlyCustomAction.emit(onlyCustom);
            });
    }
}