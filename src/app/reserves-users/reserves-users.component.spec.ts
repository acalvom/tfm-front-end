import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservesUsersComponent } from './reserves-users.component';

describe('ReservesUsersComponent', () => {
  let component: ReservesUsersComponent;
  let fixture: ComponentFixture<ReservesUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservesUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservesUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
