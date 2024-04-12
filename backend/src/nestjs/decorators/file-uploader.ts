import { diskStorage } from 'multer';
import { basename, extname } from 'path';

import { UnsupportedMediaTypeException } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

interface FileUploaderOption {
  uploadFields: MulterField[];
  destination?: string;
  fileSize?: number;
  acceptedTypes?: string[];
}

export const MB = 1024 * 1024;
export const oneKB = 1024;

function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    _req,
    file: File,
    callback: (error: Error | null, acceptFile: boolean) => void
  ) => {
    if (mimetypes.length < 1) {
      return callback(null, true);
    }

    if (mimetypes.some((m) => (file as any).mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException('errors.FILE_TYPE_IS_NOT_MATCHING'),
        false
      );
    }
  };
}

function storageOptions(destination: string): ReturnType<typeof diskStorage> {
  return diskStorage({
    destination,
    filename: (req, file, callback) => {
      const unique = new Date().getTime();
      const ext = extname(file.originalname);
      const base = basename(file.originalname, ext);
      const filename = `${base}-${unique}${ext}`.replace(/\s/g, '');
      callback(null, filename);
    }
  });
}

export function FileUploader(
  options: FileUploaderOption
): ReturnType<typeof FileFieldsInterceptor> {
  return FileFieldsInterceptor(options.uploadFields, {
    storage: storageOptions(options?.destination ?? 'uploads'),
    limits: { fileSize: options.fileSize ?? 10 * MB },
    fileFilter: fileMimetypeFilter(...(options.acceptedTypes ?? [])) as any
  });
}
