import {
  BaseGenerator,
  FileSystemEntity,
  TemplateEntity
} from "../base.js";


interface PromptAnswers {
  projectName: string;
  groupId: string;
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

      {
        type: "input",
        name: "groupId",
        message: "What's the groupdId? ",
        store: false
      },


    ]);

    this.answers = answers;


  }

  writing() {

    const directoryGroupId = this.answers.groupId.split(".").join("/")

    const files: FileSystemEntity[] = [
      { currentName: "_gitignore", newName: ".gitignore" },

    ];

    files.forEach(el => {
      if (el.newName) {
        this.copyFileSystemEntity(el.currentName, `${this.answers.projectName}/${el.newName}`);
      } else {
        this.copyFileSystemEntity(el.currentName, `${this.answers.projectName}/${el.currentName}`);
      }
    });
    const templates: TemplateEntity[] = [
      {
        currentName: "pom.xml",
        newName: "pom.xml",
        data: {
          groupId: this.answers.groupId,
          projectName: this.answers.projectName
        }
      },
      {
        currentName: "src/App.java",
        newName: `src/main/java/${directoryGroupId}/App.java`,
        data: {
          groupId: this.answers.groupId
        }
      },
      {
        currentName: "src/AppTest.java",
        newName: `src/test/java/${directoryGroupId}/AppTest.java`,
        data: {
          groupId: this.answers.groupId
        }
      },
    ];

    templates.forEach(el => {
      this.useTemplate(el.currentName, `${this.answers.projectName}/${el.newName}`, el.data);
    });
  }
}
