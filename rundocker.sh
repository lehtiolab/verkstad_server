# build the docker image from Dockerfile
# execute in parent directory
docker build -t matthiasstahl/verkstad_server .

# push it to a global registry
docker push matthiasstahl/verkstad_server

# run it on the target machine
docker run -it 
           -v "$(pwd)"/docker_volume/db:/app/db # adjust for location of db file
           -v "$(pwd)"/docker_volume/log:/app/log # adjust for location of log file
           -p 80:8081 
           -e NODE_ENV='production' 
           -e BASE_URL='mozzarella.scilifelab.se' # adjust for hosting domain
           matthiasstahl/verkstad_server
