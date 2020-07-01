## Duckietown Hardware Benchmark Frontend

![license](https://img.shields.io/badge/license-MIT-blue.svg)

![Title_image](https://github.com/duckietown/dt-hardware-benchmark-frontend/blob/master/score_display.png)


## Quick start

- Clone Repo

- Make sure your NodeJS and npm versions are up to date for `React 16.8.6`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run start` or `yarn start`

- Views are on: `localhost:3000`

## Documentation

The documentation for the React Material Kit is can be found [here](https://material-ui.com?ref=devias-io).

## 🖌 Design Files

👉[Download Sketch file](https://s3.eu-west-2.amazonaws.com/devias/products/react-material-dashboard/react-material-dashboard-free.sketch)

👉[Download Figma file](https://devias.s3.eu-west-2.amazonaws.com/products/react-material-dashboard/react-material-dashboard-free.fig)

## Build and run
```bash
dts devel build -f --arch amd64

docker run -it -p 3000:80 --rm duckietown/dt-hardware-benchmark-frontend:to_dt_project-amd64
```


**Dev**
using `Dockerfile-dev`
```bash
docker build . -t bm_frontend

docker run 
```

## License

- Licensed under MIT (https://github.com/devias-io/react-material-dashboard/blob/master/LICENSE.md)
