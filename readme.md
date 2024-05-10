# Bloqit API

This project proposes an initial version of Bloqit API, that contains the Bloqs, Lockers and Rents entities represented as resources.

```graphql
enum RentStatus {
  CREATED
  WAITING_DROPOFF
  WAITING_PICKUP
  DELIVERED
}

enum RentSize {
  XS
  S
  M
  L
  XL
}

type Rent {
  id: String
  lockerId: string
  weight: number
  size: RentSize
  status: RentStatus
}

enum LockerStatus {
  OPEN
  CLOSED
}

type Locker {
  id: String
  bloqId: String
  status: LockerStatus
  isOccupied: bool
}

type Bloq {
  id: String
  title: String
  address: String
}
```

## API Endpoints

The API follows the REST guidelines to provide functionality over resources.

Bloqs

> * GET /bloqs
> * POST /bloqs

> * DELETE /bloqs/{id}
> * PUT /bloqs/{id}

Lockers 

> * GET     /bloqs/{id}/lockers
> * POST    /bloqs/{id}/lockers

> * DELETE  /bloqs/{id}/lockers/{lockerId}
> * PUT     /bloqs/{id}/lockers/{lockerId}

Rents

> * GET     /bloqs/{id}/lockers/{lockerId}/rents
> * POST    /bloqs/{id}/lockers/{lockerId}/rents

> * DELETE  /bloqs/{id}/lockers/{lockerId}/rents/{rentId}
> * PUT     /bloqs/{id}/lockers/{lockerId}/rents/{rentId}

## Running the project

First, run the project dependencies:

`docker-compose up`

and then, run the project itself:

`npm start`

