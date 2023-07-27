import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, Form } from "@remix-run/react";
import type { UserRecord } from "firebase-admin/auth";
import { getLoggedUser } from "~/firebase/auth.server";
import { getPosts } from "~/firebase/models/posts.server";
import Card from "~/components/Card/Card";
import { mapPostsToIndex } from "~/mappers/_index/mapPostsToIndex";
import ButtonLink from "~/components/ButtonLink/ButtonLink";

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
    <>
      <h1>Bienvenido. {user?.displayName ? `${user.displayName}.` : ""} </h1>
      <ButtonLink
        to="verduras-frutas-semillas-etc-54321"
        color="orange"
        content="Ver publiación"
      />
      <section
        className="grid gap-2 mt-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {posts.map(({ id, ...rest }) => (
          <Card {...rest} key={id} className="flex flex-col justify-between" />
        ))}
      </section>
    </>
  );
}
