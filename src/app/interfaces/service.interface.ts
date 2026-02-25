export interface Service {
    id:number;
    type: ServiceName;
    description: string;
    basePrice: number;
    selected: boolean;
    configuration?: WebConfiguration; 
}

export interface WebConfiguration {
    pages: number;
    languages: number;
    extraUnitPrice: number;
}

export type ServiceName = 'Seo' | 'Ads' | 'Web';