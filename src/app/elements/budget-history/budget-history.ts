import { Component, inject, computed, signal } from '@angular/core';
import { Budget } from '../../interfaces/budget.interface';
import { BudgetService } from '../../services/budget-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-history',
  imports: [], 
  templateUrl: './budget-history.html',
})
export class BudgetHistory {
  private readonly budgetService = inject(BudgetService);
  readonly router = inject(Router);

  budgets = signal(this.budgetService.getBudgets());
  searchTerm = signal('');

  filteredBudgets = computed(() => {
    const term = this.searchTerm().toLowerCase();
    
    return this.budgets().filter(budget =>
      budget.client.firstName.toLowerCase().includes(term) ||
      budget.client.email.toLowerCase().includes(term) ||
      budget.client.phone.includes(term)
    );
  });

  viewDetails(budget: Budget) {
    this.router.navigate(['/budget-summary', budget.id]);
  }
}
