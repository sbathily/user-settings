import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { DataService } from './data.service';
import { UserSettingsModalComponent } from './user-settings-modal/user-settings-modal.component';
import { UserSettingsTabsComponent } from './user-settings-tabs/user-settings-tabs.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule ],
  declarations: [ AppComponent, HelloComponent, UsersManagementComponent, UserSettingsModalComponent, UserSettingsTabsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataService]
})
export class AppModule { }
