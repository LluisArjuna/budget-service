import { Component, signal } from '@angular/core';
import { services } from '../../data/services';
import { Service } from '../../interfaces/service.interface';
import { ServiceCard } from "../service-card/service-card";


@Component({
  selector: 'app-service-list',
  imports: [ServiceCard],
  templateUrl: './service-list.html',
  styleUrl: './service-list.css',
})
export class ServiceList {
  services = signal<Service[]>(services);

  toggleService(id: number) {
  this.services.update(list =>
    list.map(service =>
      service.id === id
        ? { ...service, selected: !service.selected }
        : service
    )
  );
}
}
