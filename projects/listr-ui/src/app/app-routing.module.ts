import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BadRouteComponent } from './bad-route/bad-route.component';
import { BasicComponent } from './containers/basic/basic.component';
import { BudgetComponent } from './containers/budget/budget.component';

const routes: Routes = [
  { path: '', redirectTo:"budget", pathMatch: 'full'},
  { path: 'listr', component: BasicComponent},
  { path: 'budget', component: BudgetComponent},
  { path: 'about', component: AboutComponent},
  { path: 'error', component: BadRouteComponent},
  { path: '**', component: BadRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false,onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
