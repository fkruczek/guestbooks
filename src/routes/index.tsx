import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Link } from "~/components/link";
import { createDbClient } from "~/database";

export const useGetGuestbooks = routeLoader$(async (requestEv) => {
  const db = createDbClient(requestEv);
  const { data } = await db.from("guestbooks").select("email,id,name");
  return data || [];
});

export default component$(() => {
  const guestbooks = useGetGuestbooks();

  return (
    <section class="grid">
      <h1 class="text-xl my-2">Created guestbooks:</h1>
      {guestbooks.value.length === 0 && <div>No guestbooks created yet</div>}
      <ul class="grid gap-2">
        {guestbooks.value.map(({ id, name }) => (
          <li key={id}>
            <a href={`/guestbooks/${id}`} class="text-amber-900 text-xl">
              {name}
            </a>
          </li>
        ))}
      </ul>
      <div class="mt-10">
        <Link href="/create-guestbook"> Create new guestbook </Link>
      </div>
    </section>
  );
});
