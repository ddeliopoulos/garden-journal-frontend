type GetAuthTokenFunction = () => string;

const getAuthToken: GetAuthTokenFunction = () => {
    // @ts-ignore
    return (gapi as any).auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
}

export default {
    getAuthToken
};