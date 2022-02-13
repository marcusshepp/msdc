export class PointerUser {
    public currentPointValue?: number;
    constructor(public name: string) { }
    public get hasVoted(): boolean {
        return !!this.currentPointValue;
    }
}

export interface PointerStorage {
    name?: string;
}