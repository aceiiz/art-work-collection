import { ArtWorkListComponent } from './components/art-work-list.component';
import { ArtWorkComponent } from './art-work.component';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { ArtWorkRoutingModule } from './art-work-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { artWorkModuleReducers } from './store/art-work-module.reducers';
import { ArtWorkEffects } from './store/art-work.effects';

@NgModule({
  declarations: [ArtWorkComponent, ArtWorkListComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    ArtWorkRoutingModule,
    SharedModule.forRoot(),
    StoreModule.forFeature('artWork', artWorkModuleReducers.artWork),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([ArtWorkEffects])
  ],
  exports: [ArtWorkListComponent]
})
export class ArtworkModule {
  static forRoot(): ModuleWithProviders<ArtworkModule> {
    return { ngModule: ArtworkModule };
  }
}
