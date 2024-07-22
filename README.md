# HYT
CRUD application with spring boot, react and docker

### Backend
To compile, test and install the artifacts in your local maven repository:
`mvn clean install`.
  
### Frontend
Before start the application you have to install all the dependencies modules with:
`npm install`.

Once install you can run the React development environment with:
`npm start`.

If a port is not left free when you stop npm you can stop it:
`npm kill-port 3000`.

## Docker App
### Building and running your application
You can work in local environment using Docker. 
Docker allows to run each module or service like frontend, backend and db in an isolated container.
Docker compose allows to configure a private local environment to run all your containers.
When you're ready, start your application on local environment by running:
`docker compose up --build`.

When you want to deploy on local environment a version similar to the one deployed on production
`docker compose -f compose.prod.yaml up --build`.

To stop the docker compose runner you can:
- Stop the containers in Docker Desktop UI
- Stop the containers clicking ctrl + c in the console with the docker compose running.
- Writing `docker compose down` on the root folder in the console

Your application will be available at http://localhost:8080.

### Deploying your application to the cloud
The deployment is managed by Github CI/CD.


### References
* Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)



