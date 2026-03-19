import {Injectable, signal} from '@angular/core';
import { Service } from '../interfaces/service.interface';
import { Client } from '../interfaces/client.interface';
import { Budget } from '../interfaces/budget.interface';
import { services } from '../data/services';


@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private storageKey = 'budgets';

  getServices(): Service[] {  
    return [...services];
  }

  getBudgets(): Budget[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getBudgetById(id: string): Budget | undefined {
    return this.getBudgets().find(budget => budget.id === id);
  }

  generateBudget(services: Service[], customer: Client): Budget {
    const total = this.calculateTotal(services);
    return {
      id: crypto.randomUUID(),
      date: new Date(),
      client: customer,
      services: services,
      total: total
    };
  }

  saveBudget(budget: Budget) {
    const updatedBudgets = [...this.getBudgets(), budget];
    localStorage.setItem(this.storageKey, JSON.stringify(updatedBudgets));
  }

  calculateTotal(services: Service[]): number {
    return services.reduce((total, service) => {

      if (!service.selected) return total;

      if (service.type !== 'Web' || !service.configuration) {
        return total + service.basePrice;
      }

      const { pages, languages, extraUnitPrice } = service.configuration;

      return total + service.basePrice + (pages + languages) * extraUnitPrice;

    }, 0);
  }

}
