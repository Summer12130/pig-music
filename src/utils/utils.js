function shuffle(arr) {
  var l = arr.length;
  var index, temp;
  while (l > 0) {
    index = Math.floor(Math.random() * l);
    temp = arr[l - 1];
    arr[l - 1] = arr[index];
    arr[index] = temp;
    l--;
  }
  return arr;
}
function formatTime(time) {
  let date = new Date(time);
  let Y = date.getFullYear();
  let M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + "/" + M + "/" + D + " " + H + ":" + m + ":" + s;
}

export { shuffle, formatTime };
