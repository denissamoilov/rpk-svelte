<script lang="ts">
  import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger, Avatar, AvatarFallback } from '$components';
  import { userStore } from '$lib/stores/user';
  import { authStore } from '$lib/stores/auth';
  import { ChevronDown } from 'lucide-svelte';
  console.log("user :: ", userStore.user())
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    <div class="flex items-center gap-2">
      <Avatar>
        <AvatarFallback>
          {userStore.user()?.name.charAt(0)}{userStore.user()?.surname.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <p class="text-neutral-100 text-sm">
        {userStore.user()?.name} {userStore.user()?.surname}
      </p>
      <ChevronDown size={16} />
    </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent side="bottom" align="end" sideOffset={8} class="w-56">
    <DropdownMenuGroup>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem on:click={() => authStore.logout()}>Logout</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>