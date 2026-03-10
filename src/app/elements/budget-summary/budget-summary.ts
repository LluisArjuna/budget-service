import { Component, inject } from '@angular/core';
import { BudgetService } from '../../services/budget-service';

@Component({
  selector: 'app-budget-summary',
  imports: [],
  templateUrl: './budget-summary.html',
})
export class BudgetSummary {

  public readonly budgetService: BudgetService = inject(BudgetService);
}
