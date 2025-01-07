<script lang="ts">
 import { Button, Popover, PopoverContent, PopoverTrigger } from "$components";
  import { Bell } from "lucide-svelte";
</script>
 
<Popover portal={null}>
 <PopoverTrigger asChild let:builder>
  <Button builders={[builder]} variant="ghost" size="sm">
    <Bell class="size-4" />
  </Button>
 </PopoverTrigger>
 <PopoverContent class="w-80" align="end" side="bottom" sideOffset={8}>
    <h6 class="text-md font-bold">Notifications</h6>
    <p class="text-muted-foreground text-sm">
     There's no notifications yet.
    </p>
 </PopoverContent>
</Popover>