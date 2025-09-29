import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringResponseBlockComponent } from './response-block.component';

describe('ResponseBlockComponent', () => {
  let component: StringResponseBlockComponent;
  let fixture: ComponentFixture<StringResponseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringResponseBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StringResponseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
