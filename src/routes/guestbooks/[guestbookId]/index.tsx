import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { Link } from "~/components/link";

import QRCode from "qrcode";
import { prisma } from "~/prisma";

export const useGetGuestbook = routeLoader$(async ({ params, status }) => {
  const guestbookId = parseInt(params["guestbookId"], 10);
  const guestbook = await prisma.guestbook.findUnique({
    where: { id: guestbookId },
    include: { entries: true },
  });
  if (!guestbook) {
    status(404);
  }
  return guestbook;
});

function generateQRCode(guestbookId: number) {
  return QRCode.toCanvas(
    "http://localhost:5173/guestbooks/" + guestbookId,
    { errorCorrectionLevel: "H", width: 300 },
    function (err, canvas) {
      if (err) throw err;

      const container = document.getElementById("qr-code-container");
      if (!container) throw new Error("Container not found");
      container.appendChild(canvas);
    }
  );
}

export default component$(() => {
  const guestbook = useGetGuestbook();

  if (!guestbook.value) {
    throw new Error("Guestbook not found");
  }

  const guestbookId = guestbook.value.id;

  return (
    <section>
      <div class="my-6 bg-purple-100 p-2">
        <h1 class="text-xl">Guestbook: {guestbook.value.name} </h1>
        <p>Created by: {guestbook.value.email}</p>
      </div>
      <Button onClick$={() => generateQRCode(guestbookId)}>
        Generate QR code
      </Button>
      <div id="qr-code-container" />
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
      <div q:slot="asdf">asdf</div>
      <div>
        <Link href={"/create-entry/" + guestbookId}> Add new entry</Link>
      </div>
    </section>
  );
});
