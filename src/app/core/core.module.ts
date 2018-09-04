import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';

import { RecordsService } from './services/records.service';
import {PapaParseModule} from 'ngx-papaparse';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        PapaParseModule
    ],
    providers: [
        RecordsService]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        };
    }

    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only'
            );
        }
    }
}