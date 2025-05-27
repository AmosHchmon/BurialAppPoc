import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injector } from "@angular/core";
import { environment } from "src/environments/environment";
import { IHttpRequestParams } from "../interface/IHttpRequestParams";

export abstract class BaseService {

  private httpClient: HttpClient;
  private serviceName: string;
  private readonly baseApiUrl: string = environment.endPointApi;

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json-patch+json',
    })
  };

  constructor(private serviceNameStr:string,protected injector: Injector) {
    this.serviceName = this.getServiceName(serviceNameStr);
    this.httpClient = injector.get(HttpClient);
  }


  protected get backendPath(): string {
    return this.baseApiUrl + this.serviceName;
  }

  private getServiceName(serviceName: string): string {

    let regExp = new RegExp('service$');

    if (!regExp.test(serviceName.toLowerCase())) {
      throw Error("the name of the class not match the naming convention, the service name must need suffix 'service'");
    }
    else {
      return serviceName.substring(0, serviceName.toLowerCase().indexOf("service"))
    }

  }

  protected get<T>(args:IHttpRequestParams, options: { [param: string]: any } = {}): Promise<T | undefined> {
    return this.httpClient.get<T>(this.getActionPath(args.path), options).toPromise();
  }


  protected post<T>(args:IHttpRequestParams, options: { [param: string]: any } = {}): Promise<T | undefined> {
    return this.httpClient.post<T>(this.getActionPath(args.path), args.body, options).toPromise();
  }

  protected patch<T>(args:IHttpRequestParams, options: { [param: string]: any } = {}): Promise<T | undefined> {
    return this.httpClient.patch<T>(this.getActionPath(args.path), args.body, options).toPromise();
  }

  protected put<T>(args:IHttpRequestParams, options: { [param: string]: any } = {}): Promise<T | undefined> {
    return this.httpClient.put<T>(this.getActionPath(args.path), args.body, options).toPromise();
  }

  protected delete<T>(args:IHttpRequestParams, options: { [param: string]: any } = {}): Promise<T | undefined> {
    return this.httpClient.delete<T>(this.getActionPath(args.path), options).toPromise();
  }

  private getActionPath(path: string): string {
   return `${this.backendPath}` + (path == null ? '' : `${path}`);
  }
}
