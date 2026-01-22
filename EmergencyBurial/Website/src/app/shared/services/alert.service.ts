import {Injectable} from '@angular/core';
import {AlertType} from '../../core/enums/alert.enum';
import {IAppResponse} from '../../core/model/app.error-response';
import {IAlertModel} from '../../core/model/alert.model';
import {HttpErrorResponse} from '@angular/common/http';
import {AppResponse} from '../../core/model/app.response';
import {MessageService} from "primeng/api";
import {DialogMessage} from "../static/messages";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private TOAST_LIFE_MS = 3000;

  constructor(private messageService: MessageService) {

  }

  alert(alertType: AlertType = AlertType.Error, appRes?: AppResponse, errRes?: HttpErrorResponse) {

    let error = errRes ? <IAppResponse>errRes.error : null;

    let alertModel: IAlertModel = {
      Title: error?.Title || appRes?.Title || DialogMessage.SystemMessage,
      ClientMessage: appRes?.ClientMessage || error?.ErrorMessage || DialogMessage.GeneralMessage
    }

    switch (alertType) {

      case AlertType.Success:
        this.showMessage('success', alertModel.Title, alertModel.ClientMessage, 'centerBottomToast')
        break;

      case AlertType.Info:
        this.showMessage('info', alertModel.Title, alertModel.ClientMessage)
        break;

      case AlertType.Warning:
        this.showMessage('warn', alertModel.Title, alertModel.ClientMessage)
        break;

      case AlertType.Error:

        this.showMessage('error', alertModel.Title, alertModel.ClientMessage)

        if (errRes) {
          let errorAppRes: IAppResponse;
          errorAppRes = <IAppResponse>(<HttpErrorResponse>errRes).error;
          console.log(errorAppRes);
        }

        break;
    }

  }

  private showMessage(severity: string, summary: string = '', detail: string, key: string = 'centerToast', life: number = this.TOAST_LIFE_MS) {

    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
      key: key
    });
  }

  errorClientMessage(error: any) {

    console.error(error);
    this.alert(AlertType.Error, {ClientMessage: error?.message});

  }
}
