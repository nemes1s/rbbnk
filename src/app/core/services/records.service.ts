import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {Record} from '../../state/records/records.model';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../state/app.reducer';
import {getAllRecords} from '../../state/records';
import {PapaParseService} from 'ngx-papaparse';
import * as xml2js from 'xml2js';

@Injectable()
export class RecordsService {
    private records: Array<Record>;

    constructor(private store: Store<fromStore.AppState>,
                private papa: PapaParseService) {
        this.store.pipe(select(getAllRecords)).subscribe(data => {
            this.records = data;
        });
    }

    processCSVRecords(fileString: string): Record[] {
        let resultArr = [];
        this.papa.parse(fileString, {
            complete: ({data}) => {
                resultArr = data.reduce((acc, i) => {
                    if (!isNaN(parseInt(i[0], 10))) {
                        const record = new Record();
                        record.reference = parseInt(i[0], 10);
                        record.accountNumber = i[1];
                        record.description = i[2];
                        record.startBalance = parseFloat(i[3]);
                        record.mutation = parseFloat(i[4]);
                        record.endBalance = parseFloat(i[5]);
                        acc.push(record);
                    }
                    return acc;
                }, []);
            }
        });

        return resultArr;
    }

    processXMLRecords(fileString: string): Record[] {
        let resultArr = [];
        xml2js.parseString(fileString, (err, res) => {
            resultArr = res.records.record.map(i => {
                const record = new Record();
                record.reference = parseInt(i.$.reference, 10);
                record.accountNumber = i.accountNumber[0];
                record.description = i.description[0];
                record.startBalance = parseFloat(i.startBalance[0]);
                record.mutation = parseFloat(i.mutation[0]);
                record.endBalance = parseFloat(i.endBalance[0]);
                return record;
            });
        });

        return resultArr;
    }

    processRecord(record: Record): Record {
        if ((record.startBalance + record.mutation).toPrecision(2) !== record.endBalance.toPrecision(2)) {
            record.errors.push(`Wrong mutation on this record`);
        }

        if (this.records.findIndex(i => record.reference === i.reference) !== -1) {
            record.errors.push(`Transaction with that reference already exists`);
        }

        return record;
    }
}
