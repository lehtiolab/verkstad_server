# Server app for the MS todo app

## What does this piece of software do?

This is a dockerized node.js app, which serves a
[simple todo app](https://github.com/mtstahl/client_mstodos). This app
is intended to organize tasks for the maintenance of a
[modern proteomics mass spectrometer](https://en.wikipedia.org/wiki/Mass_spectrometry).

Each day one has to check the injection needles, run quality control
samples, or exchange liquid chromatography components. In order to keep
an overview of all these tasks, the **Verkstad** app for mass spec
maintenance was developed and is now applied in the [Lehtiö laboratory](http://lehtiolab.se).

The server app receives user requests to show or register predefined tasks.
The data is kept in a sqlite database.
![DB layout](https://raw.githubusercontent.com/mtstahl/server_mstodos/master/db_layout.png)

The app itself is dockerized and can easily be run on any server setup.

## Can I also use it?
Sure! Just clone the repo to your server, build the docker image and start it
according to `.rundocker`. Then you can design your own fronend or use
[this one](https://github.com/mtstahl/client_mstodos).
