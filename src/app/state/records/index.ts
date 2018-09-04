import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRecords from './records.reducer';
import { State as RecordsState } from './records.reducer';

export const getRecordsState = createFeatureSelector<RecordsState>('records');

export const getAllRecords = createSelector(
    getRecordsState,
    fromRecords.getAllRecords
  );
export const getErrorRecords = createSelector(
    getRecordsState,
    fromRecords.getErrorRecords
  );

export const getLoading = createSelector(
  getRecordsState,
  fromRecords.getLoading
);

export const getError = createSelector(
  getRecordsState,
  fromRecords.getError
);
