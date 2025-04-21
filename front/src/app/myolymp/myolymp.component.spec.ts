import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyolympComponent } from './myolymp.component';

describe('MyolympComponent', () => {
  let component: MyolympComponent;
  let fixture: ComponentFixture<MyolympComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyolympComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyolympComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
