import {
  BaseGenerator,
  FileSystemEntity,
  TemplateEntity
} from "../base.js";


interface PromptAnswers {
  projectName: string;
}

export default class extends BaseGenerator {
  answers!: PromptAnswers;

  initializing() {
  }

  async prompting() {
    const answers = await this.prompt([
      /*{
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to enable this option?",
        default: true
      }, */
      {
        type: "input",
        name: "projectName",
        message: "What's the project name? ",
        store: false
      },

    ]);

    this.answers = answers;


  }

  writing() {
    const files: FileSystemEntity[] = [
      { currentName: "pom.xml" },
      { currentName: "_gitignore", newName: ".gitignore" },
      { currentName: "src/main/java/com/danielsaldivar/app/App.java" },
      { currentName: "src/test/java/com/danielsaldivar/app/AppTest.java" }
    ];

    files.forEach(el => {
      if (el.newName) {
        this.copyFileSystemEntity(el.currentName, `${this.answers.projectName}/${el.newName}`);
      } else {
        this.copyFileSystemEntity(el.currentName, `${this.answers.projectName}/${el.currentName}`);
      }
    });

    const templates: TemplateEntity[] = [
      /* {
        currentName: "index.html",
        newName: "public/index.html",
        data: { title: this.answers.title }
      } */
    ];

    templates.forEach(el => {
      this.useTemplate(el.currentName, `${this.answers.projectName}/${el.newName}`, el.data);
    });
  }
}
