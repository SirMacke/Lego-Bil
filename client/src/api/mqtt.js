var mqtt = require('mqtt');
let client = {};

export default {
  launch(id, callback) {
    var options = {
      port: "8883",
      clientId: id,
      username: "maximilian.helmersson@abbindustrigymnasium.se",
      password: "Test123",
      clean: false,
      will: {
        topic: 'offline',
        payload: id,
        qos: 2
      }
    };
    client = mqtt.connect('wss://maqiatto.com', options);
    client.on('connect', (topic, message) => {
      callback(topic, message);
    })
  },
  end() {
    client.end();
  },
  subscribe(topic) {
    client.subscribe(topic);
    console.log('subscribe:', topic);
  },
  publish(topic, message) {
    client.publish(topic, JSON.stringify(message), {qos: 1});
  }
}