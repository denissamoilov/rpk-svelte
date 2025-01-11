<script lang="ts">
  import { Button } from "$components";
  import { 
    PlusIcon, 
    ReceiptIcon,        // for Sales Invoices
    ShoppingCartIcon,   // for Orders
    RepeatIcon,         // for Recurring Invoices
    FileMinusIcon,      // for Credit Notes
    FileTextIcon,       // for Customer Statements
    ChartAreaIcon,     // for Reports

  } from "lucide-svelte";
  import type { ComponentType } from 'svelte';

  let subPages: {
    title: string;
    description: string;
    icon: ComponentType;
  }[] = [
    {
      title: "Sales Invoices",
      description: "Create and manage sales invoices for your customers",
      icon: ReceiptIcon,
    },
    {
      title: "Orders",
      description: "Track customer orders and their fulfillment status",
      icon: ShoppingCartIcon
    },
    {
      title: "Recurring Invoices",
      description: "Set up automated recurring invoices for regular customers",
      icon: RepeatIcon,
    },
    {
      title: "Credit Notes",
      description: "Issue and manage credit notes for returns or adjustments",
      icon: FileMinusIcon,
    },
    {
      title: "Customer Statements",
      description: "Generate and send statements to your customers",
      icon: FileTextIcon,
    },
    {
      title: "Reports",
      description: "View sales analytics and generate detailed reports",
      icon: ChartAreaIcon,
    },
  ];
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-semibold">Sales</h1>
      <p class="text-muted-foreground">Manage your sales invoices, orders, and transactions</p>
    </div>
    <Button leftIcon={PlusIcon}>
      New Invoice
    </Button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each subPages as page}
      <div class="p-4 rounded-md border bg-card">
        <h5 class="mb-2 flex items-center gap-3">
          <span class="shrink-0">
            <svelte:component this={page.icon} size={20} />
          </span>
          {page.title}
        </h5>
        <p class="text-sm text-muted-foreground">{page.description}</p>
      </div>
    {/each}
  </div>
</div>