# SiteTest<sup>3</sup>

[![Docker Image CI](https://github.com/wooshcz/sitecheckup/actions/workflows/docker-image.yml/badge.svg)](https://github.com/wooshcz/sitecheckup/actions/workflows/docker-image.yml)

Test your website for SSL/TLS compliance (using [https://testssl.sh/](testssl.sh)), broken links (using [https://linkchecker.github.io/linkchecker/](LinkChecker)) and Core Web Vitals (using [https://developer.chrome.com/docs/lighthouse/overview/](Lighthouse))

This project consists of two main building blocks:

- Frontend App build with SvelteKit and styled using Bootstrap CSS
- NodeJS worker which is running in a Docker container and listening for new jobs to process

Both frontend and the worker sub-projects are built into a Docker image and expected to run in a Docker Compose environment.

## Dependencies

The most important dependency which is not included to either worker or frontend parts is a Database -- currently the tool supports only PostgreSQL. The credentials are stored in `.env` file which is located in both frontend and worker sub-projects.

Database schema is absolutely elementary (see the `database.sql` file) since the app is still being developed.

## Warning

Please do not use this app is any production scenario, it's missing absolutely essential things like proper authentication and authorization in the frontend and many security features. It might be still hopefully useful as an inspiration to contribute or make something similar.
