import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Link } from "~/components/link";

export const useGetGuestbook = routeLoader$(async ({ params, status }) => {
  const guestbookId = parseInt(params["guestbookId"], 10);
  const prisma = new PrismaClient();
  const guestbook = await prisma.guestbook.findUnique({
    where: { id: guestbookId },
    include: { entries: true },
  });
  if (!guestbook) {
    status(404);
  }
  return guestbook;
});

export default component$(() => {
  const guestbook = useGetGuestbook();

  if (!guestbook.value) {
    throw new Error("Guestbook not found");
  }

  return (
    <section>
      <div class="my-6 bg-purple-100 p-2">
        <h1 class="text-xl">Guestbook: {guestbook.value.name} </h1>
        <p>Created by: {guestbook.value.email}</p>
      </div>
      <ul>
        {guestbook.value.entries.map((entry, index) => (
          <li key={entry.id} class="my-2 bg-green-100 p-2">
            <p>Entry {index + 1}:</p>
            <div class="ml-2">
              <p>Name: {entry.name}</p>
              <p>Email: {entry.email}</p>
              <p>Message: {entry.message}</p>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <Link href={"/create-entry/" + guestbook.value.id}> Add new entry</Link>
      </div>
    </section>
  );
});
