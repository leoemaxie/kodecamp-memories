# Memories API

API to post and view memories.

## Installation

1. Clone the repository.
2. Install the dependencies using the following command:

   ```shell
   npm install
   ```

## Usage

To start the server, run the following command:

```shell
    npm run start
```

## Endpoints

**/view**: To view all the memories. Optional query parameters: `id` to view a specific memory.

**/new**: To create a new memory.

- Required body parameters:

```json
{
  "id": "id of the memory",
  "content": "content of the memory"
}
```

- Schema:

```json
{
  "id": "string || number",
  "content": "string"
}
```
