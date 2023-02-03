import * as vscode from 'vscode';
import { CustomTaskTerminal } from './custom-task-terminal';

export class Commands {
    public async activate(context: vscode.ExtensionContext): Promise<void> {
        context.subscriptions.push(
            vscode.commands.registerCommand('web-extension-tasks.runTask', async () => this.runTask()),
            vscode.commands.registerCommand('web-extension-tasks.showText', async () => this.showText())
        );
    }

    protected async runTask(): Promise<void> {
        const text = await vscode.window.showInputBox({
            value: 'hello'
        });

        if (!text) {
            return;
        }

        const definition = {
            label: 'text-task',
            type: 'web-extension-tasks.text-task',
            text,
        };

        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            definition.label,
            definition.type,
            new vscode.CustomExecution(async resolved => new CustomTaskTerminal(resolved.text, true))
        );

        vscode.tasks.executeTask(task);
    }

    protected async showText(): Promise<void> {
        const text = await vscode.window.showInputBox({
            value: 'howdy'
        });

        if (!text) {
            return;
        }

        const pty = new CustomTaskTerminal(text);
        const term = vscode.window.createTerminal({ name: 'Text', pty });
        term.show();
    }
}
