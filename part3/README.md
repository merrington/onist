## Part 3

Still a WIP.

### Development (non-docker)
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
3. Install node deps for each service (and `utils`) and run  
    ```
    npm i
    npm start
    ```

All services run on port 8080 - so can only run 1 at a time currently.

### "Production" (Docker Compose)
Starts up 5 docker containers:  
- nginx: acts as reverse proxy - matches request path to send to correct backend server. 
- mongo
- orgs (handles DELETE /orgs/<orgname> requests)
- comments (handles POST and GET requests to /orgs/<orgname>/comments)
- members (handles GET requests to /orgs/<orgname>/members)

1. From the `deploy` directory, run `docker-compose up`
2. Send requests to http://localhost:8080

#### Future plans:
- Kubernetes
    - Quicker fix: docker + docker-compose
- Caching - Redis?
    - Cache responses from GitHub - list of organizations, members
    - Cache comments after reading, new comments
