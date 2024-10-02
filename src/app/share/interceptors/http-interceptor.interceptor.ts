import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { SnackBarService } from "../../services/snack-bar-service.service";

@Injectable()
export class HttpCodeInterceptor implements HttpInterceptor {
  
  private snackBarSvc=inject(SnackBarService);

  constructor() { }
  
  
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
            break;
  
           case 0:
  
           this.snackBarSvc.OpenSnackBar({type:"ERROR", title:"API Network Connection Error"});          

           break;

           //Validation errors
           case 400:
           
           this.snackBarSvc.OpenSnackBar({type:"ERROR", title:`${err.error[Object.keys(err.error)[3]].Id[0]}`});          
            
           break;
          
            default:  
             // Handle other HTTP error codes
             console.error('HTTP error:', err);
              break;
          }      
  
  
        } else {
          
          console.error('An not HTTP error occurred:', err);        }  
       
        return throwError(() => err); 
      })
    );
    
  }

}