/**
 *@param connection database connection
 * @param pair currency pair
 * @param price currency price
 *
 * save currency pair and currency price in database
 */

module.exports.savePrice = async (connection, pair, price) => {
  const sendNumber = () => {
    setTimeout(sendNumber, 2000);
  };

  sendNumber();
  const sql =
    "INSERT INTO markets (symbol,open_price,close_price,high_price) VALUES ('" +
    pair +
    "','" +
    price +
    "','" +
    price +
    "','" +
    price +
    "')";
  connection.query(sql, (err, result) => {
    if (err) console.log(err);
    else console.log(result);
  });
};
