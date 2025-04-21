import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOlympiadsComponent } from './myolymp.component';

describe('MyOlympiadsComponent', () => {
  let component: MyOlympiadsComponent;
  let fixture: ComponentFixture<MyOlympiadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOlympiadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOlympiadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
