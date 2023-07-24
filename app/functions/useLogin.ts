import { useCallback, useState } from "react";
import * as firebaseRest from "~/firebase/firebase-rest";
import { useSubmit } from "@remix-run/react";
import app from "~/firebase/firebase.client";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import type { ActionData } from "~/types/login";

export default function useLogin(restConfig: any) {
  const [clientAction, setClientAction] = useState<ActionData>();
  const submit = useSubmit();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // To avoid rate limiting, we sign in client side if we can.
      const login = await firebaseRest.signInWithPassword(
        {
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
          returnSecureToken: true,
        },
        restConfig,
      );
      if (firebaseRest.isError(login)) {
        setClientAction({ error: login.error.message });
        return;
      }
      submit({ idToken: login.idToken }, { method: "post" });
    },
    [submit, restConfig],
  );

  async function onProviderSignIn(credentials: UserCredential) {
    const idToken = await credentials.user.getIdToken();
    submit({ idToken }, { method: "post" });
  }

  const onProviderLoginCallback = useCallback(onProviderSignIn, [submit]);

  function signInWithGoogle() {
    const clientAuth = getAuth(app);
    signInWithPopup(clientAuth, new GoogleAuthProvider())
      .then(onProviderLoginCallback)
      .catch((error: Error) => {
        console.log(error);
        alert(error.message);
      });
  }

  const loginWithGoogle = useCallback(signInWithGoogle, [
    onProviderLoginCallback,
  ]);

  function signInWithFacebook() {
    const clientAuth = getAuth(app);
    signInWithPopup(clientAuth, new FacebookAuthProvider())
      .then(onProviderLoginCallback)
      .catch((error: Error) => {
        console.log(error);
        alert(error.message);
      });
  }
  const loginWithFacebook = useCallback(signInWithFacebook, [
    onProviderLoginCallback,
  ]);

  return { handleSubmit, loginWithGoogle, loginWithFacebook, clientAction };
}
