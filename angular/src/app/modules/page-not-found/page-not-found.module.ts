import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, RouterModule, PageNotFoundRoutingModule],
})
export class PageNotFoundModule {}
