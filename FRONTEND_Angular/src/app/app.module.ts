import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms'; 
import { BookingComponent } from './booking-form/booking-form.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignInComponent,
    SignUpComponent,
    OrderHistoryComponent,
    NavbarComponent,
    BookingComponent,
    AdminComponent,
    AdminNavbarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
