
const printStuff = (str) => str 

const getData = (url, dataGetter) => dataGetter.get(url)

const threeDigit = (num) => ("00" + num).slice(-3);

const capital = (str) => str.charAt(0).toUpperCase() + str.slice(1);



export default {
	printStuff,
	getData,
	threeDigit,
	capital
}