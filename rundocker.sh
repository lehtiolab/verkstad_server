# build the docker image from Dockerfile
# execute in parent directory
docker build -t matthiasstahl/verkstad_server .

# push it to a global registry
docker push matthiasstahl/verkstad_server

# run it on the target machine
docker run -it 
           -v "$(pwd)"/docker_volume/db:/app/db # adjust for location of db file
           -v "$(pwd)"/docker_volume/log:/app/log # adjust for location of log file
           -p 8081:8081 # adjust exposing port (first one)
           --env-file .env # make your own env file (see below)
           matthiasstahl/verkstad_server

# same line, but without \n and comments
docker run -it -v "$(pwd)"/docker_volume/db:/app/db -v "$(pwd)"/docker_volume/log:/app/log -p 8081:8081 --env-file .env matthiasstahl/verkstad_server

# env variables to define (with example values)
NODE_ENV='production'
PORT=8081
DB_HOST=localhost
DB_STORAGE=./db/verkstad.sqlite
DB_NAME=verkstad
DB_USER=root
DB_PASS=secret
DB_DIALECT=sqlite
JWT_SECRET=secret
LOG_PATH=./log
