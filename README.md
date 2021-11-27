# Dental Care Api
### Restfull API for the Dental Care app
<br/>
<br/>


## Installation:
<br/>

<h3>Clone the repository: </h3>

```
git clone https://github.com/roberto-pg/dental-back
```
```
cd dental-back
```
```
yarn
```
```
touch .env
```

</br>

<h3>Enter static values into the .env file:</h3>

```
PORT=<choose a port>
DATABASE_URL="postgresql://<username>:<password>@care-postgres:5432/<database_name>?schema=public"
DB_PASS_ROOT=<root password for bitnami postgres container>
DB_HOST=care-postgres
DB_NAME= <database_name>
DB_USER= <username>
DB_PASS= <password>
REDIS_PORT=6379
REDIS_HOST=care-redis
REDIS_PASS=<password>
JWT_SECRET= (choose a password to generate the jwt token)
LOGIN_EXPIRATION_TIME=<set a time>
IMAGE_STORAGE=./public/images/
DIR_IMAGE=http://localhost:8181/
```

<br/>
<br/>
<br/>

## Create Docker Containers:
<br/>
<h3>Run the command at the root of the project:</h3>

```
docker-compose up -d
```
```
docker ps -a
```

<br/>
<br/>

## Add permissions
<br/>
<h3>Bitnami postgres container requires access authorization in local persistence folder</h3>
<h3>Type the command below into the terminal, and don't forget to change the address according to your docker-compose.yml:</h3>

```
sudo chown -R 1001:1001 /home/rpg/Docker/care-postgres
```
<br/>
<h3>If all goes well, there are now four docker containers running.</h3>
<h3>To verify, type in the terminal: </h3>

```
docker ps -a
```
<br/>
<h3>To run migrations you have to find out the address of the care-postgres container on the Docker network:</h3>

```
docker network ls
```
```
docker network inspect <network id>
```

<br/>
<h3>Change the DATABASE_URL in the .env file and run Prisma Migrations at the root of the project::</h3>

```
yarn prisma migrate dev
```

<br/>
<h3>This Api uses a Nginx server for the images of dentists and Redis to store the authentication token in a blacklist when the user logs out of the application</h3>

<br/>
<br/>



## Okay, it's working!
