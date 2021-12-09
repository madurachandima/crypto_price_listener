const { savePrice } = require("../db_connection/savePrice");
const W3CWebSocket = require("websocket").w3cwebsocket;
const { websocket_api, currency_pairs } = require("../const/const");
const client = new W3CWebSocket(websocket_api);

/*
*@param connection 
* get crypto currency price
*/
module.exports.getCryptoPrice = (connection) => {
  client.onerror = () => {
    console.log("Connection Error");
  };

  client.onopen = () => {
    console.log("WebSocket Client Connected");

    const sendNumber = () => {
      if (client.readyState === client.OPEN) {
        var number = Math.round(Math.random() * 0xffffff);
        client.send(number.toString());
        setTimeout(sendNumber, 2000);
      }
    };
    sendNumber();
    client.send(
      JSON.stringify({
        type: "subscribe",
        product_ids: currency_pairs,
        channels: ["level2"],
      })
    );
  };

  client.onclose = () => {
    console.log("echo-protocol Client Closed");
  };

  client.onmessage = (e) => {
    // {
    //   "type":"l2update",
    //   "product_id":"BTC-USDT",
    //   "changes":
    //      [
    //           ["buy","49648.87","0.05600000"]
    //      ],
    //   "time":"2021-12-09T04:41:04.644838Z"
    // }
    if (typeof e.data === "string") {
      var response = JSON.parse(e.data);
      try {
        console.log("Product_id: '" + response["product_id"] + "'");
        console.log("Changes: '" + response["changes"][0][1] + "'");

        /*
        * call savePrice to save crypto price and currency_pairs name
        */
        savePrice(
          connection,
          response["product_id"],
          response["changes"][0][1]
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
};
