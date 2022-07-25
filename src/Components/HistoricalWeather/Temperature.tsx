import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Grid } from "@mui/material";
import { Chart } from "react-google-charts";
import { IHistoryRecord } from "../../Models/city-restAPI-model";

interface IProps {
  records: IHistoryRecord[];
}

const Temperature: React.FC<IProps> = ({ records }) => {
  return (
    <Card>
      <CardHeader
        title="Temperature History"
        subheader="Temperature history over last 24 hours"
      />
      <CardContent>
        <Grid container>
          <Grid item md={12}>
            <Chart
              height={"400px"}
              chartType="LineChart"
              data={[
                ["Hour", "Feels like", "Actual"],
                ...records.map((record) => {
                  return [
                    new Date(record.dt * 1000).getHours() + "",
                    record.feels_like,
                    record.temp,
                  ];
                }),
              ]}
              options={{
                hAxis: {
                  title: "Hour of day",
                },
                vAxis: {
                  title: "Temperature",
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Temperature;
