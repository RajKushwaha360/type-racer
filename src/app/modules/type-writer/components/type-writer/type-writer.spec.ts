import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeWriter } from './type-writer';

describe('TypeWriter', () => {
  let component: TypeWriter;
  let fixture: ComponentFixture<TypeWriter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeWriter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeWriter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
