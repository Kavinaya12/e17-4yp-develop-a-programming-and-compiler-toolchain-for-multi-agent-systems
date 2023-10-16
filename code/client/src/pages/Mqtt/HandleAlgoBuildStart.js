// App.js
import connectToBroker from "./ConnectToBroker";
import mqtt from "mqtt";

const HandleAlgoBuildStart = (message) => {
  const record = {
    host: "68.183.188.135",
    clientId: `Robot_ + ${Math.random().toString(16).substr(2, 8)}`,
    port: 9001,
    username: "swarm_user",
    password: "swarm_usere15",
  };
  console.log(message, "buildSuccess");
  const mqttConnect = (host, mqttOption) => {
    const client = mqtt.connect(host, mqttOption);

    // Handle connection logic here
    const buildSuccess = "v1/robot/ota/broadcast";
    const startAlgorithm = "v1/robot/msg/broadcast";
    const qos = 2;
    const payload = "START";

    client.on("connect", () => {
      const payloadString = JSON.stringify(payload);

      if (message !== "run_algorithm") {
        console.log(1);
        client.publish(buildSuccess, payloadString, { qos }, (error) => {
          if (error) {
            console.log("Publish error: ", error);
          }
        });
      } else {
        console.log(2);

        client.publish(startAlgorithm, payloadString, { qos }, (error) => {
          if (error) {
            console.log("Publish error: ", error);
          }
        });
      }
    });

    client.on("error", (err) => {
      console.error("Connection error: ", err);
      client.end();
    });

    client.on("reconnect", () => {
      //   statusCallback("Reconnecting");
    });
  };

  connectToBroker(mqttConnect, record);
};

export default HandleAlgoBuildStart;
