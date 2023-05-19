# Csgo Nade App

An application for teams and users the create and share csgo strategies

## Getting started

### Prerequisite

- Node: 18.13.0
- Docker

### Steps

1. Clone repo
2. Log into supabase

```
npx supabase login
```

3. Start local supabase server

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

## Supabase cheatsheet

**Login to supabase CLI**

```
npx supabase login
```

**Start local supabase**

```
npx supabase start
```

**Stop local supabase**

```
npx supabase stop
```

**Create new migration**

```
npx supabase migration new [migration_name]
```

**Create migartion based on diff after editing from browser**

```
npx supabase db diff --use-migra -f [migration_name]
```

**Reset local db**

```
npx db reset
```

**Updating typescript types**

```
npx supabase gen types typescript --local > ./src/schema.ts
```

**Link to remote project**

```
npx supabase link --project-ref [project-id]
```

**Capture any changes made to remote database**

```
npx supabase db remote commit

# If you have not made any changes to the remote database, skip this step
```

**Deploy changes**

```
npx supabase db push
```
