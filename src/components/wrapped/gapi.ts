export async function isLoggedIn(): Promise<boolean> {
   // $gapi
  // @ts-ignore
  return gapi.auth2.getAuthInstance().isSignedIn.get()
}

export async function getAuthToken(): Promise<string> {
  if (await isLoggedIn()) {
    console.log('getting token');
    // @ts-ignore
    return (gapi as any).auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
  } else {
    console.error('token not present, redirecting to /login');
    window.location.replace('/login');
    return 'NOT SIGNED IN YET MATE';
  }
}

export async function requireNotLoggedIn(): Promise<void> {

  if (await isLoggedIn()) {
    console.error('already logged in, redirecting to /');
    window.location.replace('/');
  }
  console.log("NOT LOGGED IN YET")
}

export async function login(): Promise<void> {
  await requireNotLoggedIn();
  console.log('trying to log in');

  // @ts-ignore
  const signInResult: Promise<void> = gapi.auth2.getAuthInstance().signIn();
  try {
    await signInResult;
  } catch (error) {
    console.error(error);
    if (error && error.error == 'popup_blocked_by_browser') {
      // A popup has been blocked by the browser
    } else {
      console.log("WHO KNOWS WHY ITS NOT WORKING")
    }
  }
  console.log('are we logged in?', await isLoggedIn())
  window.location.replace('/');
}

export async function logout(){
  // @ts-ignore
  const auth2 = await gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }
