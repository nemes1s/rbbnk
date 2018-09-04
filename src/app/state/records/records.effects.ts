import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap, catchError, flatMap} from 'rxjs/operators';
import {RecordsService} from '../../core/services/records.service';

import {Record} from './records.model';
import * as RecordActions from './records.actions';

@Injectable()
export class RecordsEffects {

    @Effect()
    processRecordsCSVData$: Observable<Action> = this.actions$.pipe(
        ofType(RecordActions.PROCESS_RECORDS_CSV_FILE),
        map((action: RecordActions.ProcessRecordsCSVFile) => action.payload),
        map((fileString: string) => this.recordService.processCSVRecords(fileString)),
        map((records: Record[]) => new RecordActions.ProcessRecordsFileSuccess(records)),
        catchError(err => of(new RecordActions.ProcessRecordsFileFail(err)))
    );

    @Effect()
    processRecordsXMLData$: Observable<Action> = this.actions$.pipe(
        ofType(RecordActions.PROCESS_RECORDS_XML_FILE),
        map((action: RecordActions.ProcessRecordsXMLFile) => action.payload),
        map((fileString: string) => this.recordService.processXMLRecords(fileString)),
        map((records: Record[]) => new RecordActions.ProcessRecordsFileSuccess(records)),
        catchError(err => of(new RecordActions.ProcessRecordsFileFail(err)))
    );

    @Effect()
    processRecordsFileSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(RecordActions.PROCESS_RECORDS_FILE_SUCCESS),
        map((action: RecordActions.ProcessRecordsFileSuccess) => action.payload),
        flatMap((res: Record []) => {
            return res.map(record => new RecordActions.ProcessRecord(record));
        }),
        catchError(err => of(new RecordActions.ProcessRecordsFileFail(err)))
    );

    @Effect()
    processRecord: Observable<Action> = this.actions$.pipe(
        ofType(RecordActions.PROCESS_RECORD),
        map((action: RecordActions.ProcessRecord) => action.payload),
        map((record: Record) => this.recordService.processRecord(record)),
        map((record: Record) => {
            if (record.errors && record.errors.length) {
                return new RecordActions.ProcessRecordFail(record);
            } else {
                return new RecordActions.ProcessRecordSuccess(record);
            }
        })
    );

    constructor(private actions$: Actions, private recordService: RecordsService) {
    }
}