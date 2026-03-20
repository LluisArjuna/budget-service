import { Component, input, output, EventEmitter, ChangeDetectionStrategy, computed } from '@angular/core';
import { Service } from '../../interfaces/service.interface';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.html',
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
    return serv.basePrice + (pages * languages * extraUnitPrice);
  });

  emitChange = output<{ id: number; pages: number; languages: number }>();

  updateLanguages(event: Event) {
  const value = Number((event.target as HTMLInputElement).value);

  this.emitChange.emit({
    id: this.service().id,
    pages: this.service().configuration!.pages,
    languages: value
  });
  }

  updatePages(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);

    this.emitChange.emit({
      id: this.service().id,
      pages: value,
      languages: this.service().configuration!.languages
    });
  }
}
