import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonResponseBlockComponent } from './json-response-block.component';

describe('JsonResponseBlockComponent', () => {
  let component: JsonResponseBlockComponent;
  let fixture: ComponentFixture<JsonResponseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonResponseBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonResponseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
