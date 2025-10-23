import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable} from '@angular/core';

import {AlertService} from 'src/app/shared/services/alert.service';
import {AlertType} from "../../core/enums/alert.enum";
import { DialogMessage } from '../static/messages';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private alertService: AlertService) {}

  handleError(error: any): void {

    switch (error.status) {
        case 401: // Unauthorized
           return;
        case 403://Forbidden
           this.alertService.alert(AlertType.Error, {ClientMessage : DialogMessage.ForbiddenAction}, error)
           return;
    }

    if (error instanceof HttpErrorResponse) {
      this.alertService.alert(AlertType.Error, null, error);
    } else {
      this.alertService.errorClientMessage(error);
    }
  }
}
