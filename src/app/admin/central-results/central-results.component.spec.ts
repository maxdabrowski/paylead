import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralResultsComponent } from './central-results.component';

describe('CentralResultsComponent', () => {
  let component: CentralResultsComponent;
  let fixture: ComponentFixture<CentralResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
