<script lang="ts">
  import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger, Avatar, AvatarFallback } from '$components';
  import { userStore } from '$lib/stores/user';
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
    </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent side="bottom" align="start" sideOffset={8}>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem on:click={() => userStore.logout()}>Logout</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>