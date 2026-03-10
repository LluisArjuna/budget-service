import { Component, computed, inject, signal } from '@angular/core';
import { services } from '../../data/services';
import { Service } from '../../interfaces/service.interface';
import { ServiceCard } from "../service-card/service-card";
import { BudgetService } from '../../services/budget-service';    
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-list',
  imports: [ServiceCard],
  templateUrl: './service-list.html',
  
})

export class ServiceList {
  services = signal<Service[]>(services);

  private readonly budgetService = inject(BudgetService);
  private readonly router: Router = inject(Router);

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

  total = computed(() =>
    this.budgetService.calculateTotal(this.services())
  );


  generateBudget() {
  const selected = this.services().filter(service => service.selected);

  this.budgetService.setServices(selected);

  this.router.navigate(['/budget-form']);
}
}
