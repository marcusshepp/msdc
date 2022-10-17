import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { University } from "../models/university.models";

@Injectable({
    providedIn: 'root',
})
export class UniversitiesService {
    private universitiesBehaviorSubject$: BehaviorSubject<University[]> = new BehaviorSubject<University[]>([]);
    private _universities: University[] = new Array<University>();

    public constructor(private http: HttpClient) { 
        this.getUniversities();
    }
    
    public get universities$(): Observable<University[]> {
        return this.universitiesBehaviorSubject$.asObservable();
    }

    public addCustomUniversity(uni: University): void {
        uni.isCustom = true;
        this._universities.push(uni);
        this.updateObservables();
    }

    private getUniversities(): void {
        // http client automatically destroys subscriptions
        this.http
            .get<University[]>(`http://universities.hipolabs.com/search`)
            .subscribe((unis: University[]): void => {
                this._universities = unis;
                this.updateObservables();
            });
    }

    private updateObservables(): void {
        this.universitiesBehaviorSubject$.next(this._universities);
    }
}