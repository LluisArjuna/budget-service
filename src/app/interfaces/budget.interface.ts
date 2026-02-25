import { Client } from './client.interface';
import { Service } from './service.interface';

export interface Budget {
    id: string;
    date: string;
    client: Client;
    services: Service[];
    total: number;
}