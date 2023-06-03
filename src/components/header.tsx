import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import {
  useAuthSession,
  useAuthSignin,
  useAuthSignout,
} from "~/routes/plugin@auth";

export const Header = component$(() => {
  const session = useAuthSession();
  const signIn = useAuthSignin();
  const signOut = useAuthSignout();

  return (
    <header class="flex justify-between items-center p-2 bg-orange-100">
      <a href="/" class="mr-10 bg-sky-200 p-2">
        Home
      </a>
      {session.value?.user?.email ? (
        <div class="flex gap-2">
          {session.value.user.email}
          <Form action={signOut}>
            <button>Sign Out</button>
          </Form>
        </div>
      ) : (
        <Form action={signIn}>
          <button class="bg-rose-300 p-2">Sign In</button>
        </Form>
      )}
    </header>
  );
});
