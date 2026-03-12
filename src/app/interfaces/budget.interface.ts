import { Client } from './client.interface';
import { Service } from './service.interface';

export interface Budget {
    id: string;
    date: Date;
    client: Client;
    services: Service[];
    total: number;
}