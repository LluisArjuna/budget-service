import { Service } from "../interfaces/service.interface";

export const services: Service[] = [
  {
    id: 1,
    type: "Seo",
    description: "Programació d'una web responsive completa",
    basePrice: 300,
    selected: false
  },
  {
    id: 2,
    type: "Ads",
    description: "Programació d'una web responsive completa",
    basePrice: 400,
    selected: false
  },
  {
    id: 3,
    type: "Web",
    description: "Programació d'una web responsive completa",
    basePrice: 500,
    selected: false,
    configuration:{
        pages: 1,
        languages: 1,
        extraUnitPrice: 30
    }
  }
];