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
  }/**/ 

  increasePages() {
  this.configChange.emit({
      id: this.service().id,
      pages: this.service().configuration!.pages +1,
      languages: this.service().configuration!.languages
    });
}

decreasePages() {
  const serv = this.service();
  if (!serv.configuration) return;

  const pages = Math.max(1, serv.configuration.pages - 1);

  this.configChange.emit({
    id: serv.id,
    pages,
    languages: serv.configuration.languages
  });
}

increaseLanguages() {
  const serv = this.service();
  if (!serv.configuration) return;

  this.configChange.emit({
    id: serv.id,
    pages: serv.configuration.pages,
    languages: serv.configuration.languages + 1
  });
}

decreaseLanguages() {
  const serv = this.service();
  if (!serv.configuration) return;

  const languages = Math.max(1, serv.configuration.languages - 1);

  this.configChange.emit({
    id: serv.id,
    pages: serv.configuration.pages,
    languages
  });
}
}
