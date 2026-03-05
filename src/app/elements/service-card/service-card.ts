import { Component, input, output, EventEmitter, ChangeDetectionStrategy, computed } from '@angular/core';
import { Service } from '../../interfaces/service.interface';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCard {
  service = input.required<Service>();

  toggle = output<number>();

  isWebSelected = computed(() =>
    this.service().type === 'Web' && this.service().selected 
  );

  subtotal = computed(() => {
    const serv = this.service();
    if (!serv.selected) return 0;

    if (serv.type !== 'Web' || !serv.configuration) {
      return serv.basePrice;
    }

    const { pages, languages, extraUnitPrice } = serv.configuration;
    return serv.basePrice + (pages + languages) * extraUnitPrice;
  });

  configChange = output<{ id: number; pages: number; languages: number }>();

  updatePages(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.configChange.emit({
      id: this.service().id,
      pages: value,
      languages: this.service().configuration!.languages
    });
  }

  updateLanguages(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.configChange.emit({
      id: this.service().id,
      pages: this.service().configuration!.pages,
      languages: value
    });
  }
}
