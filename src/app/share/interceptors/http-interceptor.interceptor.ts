import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { SnackBarService } from "../../services/snack-bar-service.service";

@Injectable()
export class HttpCodeInterceptor implements HttpInterceptor {
  
  
  constructor(public snackBarSvc: SnackBarService) { }
  
  
  intercept(req: HttpRequest<any>, next: HttpHandler){

   
    return next.handle(req).pipe(
      
      catchError((err: any) => {
       
        if (err instanceof HttpErrorResponse) {
          // Handle HTTP errors
  
          switch (err.status) {
            case 401:
             // Specific handling for unauthorized errors   
             this.snackBarSvc.OpenSnackBar({type:"ERROR", title:"Unauthorized request"});    
             console.error('Unauthorized request:', err);
             // You might trigger a re-authentication flow or redirect the user here            
              break;
  
           case 0:
  
           this.snackBarSvc.OpenSnackBar({type:"ERROR", title:"API Network Connection Error"});
           //console.error('Network connection error:', err);

           break;

           //Validation errors
           case 400:
           
           this.snackBarSvc.OpenSnackBar({type:"ERROR", title:`${err.error[Object.keys(err.error)[3]].Id[0]}`});
           //console.error(err.error[Object.keys(err.error)[3]].Id[0]);
            
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
    );
    
  }

}