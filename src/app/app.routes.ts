import { Routes } from "@angular/router";


export const routes: Routes = [
    { path: 'dashboard', loadComponent: () => import("./components/dashboard/dashboard.component").then(m => m.DashboardComponent)},
    { path: 'account', loadComponent: () => import("./components/account/account.component").then(m => m.AccountComponent)},
    { path: 'budget', loadComponent: () => import("./components/budget/budget.component").then(m => m.BudgetComponent)},
    { path: 'insight', loadComponent: () => import("./components/insight/insight.component").then(m => m.InsightComponent)},
    { path: '404', loadComponent: () =>import("./components/pagenotfound/pagenotfound.component").then(m => m.PagenotfoundComponent)},
    { path: '**', redirectTo: '404'},
    { path: '', pathMatch: 'full', redirectTo: 'dashboard'}
];


