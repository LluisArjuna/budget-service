import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from '../../services/budget-service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-budget-form',
  imports: [ReactiveFormsModule],
  templateUrl: './budget-form.html',
})
export class BudgetForm {
  private readonly budgetService = inject(BudgetService);
  private readonly router: Router = inject(Router);
  private fb: FormBuilder = new FormBuilder();
  
  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    email: ['', [Validators.required, Validators.email]]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.budgetService.setCustomer(this.form.value as any);

    this.router.navigate(['/summary']);
  }
}
