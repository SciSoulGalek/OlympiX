import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympiadListComponent } from './olympiad-list.component';

describe('OlympiadListComponent', () => {
  let component: OlympiadListComponent;
  let fixture: ComponentFixture<OlympiadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympiadListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympiadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
