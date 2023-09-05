import React, { useEffect, useState } from "react";
import "./grafic.scss";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

//
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function GraficPage({ crypto }) {
  const [info, setInfo] = useState("");
  const [Time, setTime] = useState([]);
  const [Prices, setPrices] = useState([]);

  async function getData() {
    try {
      if (crypto === "") {
        return;
      } else {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/cryptoprice?symbol=` + crypto,
          {
            headers: {
              "X-Api-Key": "Ua2fxXybbRgVxJudxRfdHw==9FmWol4OpVRAlYnj",
            },
          }
        );
        setInfo(response.data);
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

        const date = `${hours}:${minutes}:${seconds}`;
        //
        setTime((prevTime) => [...prevTime, date]);

        //
        setPrices((prevPrices) => [...prevPrices, response.data.price]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(Time);
  }, [Time]);
  console.log(info);
  useEffect(() => {
    //
    getData();
    //
    const intervalId = setInterval(getData, 3000);
    return () => clearInterval(intervalId);
  }, [crypto]);
  const data = {
    labels: Time,
    datasets: [
      {
        label: "Price $",
        data: Prices,
        borderColor: "aqua",
        tension: 0.4,
      },
    ],
  };
  const options = {};
  return <Line data={data} options={options}></Line>;
}

export default function DynamicGraficPage({ crypto }) {
  return <GraficPage key={crypto} crypto={crypto} />;
}
