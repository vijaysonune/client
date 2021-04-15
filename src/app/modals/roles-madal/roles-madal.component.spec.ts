import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesMadalComponent } from './roles-madal.component';

describe('RolesMadalComponent', () => {
  let component: RolesMadalComponent;
  let fixture: ComponentFixture<RolesMadalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesMadalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesMadalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
