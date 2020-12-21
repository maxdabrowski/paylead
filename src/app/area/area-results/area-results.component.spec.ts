import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaResultsComponent } from './area-results.component';

describe('AreaResultsComponent', () => {
  let component: AreaResultsComponent;
  let fixture: ComponentFixture<AreaResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
