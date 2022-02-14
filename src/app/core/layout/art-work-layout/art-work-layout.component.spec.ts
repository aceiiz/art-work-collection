import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { ArtworkLayoutComponent } from './art-work-layout.component';


describe('ArtworkLayoutComponent', () => {
  let component: ArtworkLayoutComponent;
  let fixture: ComponentFixture<ArtworkLayoutComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworkLayoutComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
