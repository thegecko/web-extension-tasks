import * as vscode from 'vscode';

export class CustomTaskTerminal implements vscode.Pseudoterminal {

    private writeEmitter = new vscode.EventEmitter<string>();
    public onDidWrite: vscode.Event<string> = this.writeEmitter.event;
    private closeEmitter = new vscode.EventEmitter<number>();
    public onDidClose?: vscode.Event<number> = this.closeEmitter.event;

    public constructor(protected text: string, protected closeOnFinish = false) {
    }

    public async open(_initialDimensions: vscode.TerminalDimensions | undefined): Promise<void> {
        this.onOutput(this.text);
        if (this.closeOnFinish) {
            this.closeEmitter.fire(0);
        }
    }

    public close(): void {
        vscode.window.showInformationMessage('close');
    }

    public handleInput(data: string): void {
        vscode.window.showInformationMessage(`input: ${data}`);
    }

    public setDimensions(_dimensions: vscode.TerminalDimensions): void {
        vscode.window.showInformationMessage('resize');
    }

    private onOutput(message: string) {
        this.writeEmitter.fire(`${message}\n\r`);
    }
}
