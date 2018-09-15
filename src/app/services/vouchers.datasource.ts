import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {Voucher} from "../model/voucher";
import {VoucherService} from "./voucher.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";



export class VouchersDataSource implements DataSource<Voucher> {

    private vouchersSubject = new BehaviorSubject<Voucher[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private voucherService: VoucherService) {

    }

    loadVouchers(voucherName:string,
                voucherCode:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.voucherService.findVouchers(voucherName, voucherCode, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(vouchers => this.vouchersSubject.next(vouchers));

    }

    connect(collectionViewer: CollectionViewer): Observable<Voucher[]> {
        console.log("Connecting data source");
        return this.vouchersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.vouchersSubject.complete();
        this.loadingSubject.complete();
    }

}

