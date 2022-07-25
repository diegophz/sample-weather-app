import { Card, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { Fragment, useEffect, useState } from "react";
import { searchCities } from "../../API-Services/SearchBox-Autocomplete-API";
import { ICityResult, IHistoryRecord } from "../../Models/city-restAPI-model";
import City from "../City/City";
import Humidity from "../HistoricalWeather/Humidity";
import Temperature from "../HistoricalWeather/Temperature";

interface IProps {
  defaultValue: string | null;
  onSelected: (value: string) => void;
  data: ICityResult;
  records: IHistoryRecord[];
}

const SearchBox: React.FC<IProps> = ({
  records,
  data,
  onSelected,
  defaultValue,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!loading) {
      return;
    }
    (async () => {
      const results = await searchCities(
        defaultValue === null ? "Manchester" : defaultValue
      );
      setOptions(results.map((record) => record.name));
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Card style={{ padding: 10, width: "100%" }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item md={12}>
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option: string, value) =>
              option.toLowerCase() === value.toLowerCase()
            }
            getOptionLabel={(option: string) => option}
            options={options}
            loading={loading}
            defaultValue={defaultValue === null ? "Manchester" : defaultValue}
            onChange={(_, value) => {
              if (!!value) {
                onSelected(value);
                location.hash = value;
              }
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="Search City"
                  onChange={async (event) => {
                    const term = event.target.value;
                    if (term.length < 2) return;
                    setLoading(true);
                    const results = await searchCities(term);
                    setOptions(results.map((record) => record.name));
                    setLoading(false);
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item md={12}>
          <City data={data} />
        </Grid>
        <Grid item md={12}>
          <Temperature records={records} />
        </Grid>
        <Grid item md={12}>
          <Humidity records={records} />
        </Grid>
      </Grid>
    </Card>
  );
};
export default SearchBox;
