import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionResultsComponent } from './region-results.component';

describe('RegionResultsComponent', () => {
  let component: RegionResultsComponent;
  let fixture: ComponentFixture<RegionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
