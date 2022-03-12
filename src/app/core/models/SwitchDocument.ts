import { IDelta, IDesired, IDeviceShadowDocument, IReported, IState } from "./DocumentInterfaces";

export class SwitchDesired implements IDesired {
    powerOn!: boolean;
}

export class SwitchReported implements IReported {
    powerOn!: boolean;
}

export class SwitchDelta implements IDelta {
    powerOn!: boolean;
}

export class SwitchState implements IState {
    desired!: SwitchDesired;
    reported!: SwitchReported;
    delta!: SwitchDelta;
}


export class SwitchDeviceShadowDocument implements IDeviceShadowDocument {
    state!: SwitchState;
    version!: number;
    timestamp!: number;
}

