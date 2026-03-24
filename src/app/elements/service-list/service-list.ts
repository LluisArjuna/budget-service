import { Component, computed, inject, signal } from '@angular/core';
import { services } from '../../data/services';
import { Service } from '../../interfaces/service.interface';
import { ServiceCard } from "../service-card/service-card";
import { BudgetService } from '../../services/budget-service';    
import { Router } from '@angular/router';
import { BudgetForm } from '../budget-form/budget-form';
import { Client } from '../../interfaces/client.interface';
import { Budget } from '../../interfaces/budget.interface';

@Component({
  selector: 'app-service-list',
  imports: [ServiceCard, BudgetForm],
  templateUrl: './service-list.html',
  
})

export class ServiceList {
  private readonly budgetService = inject(BudgetService);
  private readonly router: Router = inject(Router);

  services = signal<Service[]>(services);
  total = computed(() =>
    this.budgetService.calculateTotal(this.services())
  );
  showRequestModal = signal<boolean>(false);
  

  toggleService(id: number) {
  this.services.update(list =>
    list.map(service =>
      service.id === id
        ? { ...service, selected: !service.selected }
        : service
    )
  );
  }

  updateConfig(event: { id: number; pages: number; languages: number }) {
  this.services.update(list =>
    list.map(service =>
      service.id === event.id && service.configuration
        ? {
            ...service,
            configuration: {
              ...service.configuration,
              pages: event.pages,
              languages: event.languages
            }
          }
        : service
    )
  );
  }

  saveBudget(client: Client) {
    const selectedServices = this.services().filter(service => service.selected);
    const budget: Budget = this.budgetService.generateBudget(selectedServices, client);
    this.budgetService.saveBudget(budget);
    this.showRequestModal.set(false);

    if (budget && budget.id) {
      this.router.navigate(['/budget-history']);
    } else {
      console.error("Error 404: This budget it is unavailable.");
    }
  }

  openRequestModal() {
    this.showRequestModal.set(true);
  }
}
