import {Injectable} from '@angular/core';
import { ServiceCard } from '../elements/service-card/service-card';
import { ServiceList } from '../elements/service-list/service-list';
import { Service } from '../interfaces/service.interface';
import { services } from '../data/services';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {

  getServices(): Service[] {  
    return services;
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
