import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
//
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
//
import { EducationListComponent } from './components/aptitudes/education-list/education-list.component';
import { EducationItemComponent } from './components/aptitudes/education-item/education-item.component';
import { SkillItemComponent } from './components/aptitudes/skill-item/skill-item.component';
import { SkillListComponent } from './components/aptitudes/skill-list/skill-list.component';
import { WorkProjectListComponent } from './components/aptitudes/work-project-list/work-project-list.component';
import { WorkProjectItemComponent } from './components/aptitudes/work-project-item/work-project-item.component';
// 
import { ManageButtonsComponent } from './components/manage-buttons/manage-buttons.component';
import { FormEducationComponent } from './components/modal/form-education/form-education.component';
import { FormSkillComponent } from './components/modal/form-skill/form-skill.component';
import { FormAboutComponent } from './components/modal/form-about/form-about.component';
import { FormWorkprojectComponent } from './components/modal/form-workproject/form-workproject.component';
import { LoginComponent } from './components/modal/login/form-login.component';
import { LogoutComponent } from './components/modal/logout/form-logout.component';
// SERVICES
import { InterceptorService } from './services/interceptor.service';
import { PersonDataService } from './services/person-data.service';
import { EducationDataService } from './services/education-data.service';
import { SkillDataService } from './services/skill-data.service';
import { WorkProjectDataService } from './services/workproject-data.service';
import { AuthenticationDataService } from './services/authentication-data.service';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    EducationListComponent,
    EducationItemComponent,
    SkillListComponent,
    SkillItemComponent,
    MainComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    LogoutComponent,
    ManageButtonsComponent,
    DynamicComponentDirective,
    FormEducationComponent,
    FormSkillComponent,
    FormAboutComponent,
    FormWorkprojectComponent,
    WorkProjectListComponent,
    WorkProjectItemComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    PersonDataService,
    EducationDataService,
    SkillDataService,
    WorkProjectDataService,
    AuthenticationDataService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
