import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { User } from '../../user/user.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: spy }],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up a user', () => {
    const mockResponse = {
      email: 'test@example.com',
      localId: '123',
      idToken: 'abc',
      expiresIn: '3600',
    };

    service.signUp('test@example.com', 'password123').subscribe();

    const req = httpMock.expectOne((req) =>
      req.url.includes('accounts:signUp')
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should log in a user', () => {
    const mockResponse = {
      email: 'test@example.com',
      localId: '123',
      idToken: 'abc',
      expiresIn: '3600',
    };

    service.login('test@example.com', 'password123').subscribe();

    const req = httpMock.expectOne((req) =>
      req.url.includes('accounts:signInWithPassword')
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should log out the user and navigate to /auth', () => {
    service.logOut();
    service.user.subscribe((user) => {
      expect(user).toBeNull();
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should handle EMAIL_EXISTS error', (done) => {
    const firebaseErrorMessage = 'EMAIL_EXISTS';
    const expectedErrorMessage = 'This email exists already';
    const errorResponse = new HttpErrorResponse({
      error: {
        error: {
          message: firebaseErrorMessage,
        },
      },
      status: 400,
      statusText: 'Bad Request',
    });

    service.signUp('test@example.com', 'password123').subscribe({
      next: () => {
        fail('Expected an error, but received a successful response');
      },
      error: (error) => {
        expect(error).toBe(expectedErrorMessage);
        done();
      },
    });

    const req = httpMock.expectOne((req) =>
      req.url.includes('accounts:signUp')
    );
    expect(req.request.method).toBe('POST');
    req.error(errorResponse.error, {
      status: errorResponse.status,
      statusText: errorResponse.statusText,
    });
  });
});
