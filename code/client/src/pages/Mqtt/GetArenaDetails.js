// App.js
import connectToBroker from "./ConnectToBroker";
import mqtt from "mqtt";

const GetArenaDetails = (
  statusCallback,
  messageCallback,
  selectedArena = ""
) => {
  const record = {
    host: "68.183.188.135",
    // "broker.emqx.io",
    clientId: `Robot_ + ${Math.random().toString(16).substr(2, 8)}`,
    // swarm_client
    port: 9001,
    username: "swarm_user",
    password: "swarm_usere15",
  };

  const mqttConnect = (host, mqttOption) => {
    const client = mqtt.connect(host, mqttOption);

    // Handle connection logic here
    const getArenapublishTopic = "v1/arena/get";
    const subTopic = "v1/arena/details";
    const publishSelectedArenaTopic = "v1/arena/set";
    const qos = 2;
    const payload = "ehkkk";

    client.on("connect", () => {
      const payloadString = selectedArena
        ? JSON.stringify(selectedArena)
        : JSON.stringify(payload);

      if (selectedArena) {
        client.publish(
          publishSelectedArenaTopic,
          payloadString,
          { qos },
          (error) => {
            if (error) {
              console.log("Publish error: ", error);
            }
          }
        );
      } else {
        client.publish(
          getArenapublishTopic,
          payloadString,
          { qos },
          (error) => {
            if (error) {
              console.log("Publish error: ", error);
            }
          }
        );
        client.subscribe(subTopic, { qos }, (error) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
        });
      }
      statusCallback("Connected", client);
    });

    client.on("error", (err) => {
      console.error("Connection error: ", err);
      client.end();
      statusCallback("Error");
    });

    client.on("reconnect", () => {
      statusCallback("Reconnecting");
    });

    client.on("message", (topic, message) => {
      const payload = { topic, message: message.toString() };
      console.log(payload);

      messageCallback(payload);
    });

    // ...
  };

  connectToBroker(mqttConnect, record);
};

export default GetArenaDetails;
