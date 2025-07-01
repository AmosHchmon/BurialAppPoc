import {AppDocumentType} from '../../enum/document-type.enum';

export interface IFileResult {
  Name: string,
  FileId: string;
  FileType: AppDocumentType;
}
