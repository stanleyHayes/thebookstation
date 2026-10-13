# thebookstation

thebookstation is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `authentication`, `books`, `categories`, `comments`, `likes`, `reviews`, `book`, `category`, `comment`, `like`.

## Repository layout

- `src/` — 23 tracked file(s); source examples: `src/config/keys.js`, `src/controllers/v1/authentication.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/thebookstation.git
cd thebookstation
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon src/index.js`).
- `npm run start` — runs the declared `start` script (`node src/index.js`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [src/config/keys.js](src/config/keys.js)
- [src/controllers/v1/authentication.js](src/controllers/v1/authentication.js)
- [src/controllers/v1/books.js](src/controllers/v1/books.js)
- [src/controllers/v1/categories.js](src/controllers/v1/categories.js)
- [src/controllers/v1/comments.js](src/controllers/v1/comments.js)
- [src/controllers/v1/likes.js](src/controllers/v1/likes.js)
- [src/controllers/v1/reviews.js](src/controllers/v1/reviews.js)
- [src/index.js](src/index.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
