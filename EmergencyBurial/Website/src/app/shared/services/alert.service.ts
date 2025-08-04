import {Injectable} from '@angular/core';
import {AlertType} from '../../core/enums/alert.enum';
import {IAppResponse} from '../../core/model/app.error-response';
import {IAlertModel} from '../../core/model/alert.model';
import {HttpErrorResponse} from '@angular/common/http';
import {AppResponse} from '../../core/model/app.response';
import {DialogMessage} from '../static/messages';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private TOAST_LIFE_MS = 3000;

  constructor(private messageService: MessageService) {

  }

  alert(alertType: AlertType = AlertType.Error, appRes?: AppResponse, errRes?: HttpErrorResponse) {

    let alertModel: IAlertModel;

    if (errRes !== undefined) {

      let errorAppRes: IAppResponse = {};

      errorAppRes.Title = errRes?.error;

      alertModel = {
        Title: errorAppRes?.Title == undefined ? DialogMessage.SystemMessage : errorAppRes?.Title,
        ClientMessage: errorAppRes.ErrorMessage == undefined ? DialogMessage.GeneralMessage : errorAppRes.ErrorMessage
      }
    } else {

      alertModel = {
        Title: appRes == appRes?.Title ? DialogMessage.SystemMessage : appRes?.Title,
        ClientMessage: appRes?.ClientMessage == undefined ? DialogMessage.GeneralMessage : appRes?.ClientMessage
      }
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
        break;
    }

  }

  private showMessage(severity: string, summary: string, detail: string, key: string = 'centerToast') {

    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: this.TOAST_LIFE_MS,
      key: key
    });
  }

  errorClientMessage(error: any) {

    if (error?.message) {
      this.alert(AlertType.Error, {ClientMessage: error?.message});
    } else {
      console.log(error);
    }

  }


}
