import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromRecords from './records/records.reducer';

export interface AppState {
    records: fromRecords.State;
}
export const appReducer: ActionReducerMap<AppState> = {
    records: fromRecords.reducer
};
