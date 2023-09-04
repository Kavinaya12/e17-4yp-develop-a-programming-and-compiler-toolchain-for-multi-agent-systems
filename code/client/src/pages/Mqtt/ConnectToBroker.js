const ConnectToBroker = (connect, values = {}) => {
  const { host, clientId, port, username, password } = values;
  const url = `ws://${host}:${port}/ws`;
  const options = {
    keepalive: 30,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: false,
  };
  options.clientId = clientId;
  options.username = username;
  options.password = password;
  connect(url, options);
};

export default ConnectToBroker;
