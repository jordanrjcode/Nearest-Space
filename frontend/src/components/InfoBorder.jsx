import React, { useState, useEffect } from "react";
import "./InfoBorder.css";
import { useSelector } from "react-redux";
function InfoBorder() {
  const apiClimate = useSelector((store) => store.api.apiClimate);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (apiClimate) {
      let uD = Object.values(apiClimate);
      setData(uD[5]);
    }
  }, [apiClimate]);

  return (
    <div className="info-border">
      <div className="data-container">
        {data ? (
          <>
            {data.AT ? (
              <p className="data">
                <span>Avg. Temperature(C) :</span> {data.AT.av}
              </p>
            ) : (
              <p className="data">
                <span>Avg. Temperature(C) :</span>
              </p>
            )}
            {data.First_UTC ? (
              <p className="data">
                <span>First UTC :</span> {data.First_UTC}
              </p>
            ) : (
              <p className="data">
                <span>First UTC :</span>
              </p>
            )}
            {data.HWS ? (
              <p className="data">
                <span>Hor. Wind Speed(mps) :</span> {data.HWS.av}
              </p>
            ) : (
              <p className="data">
                <span>Hor. Wind Speed(mps) :</span>
              </p>
            )}
            {data.Last_UTC ? (
              <p className="data">
                <span>Last_UTC :</span> {data.Last_UTC}
              </p>
            ) : (
              <p className="data">
                <span>Last_UTC :</span>
              </p>
            )}
            {data.PRE ? (
              <p className="data">
                <span>Atmospheric Pressure(Pa) :</span> {data.PRE.av}
              </p>
            ) : (
              <p className="data">
                <span>Atmospheric Pressure(Pa) :</span>
              </p>
            )}
            {data.Season ? (
              <p className="data">
                <span>Season :</span> {data.Season}
              </p>
            ) : (
              <p className="data">
                <span>Season :</span>
              </p>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default InfoBorder;
