<script lang="ts">
  export let data;
  $: ({ session } = data);
</script>

<div class="w-default">
  <div class="max-w-[80ch] leading-7">
    <section class="mb-10">
      <h1 class="text-primary text-3xl font-bold mb-4">CSGO Strats - Guide</h1>
      <p>
        Welcome to the CSGO Strats help guide. This resource is designed to
        assist you in making the most of our web application, enabling you to
        explore, create, and collaborate on Counter-Strike: Global Offensive
        strategies with the community. Below, you'll find a comprehensive guide
        on various actions you can take within the application.
      </p>
    </section>
    <section class="mb-10">
      <h2 class="font-bold text-xl mb-4">Explore Strategies</h2>
      <p class="mb-4">
        Discovering strategies shared by fellow community members is a great way
        to enhance your gameplay. To explore existing strategies:
      </p>
      <ol class="list-decimal ml-4 grid gap-2">
        <li>Navigate to the home page and select a map of your choice.</li>
        <li>Browse through the list of available strategies.</li>
        <li>
          Utilize filters to refine your search and find strategies tailored to
          your preferences.
        </li>
      </ol>
    </section>
    <section class="mb-10">
      <h2 class="font-bold text-xl mb-4">Create Your First Strat</h2>
      <p class="mb-4">
        Creating and sharing your own strategies is at the heart of CSGO Strats.
        Follow these steps to create your first strat:
      </p>
      <ol class="list-decimal ml-4 grid gap-6">
        <li>
          <span class="font-bold">Account Creations:</span> If you don't have an
          account yet, go to the
          <a class="underline" href="/login">login page</a>
          and sign up using your GitHub or Discord account. Alternatively, you can
          register a new account via the
          <a class="underline" href="/register">registration page</a>.
        </li>
        <li>
          <span class="font-bold">Initiating Strategy Creation:</span> Once logged
          in, you'll notice a "+" icon in the top right corner. Click on it and choose
          "Create Strat."
        </li>
        <li>
          <span class="font-bold">Strategy Details:</span> Provide essential information
          about your strategy, such as its name, the map it applies to. Proceed to
          the next step.
        </li>
        <li>
          <span class="font-bold">Map Editor:</span> You'll be taken to the map editor,
          which consists of the map on the left and an input area on the right. Click
          on the map to add a new nade to the strat. On the right, enter details
          and upload images related to the nade.
        </li>
        <li>
          <span class="font-bold">Adding Nades:</span> Continue adding grenades to
          your strategy using the same process. Once you've added all the necessary
          grenades, proceed to the next step.
        </li>
        <li>
          <span class="font-bold">Strategy Overview:</span> Review your strategy's
          overview, ensuring all information is accurate. If everything checks out,
          click "Submit" to create your strategy.
        </li>
        <li>
          <span class="font-bold">Viewing Your Strategy:</span> Your newly
          created strategy will now be accessible on your
          {#if session}
            <a class="underline" href={`/users/${session.user.id}`}
              >profile page</a
            >
          {:else}
            profile page
          {/if}
          and in the <a class="underline" href="/strats">strat exploration</a> section.
          Remember that if you set the strategy as private, only you will have access
          to it.
        </li>
      </ol>
    </section>
    <section class="mb-10">
      <h2 class="font-bold text-xl mb-4">Creating Teams</h2>
      <p class="mb-4">
        Collaborating with fellow community members through teams can elevate
        your strategizing experience. Here's how to create and manage teams:
      </p>
      <ol class="list-decimal ml-4 grid gap-6">
        <li>
          <span class="font-bold">Team Creation:</span> Click the "+" icon in the
          top right corner and choose "Create Team." Provide the team's name, organization,
          and your role within the team.
        </li>
        <li>
          <span class="font-bold">Team Management:</span> Once the team is created,
          you'll be directed to the team page. Invite other members by clicking "Invite
          Member" and entering their usernames.
        </li>
        <li>
          <span class="font-bold">Team Strategies:</span> Any strategy associated
          with the team will be displayed on the team page. Keep in mind that private
          strategies are visible only to team members.
        </li>
        <li>
          <span class="font-bold">Accessing Team Page:</span> Easily access the
          team page by visiting
          {#if session}
            <a class="underline" href={`/users/${session.user.id}`}
              >your profile</a
            >,
          {:else}
            your profile,
          {/if}
          where you'll find a list of teams you're a part of. Click on a team to
          navigate to its dedicated page.
        </li>
      </ol>
    </section>
    <section>
      <h2 class="font-bold text-xl mb-4">Navigating the Map Editor</h2>
      <p class="mb-4">
        The map editor is a fundamental tool for creating strategies. Here's how
        to make the most of it:
      </p>
      <ol class="list-decimal ml-4 mb-4 grid gap-6">
        <li>
          <span class="font-bold">Placing Nades:</span> Click on the map to add a
          new nade to a strat. The input area on the right will update with details
          for the selected grenade.
        </li>
        <li>
          <span class="font-bold">Editing and Moving Nades:</span> Click on an existing
          grenade to update its details on the right side. You can also click and
          drag grenades to adjust their positions on the map.
        </li>
      </ol>
      <p>
        Feel free to experiment and perfect your strategies using the map
        editor's features.
      </p>
    </section>
  </div>
</div>
