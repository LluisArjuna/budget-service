import { Component, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from '../../services/budget-service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Budget } from '../../interfaces/budget.interface';
import { Client } from '../../interfaces/client.interface';  

@Component({
  selector: 'app-budget-form',
  imports: [ReactiveFormsModule],
  templateUrl: './budget-form.html',
})
export class BudgetForm {
  private readonly budgetService = inject(BudgetService);
  private readonly router: Router = inject(Router);

  private fb: FormBuilder = inject(FormBuilder);
  onBudgetRequest = output<Client>();

  phonePattern = /((\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/;
  
  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
    email: ['', [Validators.required, Validators.email]]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {  
      this.onBudgetRequest.emit(this.form.getRawValue() as Client);
      this.form.reset();
    }
    /*
    this.budgetService.setCustomer(this.form.value as Client);
    const selectedServices = this.budgetService.services().filter(service => service.selected);

    const budget: Budget = this.budgetService.generateBudget(selectedServices, this.form.value as Client);

    this.budgetService.saveBudget(budget);

    this.router.navigate(['/budget-history']);*/
  }
}
