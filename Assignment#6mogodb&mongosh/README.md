# Assignment 7 — Modular Monolith (Express + MongoDB)

This project implements all 19 assignment requirements from the supplied PDF using a **modular monolith**: one Node.js/Express application and one MongoDB database, organized into cohesive internal modules.

## Architecture

```text
server.js
└── src/
    ├── config/
    │   └── database.js
    ├── modules/
    │   ├── books/        # book routes, controller, service
    │   ├── collections/ # collection creation and title index
    │   └── logs/         # log routes, controller, service
    └── shared/
        ├── middleware/   # centralized 404/error handling
        └── utils/        # async route wrapper
```

Each module owns its routes, controllers, and business/database operations. Modules run in the same process and share a single database connection; this is not a microservices architecture.

## Requirements

- Node.js 18+ recommended
- MongoDB running locally or a MongoDB connection string
- Postman (optional, for endpoint testing)

## Run locally

1. Extract the ZIP.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env` and update values if needed.
4. Start MongoDB.
5. Run `npm run dev` (or `npm start`).
6. API base URL: `http://localhost:3000`.

The default database is `assignment7`.

## Important first-run notes

- Run `POST /collection/books` before inserting books. It creates the collection and enforces a non-empty string `title`.
- Run `POST /collection/logs/capped` before `POST /logs`. MongoDB cannot turn an existing ordinary collection into a capped collection in place. If `logs` already exists as a non-capped collection, rename or drop it manually before retrying.
- `POST /collection/authors` inserts `req.body` into `authors`, creating the collection implicitly. Example body: `{"name":"Author1","nationality":"British"}`.
- For `POST /books/batch`, send an array of at least three book objects, or `{ "books": [ ... ] }`.
- The `year-integer` endpoint uses MongoDB BSON `$type: "int"` exactly as the assignment requests. Values stored as BSON `long` or `double` are not included.
- `aggregate4` joins `books._id` to `logs.book_id`. The log module converts a valid 24-character hex string to an ObjectId so it can match a book `_id`. The supplied mongosh example inserts a log against the `Future` book if it exists.
- Assignment task 15 deletes data. Use it only when you intend to delete all matching books.

## Endpoints

| # | Method | Endpoint | Purpose |
|---|---|---|---|
| 1 | POST | `/collection/books` | Create/ensure books collection with title validator |
| 2 | POST | `/collection/authors` | Implicitly create authors by inserting body |
| 3 | POST | `/collection/logs/capped` | Create capped logs collection (1 MiB) |
| 4 | POST | `/collection/books/index` | Create ascending index on title |
| 5 | POST | `/books` | Insert one book |
| 6 | POST | `/books/batch` | Insert at least three books |
| 7 | POST | `/logs` | Insert a log |
| 8 | PATCH | `/books/Future` | Update Future year to 2022 |
| 9 | GET | `/books/title?title=Brave%20New%20World` | Find book by title |
| 10 | GET | `/books/year?from=1990&to=2010` | Find books in inclusive year range |
| 11 | GET | `/books/genre?genre=Science%20Fiction` | Find books by genre |
| 12 | GET | `/books/skip-limit` | Sort year descending, skip 2, limit 3 |
| 13 | GET | `/books/year-integer` | Find BSON integer year values |
| 14 | GET | `/books/exclude-genres` | Exclude Horror and Science Fiction |
| 15 | DELETE | `/books/before-year?year=2000` | Delete books before year |
| 16 | GET | `/books/aggregate1` | Match year > 2000 and sort descending |
| 17 | GET | `/books/aggregate2` | Match year > 2000; project title/author/year |
| 18 | GET | `/books/aggregate3` | Unwind genres |
| 19 | GET | `/books/aggregate4` | Lookup related logs |

## Example request bodies

### POST `/books`
```json
{
  "title": "BookA",
  "author": "Ali",
  "year": 1931,
  "genres": ["Fantasy", "Adventure"]
}
```

### POST `/books/batch`
```json
[
  { "title": "Future", "author": "George Orwell", "year": 2020, "genres": ["Science Fiction"] },
  { "title": "To Kill a Mockingbird", "author": "Harper Lee", "year": 1960, "genres": ["Classic", "Fiction"] },
  { "title": "Brave New World", "author": "Aldous Huxley", "year": 2006, "genres": ["Dystopian", "Science Fiction"] }
]
```

### POST `/logs`
```json
{
  "book_id": "REPLACE_WITH_A_BOOK_OBJECT_ID",
  "action": "borrowed"
}
```

### POST `/collection/authors`
```json
{ "name": "Author1", "nationality": "British" }
```

## MongoDB Shell solution

`mongosh-solutions.txt` contains corresponding shell commands for all 19 tasks. Run them in order in `mongosh`. Note that collection creation commands fail if the collection already exists; use the comments in the file to handle that case.

## Postman

Import `postman/Assignment-7-Modular-Monolith.postman_collection.json` into Postman. The collection contains named requests for every endpoint and example JSON bodies. Start the API before running requests.

## Assignment bonus

`bonus.js` contains the Roman to Integer solution as a separate file, as requested in the PDF.
