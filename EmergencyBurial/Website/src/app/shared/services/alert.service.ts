import { Injectable } from '@angular/core';
import { AlertType } from '../../core/enums/alert.enum';
import { IAppResponse } from '../../core/model/app.error-response';
import { IAlertModel } from '../../core/model/alert.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppResponse } from '../../core/model/app.response';
import { DialogMessage } from '../static/messages';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertService {
  private toastrConfig = { timeOut: 10000, tapToDismiss: true, positionClass: 'toast-bottom-center' };

  constructor(private toasterService: ToastrService) {

  }

  error(errRes: HttpErrorResponse, alertType: AlertType = AlertType.Error) {

    let errorAppRes: IAppResponse;

    errorAppRes = <IAppResponse>(<HttpErrorResponse>errRes).error;

    console.log(errorAppRes);

    let alertModel: IAlertModel = {
      Title: errorAppRes?.Title == undefined ? DialogMessage.SystemMessage : errorAppRes?.Title,
      ClientMessage: errorAppRes.ErrorMessage == undefined ? DialogMessage.GeneralMessage : errorAppRes.ErrorMessage
    }

    this.toasterService.error(alertModel.ClientMessage, alertModel.Title, this.toastrConfig);

  }

  alert(alertType: AlertType, appRes: AppResponse) {

    let alertModel: IAlertModel = {
      Title: appRes ==  appRes?.Title ? DialogMessage.SystemMessage : appRes?.Title,
      ClientMessage: appRes?.ClientMessage == undefined ? DialogMessage.GeneralMessage : appRes?.ClientMessage
    }

    switch (alertType) {
      case AlertType.Success:
        this.toasterService.success(alertModel.ClientMessage, alertModel.Title, this.toastrConfig);
        break;
        case AlertType.Info:
      case AlertType.Warning:
        this.toasterService.warning(alertModel.ClientMessage, alertModel.Title, this.toastrConfig);
        break;
        case AlertType.Error:
        this.toasterService.error(alertModel.ClientMessage, alertModel.Title, this.toastrConfig);
        break;
      default:
        this.toasterService.info('info Message', 'info', this.toastrConfig);
    }

  }

  warning(alertType:AlertType, message: string, titleClass: string){

    this.toasterService.warning(message, alertType ,{...this.toastrConfig, titleClass: titleClass});

  }


  private joinValidationErrorArray(res: Array<Array<string>>): IAppResponse {

    let result: IAppResponse = { ErrorMessage: DialogMessage.BadRequest };

    let msgStr: string = '';

    if (res == null)
      return result;

    for (var prop in res) {
      msgStr += `${prop}:${res[prop][0]}<br>`;
    }

    result.ErrorMessage = msgStr;

    return result;

  }
}
