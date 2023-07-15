import { Background } from "../models/background";

export class SetLevelSeed {
    static readonly type = '[App] Set Seed';
    constructor(public seed: number) { }
}

export class SetBackground {
    static readonly type = '[App] Set Background';
    constructor(public background: Background) { }
}