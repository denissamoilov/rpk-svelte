<script lang="ts">
  import { LoginForm } from "$features";
  import { t } from '$translations';
</script>

<div data-testid="login-page">
  <h1 class="text-heading-1 text-center mb-6" data-testid="login-title">{$t("auth.title")}</h1>
  <LoginForm />
</div>