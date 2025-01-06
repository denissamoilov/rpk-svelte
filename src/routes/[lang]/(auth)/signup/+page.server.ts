import { signupSchema } from "$features";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
export const load = async () => {
  const form = await superValidate(zod(signupSchema));

  return { form };
};
