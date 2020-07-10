ARG REPO_NAME="dt-hardware-benchmark-frontend"

ARG ARCH=arm32v7
ARG MAJOR=daffy
ARG BASE_TAG=${MAJOR}-${ARCH}
ARG BASE_IMAGE=nginx:alpine

# set the base image
FROM node:alpine as build

WORKDIR /app
COPY . /app

# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache dependencies
RUN npm install --production --silent && npm audit fix
#build the project for production
RUN npm run build

# the base image for this is an alpine based nginx image
FROM ${BASE_IMAGE}
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
# start nginx 
CMD ["nginx", "-g", "daemon off;"]

# store module name
LABEL org.duckietown.label.module.type "${REPO_NAME}"
ENV DT_MODULE_TYPE "${REPO_NAME}"

# store module metadata
ARG ARCH
ARG MAJOR
ARG BASE_TAG
ARG BASE_IMAGE
LABEL org.duckietown.label.architecture "${ARCH}"
LABEL org.duckietown.label.code.location "${REPO_PATH}"
LABEL org.duckietown.label.code.version.major "${MAJOR}"
LABEL org.duckietown.label.base.image "${BASE_IMAGE}:${BASE_TAG}"
# <== Do not change this code
# <==================================================

# maintainer
LABEL maintainer="Luzian Bieri (luzibier@ethz.ch)"