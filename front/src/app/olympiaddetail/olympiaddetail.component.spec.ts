import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympiaddetailComponent } from './olympiaddetail.component';

describe('OlympiaddetailComponent', () => {
  let component: OlympiaddetailComponent;
  let fixture: ComponentFixture<OlympiaddetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympiaddetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympiaddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
