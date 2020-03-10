import {Action} from '@ngrx/store';

export const AUTHENTICATION_SUCCESS='AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAIL='AUTHENTICATION_FAIL';
export const LOG_OUT='LOG_OUT';

export const LOGIN_START='LOGIN_START';

export const CLEAR_ERROR='CLEAR_ERROR';

export const SIGNUP_START='SIGNUP_START';
export const AUTO_LOGIN='AUTO_LOGIN';


export class AuthenticationSuccess implements Action{
    readonly type=AUTHENTICATION_SUCCESS;
    constructor(public payload:{email:string,userId:string,token:string,expirationDate:Date,redirect:boolean}){

    }
}


export class AuthenticateFail implements Action {
    readonly type=AUTHENTICATION_FAIL;
    constructor(public payload:string){

    }
}


export class Signup implements Action {
    readonly type=SIGNUP_START;
    constructor(public payload:{email:string,password:string}){

    }
}

export class LogOut implements Action {
    readonly type=LOG_OUT;
    constructor(){}
}

export class LoginStart implements Action {
    readonly type=LOGIN_START;
    constructor(public payload:{email:string,password:string}){

    }
}


export class AutoLogin implements Action {
    readonly type=AUTO_LOGIN;
    constructor(){

    }
}

export class ClearError implements Action {
    readonly type=CLEAR_ERROR;
    constructor(){

    }
}

export type AuthActions=AuthenticationSuccess |
AuthenticateFail |Signup |LogOut |LoginStart |AutoLogin |ClearError;