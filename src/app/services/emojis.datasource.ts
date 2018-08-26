import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {Emoji} from "../model/emoji";
import {EmojiService} from "./emoji.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";



export class EmojisDataSource implements DataSource<Emoji> {

    private emojisSubject = new BehaviorSubject<Emoji[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private emojiService: EmojiService) {

    }

    loadEmojis(q:string,
                name:string,
                category:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.emojiService.findEmojis(q, name, category, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(emojis => this.emojisSubject.next(emojis));

    }

    connect(collectionViewer: CollectionViewer): Observable<Emoji[]> {
        console.log("Connecting data source");
        return this.emojisSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.emojisSubject.complete();
        this.loadingSubject.complete();
    }

}

