import * as vscode from 'vscode';
import { Commands } from '../commands';
import { TextTaskProvider } from '../text-task-provider';

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {
    const taskProvider = new TextTaskProvider();
    const commands = new Commands();

    await taskProvider.activate(context);
    await commands.activate(context);
};

export const deactivate = async (): Promise<void> => {
    // Do nothing for now
};
