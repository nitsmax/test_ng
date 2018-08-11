import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {LayoutComponent} from './dashboard/layout/layout.component'

const routes: Routes = [
	{
		path: '',
    	component: LayoutComponent,
    	loadChildren: './agent/agent.module#AgentModule' 
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
