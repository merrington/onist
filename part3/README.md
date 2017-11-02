## Part 3

Still a WIP.

Each individual service should work.

1. Create a `.env` file in each `src` directory:  
    `part3/src/comments/.env`  
    `part3/src/members/.env`  
    `part3/src/orgs/.env`  
2. Contents of `.env` should be `MONGO_URL` setting and `GITHUB_TOKEN` (optional - higher API rate limit)  

    `.env`  
    ```
    MONGO_URL=mongodb://localhost:27017
    GITHUB_TOKEN=######
    ```
3. Install node deps for each service and run  
    ```
    npm i
    npm start
    ```

All services run on port 8080 - so can only run 1 at a time currently.

#### Future plans:
- Kubernetes
    - Quicker fix: docker + docker-compose
- Caching - Redis?
    - Cache responses from GitHub - list of organizations, members
    - Cache comments after reading, new comments
