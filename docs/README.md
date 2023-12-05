# Csgo Nade App

<p style="text-align: center">
An application for teams and users the create and share csgo strategies
</p>

<a href="https://csgostrats.com/" target="_blank">
  <img src="../assets/images/home_page.PNG" alt="Home page" />
</a>

## 📕 About

_The current state of the application is hosted at: <a href="https://csgostrats.com/" target="_blank">https://csgostrats.com/</a>_

The concept revolves around players developing strategies using various nade sets. These strategies can be shared either publicly with the community or privately within a specific team. When viewing a strategy, the map's radar is shown, indicating all the nades thrown as part of the strategy. By clicking on the nade, users can see images of lineups and landing points of each grenade. Additionaly, strategies can include descriptions describing what actions each player should execute.

## 🤝 Contribution

Any contribution are greatly appreciated. Please refer to the [contribution guide](./CONTRIBUTING.md) for detailed instructions on how to contribute to this project.

## 🎬 Getting started

### Prerequisite

- Node: 18.13.0
- Docker
- Supabase CLI

### Steps

1. Clone repo

2. Start local supabase server (make sure docker dameon is running)

```
npx supabase start
```

4. Add env file, _see .env.example for list of all variables needed_
5. Install dependencies

```
npm install
```

6. Run application

```
npm run dev
```

**Note:** When running locally, the db is automatically populated with two test users. Their login credentials are:

|User|Email|Password|
|--|--|--|
|Test User 1|test1@gmail.com|#TestUser123|
|Test User 2|test2@gmail.com|#TestUser123|


## 💻 Supabase commands

For a list of useful Supabase commands, refer to the [Supabase Cheatsheet](./supabase-cheatsheet.md).
