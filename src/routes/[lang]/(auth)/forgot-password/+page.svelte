<script lang="ts">
  import ForgotPasswordForm from "$features/auth/ui/ForgotPasswordForm.svelte";
  import { t } from "$lib/translations";

</script>

<h1 class="text-heading-1 text-center mb-6">{$t("auth.forgotPassword.title")}</h1>
<ForgotPasswordForm />