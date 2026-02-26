import {Injectable} from '@angular/core';
import {AlertType} from '../../core/enums/alert.enum';
import {IAppResponse} from '../../core/model/app.error-response';
import {IAlertModel} from '../../core/model/alert.model';
import {HttpErrorResponse} from '@angular/common/http';
import {AppResponse} from '../../core/model/app.response';
import {DialogMessage} from "../static/messages";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastrService: ToastrService) {

  }

  alert(alertType: AlertType = AlertType.Error, appRes?: AppResponse, errRes?: HttpErrorResponse) {

    let error = errRes ? <IAppResponse>errRes.error : null;

    let alertModel: IAlertModel = {
      Title: error?.Title || appRes?.Title || DialogMessage.SystemMessage,
      ClientMessage: appRes?.ClientMessage || error?.ErrorMessage || DialogMessage.GeneralMessage
    }

    switch (alertType) {

      case AlertType.Success:
        this.toastrService.success(alertModel.ClientMessage, alertModel.Title)
        break;

      case AlertType.Info:
        this.toastrService.info(alertModel.ClientMessage, alertModel.Title)
        break;

      case AlertType.Warning:
        this.toastrService.warning(alertModel.ClientMessage, alertModel.Title)
        break;

      case AlertType.Error:

        this.toastrService.error(alertModel.ClientMessage, alertModel.Title)

        if (errRes) {
          let errorAppRes: IAppResponse;
          errorAppRes = <IAppResponse>(<HttpErrorResponse>errRes).error;
          console.log(errorAppRes);
        }

        break;
    }

  }

  errorClientMessage(error: any) {

    console.error(error);
    this.alert(AlertType.Error, {ClientMessage: error?.message});

  }
}
