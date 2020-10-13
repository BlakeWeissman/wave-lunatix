## Wave


### Develop
In the project directory, you can run:

```bash
$ npm start
```

This runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

```bash
$ npm run build
```

Builds the app for production to the `build` folder.<br />


### Deploy with Docker
In the project directory, run the following to build the docker container:

```bash
$ docker build -t blakeweissman/wave .
```

And run the docker container by using:

```bash
$ docker run -d -it  -p 80:80/tcp --name wave blakeweissman/wave:latest
```

You can get the IP of the docker container by using:
```bash
$ docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' wave
```
