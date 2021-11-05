type GetAuthTokenFunction = () => string;

export function getAuthToken ():string {
    // @ts-ignore
    return (gapi as any).auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
}