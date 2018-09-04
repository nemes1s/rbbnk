import * as fromRecord from './records.actions';
import {Record} from './records.model';

export interface State {
    records: Record[];
    errorRecords: Record[];
    loading: boolean;
    error: string;
}

export const initialState: State = {
    records: [],
    errorRecords: [],
    loading: false,
    error: ''
};

export function reducer(state = initialState, action: fromRecord.Records): State {
    switch (action.type) {

        case fromRecord.PROCESS_RECORDS_XML_FILE: {
            return {
                ...state,
                loading: true
            };
        }
        case fromRecord.PROCESS_RECORDS_CSV_FILE: {
            return {
                ...state,
                loading: true
            };
        }

        case fromRecord.PROCESS_RECORD: {
            return {
                ...state,
                loading: true
            };
        }

        case fromRecord.PROCESS_RECORD_SUCCESS: {
            return {
                ...state,
                loading: false,
                records: [...state.records, action.payload]
            };
        }
        case fromRecord.PROCESS_RECORD_FAIL: {
            return {
                ...state,
                loading: false,
                errorRecords: [...state.errorRecords, action.payload]
            };
        }

        case fromRecord.PROCESS_RECORDS_FILE_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case fromRecord.PROCESS_RECORDS_FILE_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getAllRecords = (state: State) => state.records;
export const getErrorRecords = (state: State) => state.errorRecords;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
