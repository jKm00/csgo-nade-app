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
└── sveltekit                               # frontend application
    ├── src                                 # source code
    └── static                              # static elements, like assets etc...
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

**Step 1:**

Add `.env` file to root of `sveltekit` directory with variables:

- `VITE_API_BASE_URL=url-to-local-api`

_look `frontend -> .env.example` for reference_

**Step 2:**

From terminal run:

```
npm run dev
```

## Feedback

If you have any suggestions or comments, kindly open a new issue and provide a detailed description of your feedback.

[Give feedback](https://github.com/jKm00/csgo-nade-app/issues)

## Contribution

If you wish to make contributions to the project, kindly fork the repository, make the desired modifications, and submit a pull request to incorporate your changes.

### Support Me

<a href="https://www.buymeacoffee.com/joakimedvam">:coffee: Buy me a coffee</a>
