import {Action} from '@ngrx/store';
import {Record} from './records.model';

export const PROCESS_RECORDS_XML_FILE = '[RECORD] Process Records XML file';
export const PROCESS_RECORDS_CSV_FILE = '[RECORD] Process Records CSV file';
export const PROCESS_RECORDS_FILE_SUCCESS = '[RECORD] Process Records file Success';
export const PROCESS_RECORDS_FILE_FAIL = '[RECORD] Process Records file Fail';
export const PROCESS_RECORD = '[RECORD] Process Record';
export const PROCESS_RECORD_FAIL = '[RECORD] Process Record Fail';
export const PROCESS_RECORD_SUCCESS = '[RECORD] Process Record Success';


export class ProcessRecordsXMLFile implements Action {
    readonly type = PROCESS_RECORDS_XML_FILE;

    constructor(public payload: string) {
    }
}
export class ProcessRecordsCSVFile implements Action {
    readonly type = PROCESS_RECORDS_CSV_FILE;

    constructor(public payload: string) {
    }
}

export class ProcessRecordsFileSuccess implements Action {
    readonly type = PROCESS_RECORDS_FILE_SUCCESS;

    constructor(public payload: Record[]) {
    }
}

export class ProcessRecord implements Action {
    readonly type = PROCESS_RECORD;

    constructor(public payload: Record) {
    }
}
export class ProcessRecordSuccess implements Action {
    readonly type = PROCESS_RECORD_SUCCESS;

    constructor(public payload: Record) {
    }
}

export class ProcessRecordFail implements Action {
    readonly type = PROCESS_RECORD_FAIL;

    constructor(public payload: Record) {
    }
}

export class ProcessRecordsFileFail implements Action {
    readonly type = PROCESS_RECORDS_FILE_FAIL;

    constructor(public payload: any) {
    }
}

export type Records =
    ProcessRecordsCSVFile
    | ProcessRecordsXMLFile
    | ProcessRecordsFileSuccess
    | ProcessRecordsFileFail
    | ProcessRecord
    | ProcessRecordSuccess
    | ProcessRecordFail;
