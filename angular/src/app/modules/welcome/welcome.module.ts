import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, RouterModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
