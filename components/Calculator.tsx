import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

//types
type Sign = "+" | "-" | "/" | "*" | "";
interface Params {
  operation: Sign;
  first: number;
  second: number;
}

const Calculator = () => {
  const [operation, setOperation] = useState<Sign>("");
  const [result, setResult] = useState<string | number>("");
  const firstRef = useRef<null | number>(null);
  const secondRef = useRef<null | number>(null);
  const welcomeMessage: string = "Calculator is ready!";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value as Sign);
  };

  useEffect(() => {
    setResult(welcomeMessage);
  }, []);

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query: Params = {
      operation: operation,
      first: firstRef.current.value,
      second: secondRef.current.value,
    };

    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOperation("");
    setResult(welcomeMessage);
    firstRef.current.value = null;
    secondRef.current.value = null;
    document.querySelector("#operation").selectedIndex = 0;
  };

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="first"
              label="First Number"
              variant="outlined"
              inputRef={firstRef}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="second"
              label="Second Number"
              variant="outlined"
              inputRef={secondRef}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={10}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <Button type="button" variant="outlines" onClick={handleReset}>
              Reset
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom>
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;
