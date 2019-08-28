# Server app for the MS todo app

## What does this piece of software do?

This is a dockerized Node.js app, which serves a
[simple todo app](https://github.com/higsch/verkstad_client). This app
is intended to organize tasks for the maintenance of a
[modern proteomics mass spectrometer](https://en.wikipedia.org/wiki/Mass_spectrometry).

Each day one has to check the injection needles, run quality control
samples, or exchange liquid chromatography components. In order to keep
an overview of all these tasks, the **Verkstad** app for mass spec
maintenance was developed and is now applied in the [Lehtiö laboratory](http://lehtiolab.se).

The server app receives user requests to show or register predefined tasks.
The data is kept in a sqlite database.
![DB layout](https://raw.githubusercontent.com/higsch/verkstad_server/master/db_layout.png)

The app itself is dockerized and can easily be run on any server setup.

Curious about `kanteleId`? Watch out for new developments and the awesome
[Kantele platform](https://github.com/glormph/kantele) by my colleague
[@glormph](https://github.com/glormph).

## Can I also use it?
Sure! Just clone the repo to your server, build the docker image and start it
according to `rundocker.sh`. Then you can design your own frontend or use
[this one](https://github.com/higsch/verkstad_client).

Of course you can also directly use the docker image from the
[public repository](https://hub.docker.com). Just execute 
```bash
docker run -it # for interactive session
           -v "$(pwd)"/docker_volume/db:/app/db # adjust for location of db file
           -v "$(pwd)"/docker_volume/log:/app/log # adjust for location of log file
           -p 8081:8081 # adjust exposing port (first one)
           --env-file .env # make your own env file (see description in rundocker.sh)
           matthiasstahl/verkstad_server
```
on your server. The `-v` arguments are optional and allow you to store the sqlite
database somewhere else on your server. The same is true for the location of
the log file.

## Deploy the full Verkstad bundle on a webserver
* Server (this repo)
  1. Find place for sqlite file and log file.
  2. Create `.env` file to hold the environment variables.
  3. Run `docker` image with `.env` file and mapped volumes forever (via cronjob).
  4. Configure ports and redirection.
* Client ([other repo](https://github.com/higsch/verkstad_client))
  1. Find place to store `index.html` and `js` as well as
    `css` files from the `dist` folder.
  2. Configure ports and redirection.

## Sidenote
This project was built during some very long nights in Stockholm's winter 2019.
