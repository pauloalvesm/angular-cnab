import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnabFileComponent } from './cnab-file.component';

describe('CnabFileComponent', () => {
  let component: CnabFileComponent;
  let fixture: ComponentFixture<CnabFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CnabFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnabFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
