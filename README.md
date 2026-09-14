# Task & Products API — Labs 7 & 8

Express.js backend combining two lab exercises:

- **Lab 7** — Task API backed by MongoDB via Mongoose (`/api/tasks`).
- **Lab 8** — Products API with an in-memory store, routes/controllers/middleware
  structure (`/api/products`).

## Project structure

```
config/
  db.js                     Mongoose connection (used by the Task API)
controllers/
  taskControllers.js         Task business logic (Mongoose + express-async-handler)
  productController.js       Product business logic (in-memory)
models/
  taskModel.js                Mongoose schema for Task
routes/
  taskRoutes.js                /api/tasks routes
  productRoutes.js             /api/products routes
middleware/
  errorMiddleware.js            centralized error handling
postman/
  Products-API.postman_collection.json
server.js                       Express app entry point
.env                             PORT, NODE_ENV, MONGO_URI (not committed)
```

## Installation

```bash
npm install
```

Create a `.env` file in the project root:

```
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/task
```

`MONGO_URI` can point at a local MongoDB instance or a MongoDB Atlas cluster —
either way, `config/db.js` connects with Mongoose on startup.

## Running

```bash
npm run dev     # nodemon, auto-restarts on change
# or
npm start       # node server.js
```

On success you'll see `Server listening on <port>` and `MongoDB connected`.

## Task API (Lab 7)

Base URL: `http://localhost:5001/api/tasks`

| Method | Route  | Body                     | Description        |
|--------|--------|---------------------------|----------------------|
| GET    | `/`    | —                          | List all tasks       |
| POST   | `/`    | JSON with `text` (required)| Create a task        |
| PUT    | `/:id` | JSON with fields to update  | Update a task        |
| DELETE | `/:id` | —                          | Delete a task        |

Tasks are persisted in MongoDB through the `Task` Mongoose model
(`models/taskModel.js`). `POST` without `text` responds `400`; updating or
deleting an unknown `:id` also responds `400` with `Task not found`.

## Products API (Lab 8)

Base URL: `http://localhost:5001/api/products`

| Method | Route                | Body                          | Description             |
|--------|-----------------------|--------------------------------|--------------------------|
| GET    | `/`                   | —                              | List all products        |
| GET    | `/search?q=term`      | —                              | Search by name/category  |
| GET    | `/:id`                | —                              | Get a single product     |
| POST   | `/`                   | JSON with `name` (required)    | Create a product         |
| PUT    | `/:id`                | JSON with fields to update      | Update a product         |
| DELETE | `/:id`                | —                              | Delete a product         |

Products are kept in an in-memory array (no database), as required by Lab 8.

### Validation

- `POST /api/products` requires `name`, otherwise responds `400`.
- `price` (if provided) must be greater than `0`, otherwise `400`.
- `stock` (if provided) must be `>= 0`, otherwise `400`.
- Requests for a product `:id` that doesn't exist respond `404`.

### Example — create a product

```bash
curl -X POST http://localhost:5001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Dell XPS 15","price":1499.99,"category":"Electronics","stock":12}'
```

## Testing with Postman

Import [`postman/Products-API.postman_collection.json`](postman/Products-API.postman_collection.json)
into Postman. It includes a `baseURL` collection variable and one request per
Products endpoint, plus a validation-failure example (`POST` without `name`).
