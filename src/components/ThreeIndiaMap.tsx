import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";

import LinearGradient from "./LinearGradient.tsx";
import "./ThreeIndiaMap.css";

import INDIA_TOPO_JSON from "./india.topo.json";

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] as [number, number], // [Longitude, Latitude]
};

// Red Variants
const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const DEFAULT_COLOR = "#EEE";

const getRandomInt = () => {
  return parseInt(String(Math.random() * 100));
};

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

// will generate random heatmap data on every call
const getHeatMapData = () => {
  return [
    { id: "AP", state: "Andhra Pradesh", value: getRandomInt() },
    { id: "AR", state: "Arunachal Pradesh", value: getRandomInt() },
    { id: "AS", state: "Assam", value: getRandomInt() },
    { id: "BR", state: "Bihar", value: getRandomInt() },
    { id: "CT", state: "Chhattisgarh", value: getRandomInt() },
    { id: "GA", state: "Goa", value: 21 },
    { id: "GJ", state: "Gujarat", value: 22 },
    { id: "HR", state: "Haryana", value: getRandomInt() },
    { id: "HP", state: "Himachal Pradesh", value: 24 },
    { id: "JH", state: "Jharkhand", value: 26 },
    { id: "KA", state: "Karnataka", value: 27 },
    { id: "KL", state: "Kerala", value: getRandomInt() },
    { id: "MP", state: "Madhya Pradesh", value: getRandomInt() },
    { id: "MH", state: "Maharashtra", value: getRandomInt() },
    { id: "MN", state: "Manipur", value: getRandomInt() },
    { id: "ML", state: "Meghalaya", value: 59 },
    { id: "MZ", state: "Mizoram", value: getRandomInt() },
    { id: "NL", state: "Nagaland", value: 59 },
    { id: "OR", state: "Odisha", value: 59 },
    { id: "PB", state: "Punjab", value: getRandomInt() },
    { id: "RJ", state: "Rajasthan", value: getRandomInt() },
    { id: "SK", state: "Sikkim", value: getRandomInt() },
    { id: "TN", state: "Tamil Nadu", value: getRandomInt() },
    { id: "TG", state: "Telangana", value: getRandomInt() },
    { id: "TR", state: "Tripura", value: 14 },
    { id: "UT", state: "Uttarakhand", value: getRandomInt() },
    { id: "UP", state: "Uttar Pradesh", value: 15 },
    { id: "WB", state: "West Bengal", value: 17 },
    { id: "WB", state: "West Bengal", value: 17 },
    { id: "AN", state: "Andaman and Nicobar Islands", value: getRandomInt() },
    { id: "CH", state: "Chandigarh", value: getRandomInt() },
    { id: "DN", state: "Dadra and Nagar Haveli", value: 19 },
    { id: "DD", state: "Daman and Diu", value: 20 },
    { id: "DL", state: "Delhi", value: 59 },
    { id: "JK", state: "Jammu and Kashmir", value: 25 },
    { id: "LA", state: "Ladakh", value: getRandomInt() },
    { id: "LD", state: "Lakshadweep", value: getRandomInt() },
    { id: "PY", state: "Puducherry", value: getRandomInt() },
  ];
};

function IndiaMap() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [data, setData] = useState(getHeatMapData());

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0),
  };

  const colorScale = scaleQuantile()
    .domain(data.map((d) => Number(d.value)) as number[]) // Explicitly cast to number[]
    .range(COLOR_RANGE.map((color) => Number(color)));

  const onMouseEnter = (
    geo: any,
    current: { value: string | number } = { value: "NA" }
  ) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${String(current.value)}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
  };

  //   return (

  //     <div className="full-width-height container">
  //       <h1 className="no-margin center">States and UTs</h1>
  //       <ReactTooltip>{tooltipContent}</ReactTooltip>
  //       <ComposableMap
  //         projectionConfig={PROJECTION_CONFIG}
  //         projection="geoMercator"
  //         width={600}
  //         height={220}
  //         data-tip=""
  //       >
  //         <Geographies geography={INDIA_TOPO_JSON}>
  //           {({ geographies }) =>
  //             geographies.map((geo) => {
  //               //console.log(geo.id);
  //               const current = data.find((s) => s.id === geo.id);
  //               return (
  //                 <Geography
  //                   key={geo.rsmKey}
  //                   geography={geo}
  //                   fill={current ? colorScale(current.value) : DEFAULT_COLOR}
  //                   style={geographyStyle}
  //                   onMouseEnter={onMouseEnter(geo, current)}
  //                   onMouseLeave={onMouseLeave}
  //                 />
  //               );
  //             })
  //           }
  //         </Geographies>
  //       </ComposableMap>
  //       <LinearGradient data={gradientData} />
  //       <div className="center">
  //         <button className="mt16" onClick={onChangeButtonClick}>
  //           Change
  //         </button>
  //       </div>
  //     </div>
  //   );
  return (
    <div className="full-width-height container">
      <h1 className="no-margin center">States and UTs</h1>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={220}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = data.find((s) => s.id === geo.id);
              const fillColor = current
                ? colorScale(current.value)
                : DEFAULT_COLOR;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={String(fillColor)} // Convert color to a string
                  style={geographyStyle}
                  data-tip={`${geo.properties.name}: ${String(current?.value)}`} // Convert value to string
                  onMouseEnter={() => onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {/* <LinearGradient data={gradientData} /> */}
      {/* <div className="center">
        <button className="mt16" onClick={onChangeButtonClick}>
          Change
        </button>
      </div> */}

      {/* Define the ReactTooltip with a data-for attribute
      <ReactTooltip id="tooltip" place="top" effect="solid" /> */}
    </div>
  );
}

export default IndiaMap;
