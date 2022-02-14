import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtWorkComponent } from './art-work.component';
import { ArtWorkListComponent } from './components/art-work-list.component';

const routes: Routes = [
  {
    path: '',
    component: ArtWorkComponent,
    children: [
      {
        path: 'art-work-list',
        component: ArtWorkListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtWorkRoutingModule { }
