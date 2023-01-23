# CSGO Nade Application

A web app displaying a list of strats for each map in the competitive map pool, along with videos of how to throw the nades required in the strat.

## Project Structure

```
├── backend                                 # API
│   └── src
│       └── main
│           ├── java/no/edvardse/backend    # source code
│           └── resources                   # app properties etc...
│
├── sveltekit                               # frontend application
│   ├── src                                 # source code
│   └── src                                 # static elements, like assets etc...
│
└── frontent                                # DEPRECATED: Old frontend, soon to be removed
```

## Getting started

### Prerequisite

- Java 17
- Maven 3.6.3
- Node v14.21.1

### Back-end

**Step 1:**

From terminal run:

```
mvn spring-boot:run
```

_Optionally if you're using vs code; install spring boot extension and run from vscode interface_

### Front-end

**Use `sveltekit` for frontend. The `frontend` project used svelte and is depricated. It will soon be deleted.**

**Step 1:**

Add `.env` file to root of frontend directory with variables:

- `VITE_API_BASE_URL`

_look `frontend -> .env.example` for reference_

**Step 2:**

From terminal run:

```
npm run dev
```
