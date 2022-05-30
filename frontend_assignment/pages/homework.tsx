import detectEthereumProvider from "@metamask/detect-provider";
import { Strategy, ZkIdentity } from "@zk-kit/identity";
import { generateMerkleProof, Semaphore } from "@zk-kit/protocols";
import { providers, Contract, utils } from "ethers";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { object, number, string } from "yup";
import Greeter from "artifacts/contracts/Greeters.sol/Greeters.json";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function Homework() {
  const [greeting, setGreeting] = useState("");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      Name: "",
      Age: 0,
      Address: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await homeworkSchema.validate(data);
      console.log(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const homeworkSchema = object({
    Name: string().required(),
    Age: number().required(),
    Address: string().required(),
  });

  useEffect(() => {
    (async () => {
      const provider = (await detectEthereumProvider()) as any;
      const ethers = new providers.Web3Provider(provider);
      provider.pollingInterval = 1000;

      const contract = new Contract(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        Greeter.abi,
        ethers
      );

      contract.on("NewGreeting", (greeting: string) => {
        setGreeting(utils.parseBytes32String(greeting));
      });
    })();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper>
        <Box sx={{ my: 4 }}>
          <h2>Homework </h2>
          <form>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
              gap={2}
            >
              <Controller
                name={"Name"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField onChange={onChange} value={value} label={"Name"} />
                )}
              />
              <Controller
                name={"Age"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField onChange={onChange} value={value} label={"Age"} />
                )}
              />
              <Controller
                name={"Address"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label={"Address"}
                  />
                )}
              />
              <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Grid>
          </form>
        </Box>

        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          gap={2}
        >
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            onChange={() => {}}
            value={greeting}
            style={{ width: 200 }}
          />
        </Grid>
      </Paper>
    </Container>
  );
}

export default Homework;
