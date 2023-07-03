import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, Link } from "@remix-run/react";
import { checkSessionCookie, signUp } from "~/firebase/auth.server";
import { commitSession, getSession } from "~/sessions";
import SignUpForm from "~/components/SignUpForm/SignUpForm";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("cookie"));
  const { uid } = await checkSessionCookie(session);
  const headers = {
    "Set-Cookie": await commitSession(session),
  };
  if (uid) {
    return redirect("/", { headers });
  }
  return json(null, { headers });
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const formError = json({ error: "Please fill all fields!" }, { status: 400 });
  if (typeof name !== "string") return formError;
  if (typeof email !== "string") return formError;
  if (typeof password !== "string") return formError;
  try {
    const sessionCookie = await signUp(name, email, password);
    const session = await getSession(request.headers.get("cookie"));
    session.set("session", sessionCookie);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error(error);
    return json({ error: String(error) }, { status: 401 });
  }
};

const btnStyles =
  "block p-3 border border-1 rounded-lg font-bold bg-white text-blue-600 hover:bg-gray-200";

export default function Join() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="p-3">
      <h1 className="text-3xl">Registro</h1>
      {actionData?.error ? <p>{actionData.error}</p> : null}
      <SignUpForm
        moreActions={
          <Link to="/login" className={btnStyles}>
            Iniciar sesión
          </Link>
        }
      ></SignUpForm>
    </div>
  );
}
