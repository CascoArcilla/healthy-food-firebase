import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, Form } from "@remix-run/react";
import type { UserRecord } from "firebase-admin/auth";
import { getLoggedUser } from "~/firebase/auth.server";
import { getPosts } from "~/firebase/models/posts.server";
import Card from "~/components/Card/Card";
import { mapPostsToIndex } from "~/mappers/_index/mapPostsToIndex";

export async function loader({ request }: LoaderArgs) {
  const user: UserRecord | null = await getLoggedUser(request);
  const posts = await getPosts();

  return json({ user, posts: mapPostsToIndex(posts) });
}

export const action = async ({ request }: ActionArgs) => {
  const { uid } = await getLoggedUser(request);
  const form = await request.formData();
  console.log(form, uid);
};

export default function Index() {
  const loaderData = useLoaderData();
  const { user, posts } = loaderData;

  return (
    <div>
      <h1>Bienvenido. {user?.displayName ? `${user.displayName}.` : ""} </h1>

      <Link to="/publish" data-cy="btn-publish" className="mb-4">
        Publica tu comida sana
      </Link>

      <Link to="/login" className="mb-4">
        Inicio de sesión
      </Link>

      <section
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {posts.map(({ id, ...rest }) => (
          <Card {...rest} key={id} className="flex flex-col justify-between" />
        ))}
      </section>

      {user && (
        <Form method="post" action="/logout">
          <button type="submit" data-cy="btn-logout">
            Cerrar sesion
          </button>
        </Form>
      )}
    </div>
  );
}
