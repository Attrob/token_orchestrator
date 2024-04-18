# TOKEN ORCHESTRATOR

A token orchestrator for token management.

It includes the below APIs with the described usage.
1. **POST: v1/keys**
    - This is use to create unique tokens. The "count" attribute can be passed in request body to generate as many keys.
2. **GET: v1/keys**
    - This is to get a unique unused and live key from the pool of available keys.
3. **HEAD: v1/keys/:id**
    - This is to get meta information of the key passed in path.
4. **DEL: v1/keys/:id**
    - This is to delete the key passed in the path.
5. **PUT: v1/keys/:id**
    - This is to unblock the key passed in the path. The key will be ready to be used again by some other entity.
6. **PUT: v1/keepalive/:id**
    - This is to extend the expiry time of the key passed in the path by 5 minutes.

Every 5 minutes a function runs to deactivate unused tokens and tokens that are past their expiry.

## Installation
- Clone the repository
- Make sure you have *Node* installed in your system befor getting started.
- Install dependencies using `npm install`

## How to get started
- Start the server using `npm start`
- To view the DB you can use any DB viewer. Use *tokens.sql* file to get DB and files created.
- Use the provided APIs to manage and play around with tokens. The postman collection is attached in the repo.

## Tech Stack
- NodeJS (v20.10)
- ExpressJS (v4.19)
- MySQL

## Author
Akshay Yadav

Have a great time learning and exploring.
