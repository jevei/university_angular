import { Component } from '@angular/core';
import { ProductApiRequestService } from 'src/app/services/product-api-request.service';

@Component({
  selector: 'app-welcome',

  templateUrl: './welcome.component.html',

  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  constructor(private apiService: ProductApiRequestService) {
    //console.log(this.products.findIndex(s => s.id === 1), this.products.find(s => s.id === 1));
    this.apiService.listProducts().subscribe((success) => {
      if (success) {
        console.log('OK');
      } else {
        console.log('ERROR', success);
        alert('ERROR!!!');
      }
    });
  }
}
