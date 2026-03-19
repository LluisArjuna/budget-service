import { Component, inject } from '@angular/core';
import { BudgetService } from '../../services/budget-service';
import { ActivatedRoute } from '@angular/router';
import { Budget } from '../../interfaces/budget.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-budget-summary',
  imports: [DatePipe],
  templateUrl: './budget-summary.html',
})
export class BudgetSummary {

  public readonly budgetService: BudgetService = inject(BudgetService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  budget: Budget | undefined;
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.budget = this.budgetService.getBudgetById(id);
    }
  }
} 
