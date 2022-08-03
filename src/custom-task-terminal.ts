import * as vscode from 'vscode';
import { TextTaskDefinition } from './text-task-provider';

export class CustomTaskTerminal implements vscode.Pseudoterminal {

    private writeEmitter = new vscode.EventEmitter<string>();
    public onDidWrite: vscode.Event<string> = this.writeEmitter.event;
    private closeEmitter = new vscode.EventEmitter<number>();
    public onDidClose?: vscode.Event<number> = this.closeEmitter.event;

    public constructor(protected definition: TextTaskDefinition) {
    }

    public async open(_initialDimensions: vscode.TerminalDimensions | undefined): Promise<void> {
        this.onOutput(this.definition.text);
        this.closeEmitter.fire(0);
    }

    public close(): void {
        // Stop and tidy up
    }

    private onOutput(message: string) {
        this.writeEmitter.fire(`${message}\n\r`);
    }
}
