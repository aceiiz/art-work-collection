import { ArtworkModule } from './pages/art-work/art-work.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArtworkLayoutComponent } from './core/layout/art-work-layout/art-work-layout.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: AppComponent
      }
    ],
    pathMatch: 'full'
  },
  {
    path: '',
    component: ArtworkLayoutComponent,
    children: [
      {
        path: 'art-work',
        loadChildren: () => import('./pages/art-work/art-work.module').then((m) => m.ArtworkModule)
      }
    ]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
