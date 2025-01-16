<script lang="ts">
  import { Input, Button } from "$components";
  import { Alert, AlertDescription, AlertTitle } from "$components/alert";
  import { companyStore } from "$lib/stores/company";

  export let companyId: number;
  
  let name = '';
  let email = '';
  let address = '';
  let isLoading = false;
  let error: string | null = null;
  let success = false;

  // Subscribe to selected company
  $: if ($companyStore.selectedCompany) {
    name = $companyStore.selectedCompany.name;
    email = $companyStore.selectedCompany.email;
    address = $companyStore.selectedCompany.address;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    isLoading = true;
    success = false;
    error = null;

    try {
      const result = await companyStore.updateCompany(companyId, {
        name,
        email,
        address
      });

      if (result) {
        success = true;
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to update company';
    } finally {
      isLoading = false;
    }
  }
</script>

<form class="flex flex-col gap-4" on:submit={handleSubmit}>
  {#if error}
    <Alert variant="error">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  {/if}

  {#if success}
    <Alert variant="success">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Company details updated successfully</AlertDescription>
    </Alert>
  {/if}

  <Input
    type="text"
    label="Company Name"
    placeholder="Enter company name"
    bind:value={name}
    required
  />

  <Input
    type="email"
    label="Email"
    placeholder="Enter company email"
    bind:value={email}
    required
  />

  <Input
    type="text"
    label="Address"
    placeholder="Enter company address"
    bind:value={address}
    required
  />

  <Button type="submit" disabled={isLoading}>
    {isLoading ? 'Updating...' : 'Update Company'}
  </Button>
</form> 