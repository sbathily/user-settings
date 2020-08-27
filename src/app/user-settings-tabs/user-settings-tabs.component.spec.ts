import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsTabsComponent } from './user-settings-tabs.component';

describe('UserSettingsTabsComponent', () => {
  let component: UserSettingsTabsComponent;
  let fixture: ComponentFixture<UserSettingsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
