import { HttpErrorResponse } from "@angular/common/http";
import { IAlertModel } from "./alert.model";

export class AppErrorResponse extends HttpErrorResponse {
  //public error: IAppResponse | undefined;
}

export interface IAppResponse extends IAlertModel {
  IsValid?: boolean;
  RetValStr?: string;
  RetValNumber?: number;
  ClientMessage?: string;
  ErrorMessage?: string;
  Title?: string;
}
