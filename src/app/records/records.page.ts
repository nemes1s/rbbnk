import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as fromRecords from '../state/records/records.actions';
import * as fromStore from '../state/app.reducer';
import {select, Store} from '@ngrx/store';
import {getAllRecords, getError, getErrorRecords} from '../state/records';
import {Record} from '../state/records/records.model';

@Component({
    selector: 'app-records',
    templateUrl: './records.page.html',
    styleUrls: ['./records.page.scss']
})
export class RecordsPage implements OnInit {
    recordsFile: File = null;
    _READER: any = new FileReader();
    fileDataString$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    records$: Observable<Array<Record>>;
    errorRecords$: Observable<Array<Record>>;
    error$: Observable<string>;

    constructor(private store: Store<fromStore.AppState>) {
        this._READER.onloadend = () => {
            this.fileDataString$.next(this._READER.result);
        };
    }


    ngOnInit() {
        this.fileDataString$.subscribe(res => {
            if (res !== null) {
                switch (this.recordsFile.type) {
                    case 'text/xml': {
                        this.store.dispatch(new fromRecords.ProcessRecordsXMLFile(res));
                        break;
                    }
                    case 'text/csv': {
                        this.store.dispatch(new fromRecords.ProcessRecordsCSVFile(res));
                        break;
                    }
                }
            }
        });

        this.records$ = this.store.pipe(select(getAllRecords));
        this.errorRecords$ = this.store.pipe(select(getErrorRecords));
        this.error$ = this.store.pipe(select(getError));
    }

    handleRecordsFile(event: any) {
        this.recordsFile = event.target.files[0];
        this._READER.readAsText(this.recordsFile, 'ISO-8859-1');
    }
}
