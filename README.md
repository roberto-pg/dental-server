# Dental Server Api
### Restfull API for the Dental App
<br/>

### This Api uses a Nginx server for the images of dentists and Redis to store the authentication token in a blacklist when the user logs out of the application
<br/>
<br/>

## Installation:
<br/>

<h3>Clone the repository: </h3>

```
git clone https://github.com/roberto-pg/dental-server.git dental
```
```
cd dental
```
```
npm install
```
```
nano .env
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

### This server uses Nginx to provide still images of the doctors' photos. Install the Nginx container before running docker-compose:

```
docker run -d --name nginx -p 8080:80 --restart always -v /home/<user>/docker/nginx:/usr/share/nginx/html nginx         
```

<br/>

### Bitnami's Postgres Container requires permission to access the persistence directory. Create the folder and give access permission:

```
cd ~/docker
```

```
sudo mkdir dental-postgres
```

```
sudo chown -R 1001:1001 /home/rpg/docker/dental-postgres
```

```
cd ~/dental
```

<br/>

<h3>Run the command at the root of the project:</h3>

```
npm run build
```

```
docker compose up -d
```

```
docker ps -a
```

<br/>
<br/>

<h3>Run Migrations (Inside the report container):</h3>

```
docker exec -it dental sh
```

```
npx prisma migrate dev
```

```
Ctrl + D
```

<br/>
<br/>

## Okay, it's working!
