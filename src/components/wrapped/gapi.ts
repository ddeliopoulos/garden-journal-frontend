const clientId = process.env.VUE_APP_CLIENT_ID
const scopes = process.env.VUE_APP_SCOPES

const googleInitialized = new Promise((resolve, reject) => {
    // @ts-ignore
    gapi.load('client:auth2', () => {
        // @ts-ignore
        gapi.client.init({
            apiKey: "",
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            clientId: clientId,
            scope: scopes,
        }).then(resolve)
            .catch(reject);
    });
});

export async function getBasicProfile() {
    await googleInitialized;
    // @ts-ignore
    const auth2 = gapi.auth2.getAuthInstance();
    // @ts-ignore
    return auth2.currentUser.get().getBasicProfile();
}

export async function isLoggedIn(): Promise<boolean> {
    await googleInitialized;

    // @ts-ignore
    return gapi.auth2.getAuthInstance().isSignedIn.get()
}

export async function getAuthToken(): Promise<string> {
    await googleInitialized;

    if (await isLoggedIn()) {
        // @ts-ignore
        return (gapi as any).auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
    } else {
        console.error('token not present, redirecting to /login');
        window.location.replace('/login');
        return 'NOT SIGNED IN YET MATE';
    }
}

export async function getAccessToken(): Promise<string> {
    await googleInitialized;

    if (await isLoggedIn()) {
        // @ts-ignore
        return (gapi as any).auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    } else {
        console.error('token not present, redirecting to /login');
        window.location.replace('/login');
        return 'NOT SIGNED IN YET MATE';
    }
}

export async function requireNotLoggedIn(): Promise<void> {
    await googleInitialized;
    if (await isLoggedIn()) {
        console.error('already logged in, redirecting to /');
        window.location.replace('/');
    }
}

export async function login(): Promise<void> {
    await googleInitialized;
    await requireNotLoggedIn();
    // @ts-ignore
    await gapi.auth2.getAuthInstance().signIn({scope: 'profile email', prompt: 'select_account'});
    console.log('logged in, redirecting to /');
    window.location.replace('/');
}

export async function logout() {
    await googleInitialized;
    // @ts-ignore
    await gapi.auth2.getAuthInstance().signOut();
    window.location.replace('/login')
}