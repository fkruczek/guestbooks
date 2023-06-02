import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import QRCode from "qrcode";
import { Button } from "~/components/button";
import { Link } from "~/components/link";
import { createDbClient } from "~/database";

export const useGetGuestbook = routeLoader$(async (requestEvent) => {
  const guestbookId = parseInt(requestEvent.params["guestbookId"], 10);

  const db = createDbClient(requestEvent);

  const { data: guestbook } = await db
    .from("guestbooks")
    .select("id,name,email,entries(*,guestbookId)")
    .eq("id", guestbookId)
    .limit(1)
    .single();

  if (!guestbook) {
    requestEvent.status(404);
  }

  return guestbook;
});

function generateQRCode(guestbookId: number) {
  return QRCode.toCanvas(
    window.location.origin + "/create-entry/" + guestbookId,
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
    return <div>Guestbook not found</div>;
  }

  return (
    <section>
      <div class="my-6 bg-purple-100 p-2">
        <h1 class="text-xl">Guestbook: {guestbook.value.name} </h1>
        <p>Created by: {guestbook.value.email}</p>
      </div>
      <Button onClick$={() => generateQRCode(guestbook.value.id)}>
        Generate QR code
      </Button>
      <div id="qr-code-container" />
      <ul>
        {guestbook.value.entries.map((entry, index) => (
          <li key={entry.id} class="my-2 bg-green-100 p-2">
            <p>Entry {index + 1}:</p>
            <div class="ml-2">
              <p>Email: {entry.email}</p>
              <p>Message: {entry.message}</p>
            </div>
          </li>
        ))}
      </ul>
      <div class="mt-2">
        <Link href={"/create-entry/" + guestbook.value.id}> Add new entry</Link>
      </div>
    </section>
  );
});
