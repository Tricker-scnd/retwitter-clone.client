export enum LoadingState{
    LOADED = 'LOADED',
    ERROR = 'ERROR',
    NEVER = 'NEVER'
}

export interface Tweet{
    text: string;
    user:{
        userName: string;
        login: string;
        avatarUrl:string;
    }
}

export interface TweetsState{
    items: Tweet[];
    loadingState: LoadingState;
}