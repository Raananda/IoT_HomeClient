import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppData } from '../../models/AppData';
import { AddAppData } from '../actions/app-data.actions';

export interface AppDataStateModel {
    appData: AppData;
}


@State<AppDataStateModel>({
    name: 'AppData',
    defaults: {
        appData: { userName: 'Default - Name' }
    }
})

@Injectable()
export class AppDataState {

    // Get state data
    @Selector()
    static getUserName(state: AppDataStateModel) {
        return state.appData.userName;
    }


    // Update state actions
    @Action(AddAppData)
    addUserName(ctx: StateContext<AppDataStateModel>, { payload }: AddAppData) {
        const state = ctx.getState();
        ctx.patchState({
            ...state,
            appData: { userName: payload.userName }
        });

    }


}