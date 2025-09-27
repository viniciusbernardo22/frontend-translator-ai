import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseBlockComponent } from './response-block.component';

describe('ResponseBlockComponent', () => {
  let component: ResponseBlockComponent;
  let fixture: ComponentFixture<ResponseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
