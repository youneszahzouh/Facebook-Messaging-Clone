/* eslint-disable @typescript-eslint/no-extraneous-class */
import { FileSystemStoredFile } from 'nestjs-form-data';
import { extname, basename } from 'path';
import { FileModel } from 'src/modules/file/file.model';

export class FileDataMapper {
  static fromExpressToDomain(file: Express.Multer.File): FileModel {
    return {
      name: file.filename,
      url: file.path,
      mimetype: file.mimetype,
      size: file.size
    };
  }

  static fromStoredFileToDomain(
    file: FileSystemStoredFile | any
  ): FileModel | undefined {
    if (file === undefined) {
      return file;
    }
    return {
      name: this.generateFileName(file.originalName),
      url: file.path,
      mimetype: file.mimetype,
      size: file.size
    };
  }

  private static generateFileName(originalName: string): string {
    const unique = new Date().getTime();
    const ext = extname(originalName);
    const base = basename(originalName, ext);
    const filename = `${base}-${unique}${ext}`.replace(/\s/g, '');
    return filename;
  }
}
