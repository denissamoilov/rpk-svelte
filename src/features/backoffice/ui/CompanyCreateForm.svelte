<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Input, Button, Separator } from '$components';
  import { companyStore } from '$lib/stores/company';

  let name = '';
  let registrationNumber = '';
  let email = '';
  let address = '';
  let isLoading = false;
  let lang = $page.params.lang;

  async function handleSubmit() {
    isLoading = true;
    try {
      const company = await companyStore.createCompany({
        name,
        registrationNumber,
        email,
        address,
      });

      // Redirect after successful creation
      goto(`/${lang}/in/${company.id}`);
    } catch (error) {
      console.error('Failed to create company:', error);
    } finally {
      isLoading = false;
    }
  }
</script>

<form class="flex flex-col gap-6" on:submit={handleSubmit}>
  <div class="flex flex-col gap-4">
    <Input
      type="text"
      label="Company Name"
      placeholder="Enter company name"
      bind:value={name}
      required
    />

    <Separator label="or" />

    <Input
      type="text"
      label="Registration Number"
      placeholder="Enter company registration number"
      bind:value={registrationNumber}
      required
    />
  </div>

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
    {isLoading ? 'Creating...' : 'Create Company'}
  </Button>
</form>