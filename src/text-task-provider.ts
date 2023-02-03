import * as vscode from 'vscode';
import { CustomTaskTerminal } from './custom-task-terminal';

export interface TextTaskDefinition extends vscode.TaskDefinition {
    text: string;
}

export class TextTaskProvider implements vscode.TaskProvider {
    public static taskType = 'web-extension-tasks.text-task';

    public async activate(context: vscode.ExtensionContext): Promise<void> {
        context.subscriptions.push(
            vscode.tasks.registerTaskProvider(TextTaskProvider.taskType, this)
        );
    }

    public async provideTasks(): Promise<vscode.Task[] | undefined> {
        return [];
    }

    public resolveTask(task: vscode.Task): vscode.Task | undefined {
        if (task.definition.text) {
            const definition: TextTaskDefinition = <any>task.definition;

            return new vscode.Task(
                definition,
                task.scope ?? vscode.TaskScope.Workspace,
                definition.text,
                TextTaskProvider.taskType,
                new vscode.CustomExecution(async () => new CustomTaskTerminal(definition.text))
            );
        }

        return undefined;
    }
}
