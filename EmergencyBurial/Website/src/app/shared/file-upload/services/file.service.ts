import {Injectable, Injector} from '@angular/core';
import {IFileResult} from '../model/file-result.model';
import {BaseService} from 'src/app/core/abstract/base-service';

@Injectable()
export class FileService extends BaseService {

  constructor(protected injector: Injector) {
    super("FileService",injector);
  }

  upload(files: FileList): Promise<IFileResult[]> {

    var formData = new FormData();

    Array.from(files).forEach(f => formData.append('files', f))

    return this.post<IFileResult[]>({ path: '/upload',body:formData});

  }

  download(fileId: string): Promise<any> {

    return fetch(this.backendPath + `/download/${fileId}`, {
      method: 'GET',
      headers : {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });

  }

}
