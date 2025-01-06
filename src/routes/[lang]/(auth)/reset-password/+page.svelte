<script lang="ts">
  import ResetPasswordForm from "$features/auth/ui/ResetPasswordForm.svelte";
  import { t } from "$lib/translations";

</script>

<h1 class="text-heading-1 text-center mb-6">{$t("auth.resetPassword.title")}</h1>
<ResetPasswordForm />