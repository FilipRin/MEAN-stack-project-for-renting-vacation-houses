import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { TouristComponent } from './tourist/tourist.component';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { PasschangeComponent } from './passchange/passchange.component';
import { LandlordComponent } from './landlord/landlord.component';
import { LlvikendiceComponent } from './landlord/llvikendice/llvikendice.component';
import { TvikendiceComponent } from './tourist/tvikendice/tvikendice.component';
import { VikendicaComponent } from './vikendica/vikendica.component';
import { TreservationComponent } from './tourist/treservation/treservation.component';
import { LlreservationComponent } from './landlord/llreservation/llreservation.component';
import { AdminindexComponent } from './admin/adminindex/adminindex.component';
import { AdminregistrationsComponent } from './admin/adminregistrations/adminregistrations.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "admin/login", component:AdminloginComponent},
    {path: "admin/adminindex", component:AdminindexComponent},
    {path: "admin/adminregistrations", component:AdminregistrationsComponent},
    {path: "tourist", component:TouristComponent},
    {path: "", component:IndexpageComponent},
    {path: "passchange",component:PasschangeComponent},
    {path:"landlord",component:LandlordComponent},
    {path:"landlord/llvikendice",component:LlvikendiceComponent},
    {path:"landlord/llreservation",component:LlreservationComponent},
    {path: "tourist/tvikendice", component:TvikendiceComponent},
    {path: "vikendica", component:VikendicaComponent},
    {path: "tourist/treservation", component:TreservationComponent},
];
