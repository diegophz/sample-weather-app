# A weather app using React + Typescript
For creating this SPA, [Create React App example with TypeScript](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-typescript) is being used as a boiler plate along side with [MUI](https://mui.com/) for components and layout styling. For implementing map section with Leaflet, [react-leaflet.js](https://react-leaflet.js.org/) and [Thunderforest](https://www.thunderforest.com/maps/transport/) were being used.
Multiple free APIs are being used as follow:
1. [graphql-weather-api.herokuapp](https://graphql-weather-api.herokuapp.com) in conjuction with Apollo clinet to retreive city's weather detail through Graphql.
2. [autocomplete.travelpayouts](https://autocomplete.travelpayouts.com) to fetch the list of autocomplete on search input.
3. [openweathermap](https://api.openweathermap.org) for fetching historical weather details and also retreive specific areas' weather located on map.
## How to use
This SPA is currently deployed on [Github Pages](https://diegophz.github.io/sample-weather-app/) and [Vercel](https://sample-weather-ocn5oymoz-diegop-whitefoxclo.vercel.app/). Vercel is the preferred one because on GitHub Pages, route functionality can not be handled well with Reacts well-known route libraries.

## Requirements
 NodeJS and NPM as package managers.

## Install & Deploy locally
```sh
npm install
npm start
```
