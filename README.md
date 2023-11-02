## Resume Builder (WIP)

This is an interview project for showcasing my skill level in the following
front-end areas/tools: CSS, Redux, Formik, React custom hooks and React-Router.

Some of the technologies are kind of new to me and I needed to check out their
documentation before I could start implementing them which slowed me down a
little, those tools are: Redux/Redux-toolkit, Formik, Yup (needed by Formik for
type safety) and json-server.

## Tech Stack

### Front-End

- React
- React-router
- Redux and Redux-toolkit
- Formik (for easier react forms)
- Yup (runtime type validator like Zod)
- Lucide-react (icons)
- React-toastify (easy notifications)
- React-tooltip (easy tooltips)

### Back-End

- json-server (with-batteries-included API)

## How to setup

After cloning the repository, you'll find two directories (client and server),
you'll have to install npm packges on both of them.

After entering the client directory, type:

```bash
pnpm i && pnpm dev
```

In another terminal, after entering the server directory, type:

```bash
pnpm i && pnpm start
```

If you don't have `pnpm` run `npm install -g pnpm`, although installing the
packages with `npm` is not harmful if you know what you're doing.

## Scaffold of the app

![scaffold](https://github.com/anasouardini/resumeBuilder/assets/114059811/6e3a272d-2643-47da-8960-3abe503e2f51)
