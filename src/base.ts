import Generator from "yeoman-generator";

import { fileURLToPath } from "url";
import path from "path";
import { Data, Options } from "ejs";
import { CopyOptions } from "mem-fs-editor";

export interface FileSystemEntity {
  currentName: string;
  newName?: string;
}

export interface TemplateEntity {
  currentName: string;
  data: {
    [key: string]: any;
  };
  newName?: string;
}

function getFilename(metaUrl: string): string {
  return fileURLToPath(metaUrl);
}

export function getDirname(metaUrl: string): string {
  return path.dirname(getFilename(metaUrl));
}

export class BaseGenerator extends Generator {
  copyFileSystemEntity(
    originalFileSystemEntity: string,
    newFileSystemEntity: string = originalFileSystemEntity
  ) {
    this.fs.copy(
      this.templatePath(originalFileSystemEntity),
      this.destinationPath(newFileSystemEntity)
    );
  }

  useTemplate(
    originalFilename: string,
    newFilename: string = originalFilename,
    data: object = {}
  ) {
    this.fs.copyTpl(
      this.templatePath(originalFilename),
      this.destinationPath(newFilename),
      data
    );
  }
}
