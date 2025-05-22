import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../User/Auth/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../User/user/user.model';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userSubject: BehaviorSubject<User | null>;

  beforeEach(() => {
    userSubject = new BehaviorSubject<User | null>(null);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logOut'], {
      user: userSubject.asObservable(),
    });

    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: jasmine.createSpyObj('ParamMap', ['get']),
        queryParamMap: jasmine.createSpyObj('QueryParamMap', ['get']),
      },
      params: new BehaviorSubject({}),
      queryParams: new BehaviorSubject({}),
      fragment: new BehaviorSubject(''),
      data: new BehaviorSubject({}),
    });

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }, // Provide a mock ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call authService.logOut() when logOut is called', () => {
    component.logOut();
    expect(authServiceSpy.logOut).toHaveBeenCalledTimes(1);
  });
});
