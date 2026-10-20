# Deployment environment

## Production

This application is deployed in production on an Ubuntu virtual private
server hosted by [Infomaniak](https://www.infomaniak.com). It is publicly
served at [https://avventura.fun](https://avventura.fun).

## Backend API

The application communicates with the Avventura API, whose base URL is read
from `AVVENTURA_API_URL`, falling back to `NEXT_PUBLIC_AVVENTURA_API_URL`
(see `.env.template` and the route handlers under `src/app/api/`).

| Environment | API base URL                                             |
| ----------- | -------------------------------------------------------- |
| Production  | [https://api.avventura.fun/](https://api.avventura.fun/) |
| Local       | `http://localhost:3000`                                  |

In local development, the API is served from the sibling repository
`../avventura-v3` ([w3hc/avventura-v3](https://github.com/w3hc/avventura-v3)),
a NestJS application started with `pnpm start:dev`.
