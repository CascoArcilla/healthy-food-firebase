import { json, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions";
import { signIn, signInWithToken } from "~/firebase/auth.server";

export async function getSessionCookieHeader(
  cookie: string | null | undefined,
): Promise<HeadersInit | undefined> {
  const session = await getSession(cookie);

  return {
    "Set-Cookie": await commitSession(session),
  };
}

export async function login(request: Request) {
  const form = await request.formData();
  const idToken = form.get("idToken");
  const headers = request.headers;

  try {
    return await loginSetSessionAndRedirectWithCookie(form, idToken, headers);
  } catch (error) {
    console.error(error);
    return json({ error: String(error) }, { status: 401 });
  }
}

async function loginSetSessionAndRedirectWithCookie(
  form: FormData,
  idToken: FormDataEntryValue | null,
  headers: Headers,
) {
  const sessionCookie = await loginWithTokenOrEmailPassword(form, idToken);
  const session = await getSession(headers.get("cookie"));
  session.set("session", sessionCookie);
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

async function loginWithTokenOrEmailPassword(
  form: FormData,
  idToken: FormDataEntryValue | null,
) {
  if (typeof idToken === "string") {
    return await signInWithToken(idToken);
  } else {
    const email = form.get("email");
    const password = form.get("password");
    const formError = json(
      { error: "¡Por favor, llena todos los campos!" },
      { status: 400 },
    );
    if (typeof email !== "string") return formError;
    if (typeof password !== "string") return formError;

    return await signIn(email, password);
  }
}
