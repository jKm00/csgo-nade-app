<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { mode, setMode } from 'mode-watcher'

    let theme = $mode === 'dark'

    $: {
        setMode(theme ? 'dark' : 'light')
    }
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Theme</Card.Title>
        <Card.Description>Choose the theme for your account</Card.Description>
    </Card.Header>
    <Card.Content>
        <div class="flex items-center gap-2">
            <Switch bind:checked={theme} id="theme-switch" />
            <Label for="theme-switch">{theme ? 'Dark mode' : 'Light mode'}</Label>
        </div>
    </Card.Content>
</Card.Root>
