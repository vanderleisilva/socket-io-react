import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import ReactJson from "react-json-view";

const ENDPOINT = "http://localhost:3000/";

function App() {
  const [settings, setSettings] = useState();
  const [socket] = useState(() => socketIOClient(ENDPOINT));

  useEffect(() => {
    socket.on("initial_settings", setSettings);

    socket.on("settings_update", setSettings);

    socket.on("disconnect", () => console.log("Working offline"));
  }, []);

  const onUpdate = (params) => {
    //in case we need to have a certanty that the server has taken the event
    //a third function param is available (Acknowledgements from socke.io)
    //https://socket.io/docs/v4/emitting-events/#Basic-emit
    socket.emit("settings_update", {
      namespace: [...params.namespace, params.name],
      value: params.new_value,
    });
  };

  return (
    <>
      <p>Setting state:</p>
      {!settings ? (
        "Loading ... "
      ) : (
        <ReactJson src={settings} onEdit={onUpdate} onAdd={onUpdate} />
      )}
    </>
  );
}

export default App;
