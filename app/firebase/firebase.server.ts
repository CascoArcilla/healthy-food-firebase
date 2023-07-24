import {
  getApps as getServerApps,
  initializeApp as initializeServerApp,
  cert as serverCert,
} from "firebase-admin/app";
import { firestore as serverFirestore } from "firebase-admin";
import { getAuth as getServerAuth } from "firebase-admin/auth";

import * as firebaseRest from "./firebase-rest";

// Warning: though getRestConfig is only run server side, its return value may be sent to the client
export const getRestConfig = (): {
  apiKey: string;
  domain: string;
} => {
  if (process.env.NODE_ENV === "development" && !process.env.API_KEY) {
    return {
      apiKey: "fake-api-key",
      // Depending in your platform or containers, localhost can give you problems, so we use 127.0.0.1
      domain: "http://127.0.0.1:9099/identitytoolkit.googleapis.com",
    };
  } else if (!process.env.API_KEY) {
    throw new Error("Missing API_KEY environment variable");
  } else {
    return {
      apiKey: process.env.API_KEY,
      domain: "https://identitytoolkit.googleapis.com",
    };
  }
};
const restConfig = getRestConfig();

if (getServerApps().length === 0) {
  let config = {
    projectId: process.env.PROJECT_ID || "healhty-food-2023-2024",
  };
  if (process.env.NODE_ENV === "development" && !process.env.SERVICE_ACCOUNT) {
    console.warn(
      "Missing SERVICE_ACCOUNT environment variable, using local emulator",
    );
    // https://github.com/firebase/firebase-admin-node/issues/776
    // Use serveral environment variable for emulators

    // Use credential for emulators
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_EMULATORS || "{}",
    );
    config.credential = serverCert(serviceAccount);
  } else if (!process.env.SERVICE_ACCOUNT) {
    throw new Error("Missing SERVICE_ACCOUNT environment variable");
  } else {
    try {
      const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
      config.credential = serverCert(serviceAccount);
    } catch {
      throw Error("Invalid SERVICE_ACCOUNT environment variable");
    }
  }

  config.storageBucket =
    process.env.STORAGE_BUCKET || `${config.projectId}.appspot.com`;

  initializeServerApp(config);
  serverFirestore().settings({ ignoreUndefinedProperties: true });
}

const signInWithPassword = async (email: string, password: string) => {
  const signInResponse = await firebaseRest.signInWithPassword(
    {
      email,
      password,
      returnSecureToken: true,
    },
    restConfig,
  );

  if (firebaseRest.isError(signInResponse)) {
    throw new Error(signInResponse.error.message);
  }

  return signInResponse;
};

export const auth = {
  server: getServerAuth(),
  signInWithPassword,
};
