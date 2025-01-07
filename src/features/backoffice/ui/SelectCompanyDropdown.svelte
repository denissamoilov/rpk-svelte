<script lang="ts">
  import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger, Button } from '$components';
  import { ChevronDown } from 'lucide-svelte';

  let selectedCompany = $state(null);
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="gray" rightIcon={ChevronDown}>
      Select company
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent side="bottom" align="start" sideOffset={8}>
    <DropdownMenuGroup>
      <DropdownMenuItem>UpApp OÜ</DropdownMenuItem>
      <DropdownMenuItem>Raamatupidamiskeskus OÜ</DropdownMenuItem>
      <DropdownMenuItem>Dial OÜ</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>