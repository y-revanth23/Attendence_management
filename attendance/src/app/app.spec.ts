import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app'; // Changed 'App' to 'AppComponent'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Changed 'App' to 'AppComponent'
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger data binding
    const compiled = fixture.nativeElement as HTMLElement;
    // We check for 'Attendance' because that's what is in your <h2> now
    expect(compiled.querySelector('h2')?.textContent).toContain('Attendance');
  });
});
