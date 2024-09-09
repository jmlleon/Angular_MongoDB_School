import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';



export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors

        switch (err.status) {
          case 401:
           // Specific handling for unauthorized errors         
           console.error('Unauthorized request:', err);
           // You might trigger a re-authentication flow or redirect the user here            
            break;

         case 0:

         console.error('Network connection error:', err);
          
         break;
        
          default:

           // Handle other HTTP error codes
           console.error('HTTP error:', err);
            break;
        }      


      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );;
  
  
  //return next(req);
};
