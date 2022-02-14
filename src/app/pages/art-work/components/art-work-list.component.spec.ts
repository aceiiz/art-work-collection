import { TestBed } from '@angular/core/testing';
import { ArtWorkListComponent } from './art-work-list.component';

describe('ArtWorkListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ArtWorkListComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ArtWorkListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
