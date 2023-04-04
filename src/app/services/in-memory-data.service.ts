import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    const users = [
      {
        id: 1,
        firstname: 'Dr. ',
        lastname: 'Nice',
        email: 'nice@epharma.web',
        phone_number: '1111111111',
        password: '123456',
        is_admin: true,
      },
      {
        id: 2,
        firstname: 'Bombasto',
        lastname: 'Nice',
        email: 'nice@client.web',
        phone_number: '1111111111',
        password: '123456',
        is_admin: false,
      },
    ];
    const products = [
      {
        id: 1,
        name: 'Unisom',
        stock: 8,
        price: 9.99,
        expiration: '2024-03-20',
        description:
          "Unisom® est un aide-sommeil efficace et digne de confiance indiqué pour le soulagement de l'insomnie occasionnelle due au surmenage ou à la fatigue",
        last_input: '2023-03-10',
        last_output: '2023-03-16',
        picture_url:
          'https://assets.beauty.shoppersdrugmart.ca/bb-prod-product-image/628791004252/en/01/front/800/white.jpg',
      },
      {
        id: 2,
        name: 'Tylenol',
        stock: 9,
        price: 19.99,
        expiration: '2024-02-20',
        description:
          "Ce médicament est généralement pris au besoin contre les douleurs ou la fièvre, sauf en cas d'arthrose ou d'autres troubles chroniques",
        last_input: '2023-02-10',
        last_output: '2023-03-17',
        picture_url:
          'http://cdn.shopify.com/s/files/1/0358/8833/2938/products/j_88d309d9-76cd-4bd3-97f9-6aa11b47114b_1200x1200.jpg?v=1587332534',
      },
      {
        id: 3,
        name: 'Vitamine E',
        stock: 5,
        price: 20.99,
        expiration: '2024-03-20',
        description: 'Vitamines pour la peau',
        last_input: '2023-03-10',
        last_output: '2023-03-16',
        picture_url:
          'http://cdn.shopify.com/s/files/1/0586/8545/6592/products/abio-cosmetic-vitamine-e-huile-pure-pour-la-peau-28000ui-30ml.png?v=1637874138',
      },
      {
        id: 4,
        name: 'Fer+',
        stock: 40,
        price: 20.99,
        expiration: '2024-03-20',
        description:
          'https://www.santeenvrac.com/i/Flora-Fer-avec-complexe-de-vitamines-B-240-ml-Sante-en-vrac-13947.jpg?size=600',
        last_input: '2023-03-10',
        last_output: '2023-03-16',
        picture_url:
          'https://www.santeenvrac.com/i/Flora-Fer-avec-complexe-de-vitamines-B-240-ml-Sante-en-vrac-13947.jpg?size=600',
      },
      {
        id: 5,
        name: 'Accu-Check',
        stock: 0,
        price: 199.99,
        expiration: '2024-03-20',
        description: 'Moniteur de Glycimie',
        last_input: '2023-03-10',
        last_output: '2023-03-16',
        picture_url:
          'https://www.robe-materiel-medical.com/images_produits/image_4941_bandelettes-glycumie-(flacon-ouvert+boite).jpg?1650361790',
      },
      {
        id: 6,
        name: 'Oxymetrie',
        stock: 10,
        price: 29.99,
        expiration: '2024-03-21',
        description: "Test d'oxygene",
        last_input: '2023-01-10',
        last_output: '2023-03-12',
        picture_url:
          'https://www.girodmedical.com/media/wp_uploads/2018/10/2e1a0d10ed9a269307c214cd906780d2.png',
      },
    ];
    return { users, products };
  }
  genId(users: User[]): number {
    return users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 11;
  }
}
