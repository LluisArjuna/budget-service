import { Routes } from '@angular/router';
import { ServiceList } from './elements/service-list/service-list';
import { BudgetForm } from './elements/budget-form/budget-form';
import { BudgetSummary } from './elements/budget-summary/budget-summary';


export const routes: Routes = [
    { path: '', component: ServiceList },
    { path: 'budget-form', component: BudgetForm },
    { path: 'summary', component: BudgetSummary }
];
