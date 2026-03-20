import { Routes } from '@angular/router';
import { ServiceList } from './elements/service-list/service-list';
import { BudgetForm } from './elements/budget-form/budget-form';
import { BudgetSummary } from './elements/budget-summary/budget-summary';
import { BudgetHistory } from './elements/budget-history/budget-history';


export const routes: Routes = [
    { path: '', component: ServiceList },
    { path: 'budget-form', component: BudgetForm },
    { path: 'budget-history', component: BudgetHistory },
    { path: 'budget-summary/:id', component: BudgetSummary },
];
