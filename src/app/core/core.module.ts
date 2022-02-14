import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompareYearDisplayPipe } from './pipe/date-display.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    CompareYearDisplayPipe
  ],
  imports: [
    RouterModule,
    SharedModule.forRoot()
  ],
  exports: [
    // modules
    CommonModule,

    // components 
    HeaderComponent,

    // pipe
    CompareYearDisplayPipe
  ]
})

export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return { ngModule: CoreModule };
  }
}
