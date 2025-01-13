import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { BookingComponent } from './booking-form/booking-form.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'booking-form', component: BookingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'order-history', component: OrderHistoryComponent},
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



