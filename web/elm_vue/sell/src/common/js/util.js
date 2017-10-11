/*
 * 解析URL参数
 * @example ?id=12345$a=b
 * @return Object {id:12345,a:b}
 *
 * 非？和&的字符
 * [?&] --->  ?
 * [^?&]+ ---> id
 * [^?&] ----> 12345
 *
 */

export function urlParse () {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};