import gql from "graphql-tag";

export const GET_CITY_BY_NAME = gql`
  query GetCityByName($name: String!) {
    getCityByName(name: $name, config: { units: metric }) {
      id
      name
      country
      coord {
        lon
        lat
      }
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        clouds {
          all
          visibility
          humidity
        }
        wind {
          speed
          deg
        }
      }
    }
  }
`;
