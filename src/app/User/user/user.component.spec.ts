import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { AuthService } from '../Auth/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userSubject: BehaviorSubject<User | null>;

  beforeEach(() => {
    userSubject = new BehaviorSubject<User | null>(null);
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      user: userSubject.asObservable(),
    });

    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize isLoggedIn to false and userEmail to undefined', () => {
    expect(component.isLoggedIn).toBeFalse();
    expect(component.userEmail).toBeUndefined();
  });

  it('should update isLoggedIn to true and set userEmail when user is emitted', () => {
    const mockUser = new User('test@example.com', '123', 'token', new Date());
    userSubject.next(mockUser);
    expect(component.isLoggedIn).toBeTrue();
    expect(component.userEmail).toBe('test@example.com');
  });

  it('should handle a user object (without email)', () => {
    const mockUser = new User('', '123', 'token', new Date());
    userSubject.next(mockUser);
    expect(component.isLoggedIn).toBeTrue();
    expect(component.userEmail).toBe('');
  });
});
