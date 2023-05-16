import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Link } from "~/components/link";

export const useGetGuestbooks = routeLoader$(async () => {
  const prisma = new PrismaClient();
  const users = await prisma.guestbook.findMany();
  return users;
});

export default component$(() => {
  const guestbooks = useGetGuestbooks();

  return (
    <section class="grid">
      <h1 class="text-xl my-2">Created guestbooks:</h1>
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
