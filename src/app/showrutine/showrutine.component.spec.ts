import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowrutineComponent } from './showrutine.component';

describe('ShowrutineComponent', () => {
  let component: ShowrutineComponent;
  let fixture: ComponentFixture<ShowrutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowrutineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowrutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
