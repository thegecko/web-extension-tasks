import * as vscode from 'vscode';

const TASK_NAME = 'second';

export class Commands {
    public async activate(context: vscode.ExtensionContext): Promise<void> {
        context.subscriptions.push(
            vscode.commands.registerCommand('web-extension-tasks.runTask', async () => this.runTask())
        );
    }

    protected async runTask(): Promise<void> {
        const tasks = await vscode.tasks.fetchTasks();
        let task = tasks.find(t => t.name === TASK_NAME);

        if (task) {
            vscode.tasks.executeTask(task);
        } else {
            vscode.window.showErrorMessage(`no task found named ${TASK_NAME}`);
        }
    }
}
