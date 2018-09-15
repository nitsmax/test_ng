import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {Country} from "../model/country";
import {CountryService} from "./country.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";



export class CountriesDataSource implements DataSource<Country> {

    private countriesSubject = new BehaviorSubject<Country[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private countryService: CountryService) {

    }

    loadCountries(q:string,
                name:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.countryService.findCountries(q, name, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(countries => this.countriesSubject.next(countries));

    }

    connect(collectionViewer: CollectionViewer): Observable<Country[]> {
        console.log("Connecting data source");
        return this.countriesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.countriesSubject.complete();
        this.loadingSubject.complete();
    }

}

