export default function (value, symbol = '$') {
  return `${symbol}${value.toFixed(2)}`;
}
