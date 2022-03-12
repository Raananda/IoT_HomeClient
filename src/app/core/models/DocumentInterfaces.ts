export interface IDesired {
}

export interface IReported {
}

export interface IDelta {
}

export interface IState {
    desired: IDesired;
    reported: IReported;
    delta: IDelta;
}

export interface IDeviceShadowDocument
{
    state: IState;
    version: number;
    timestamp: number;
}

