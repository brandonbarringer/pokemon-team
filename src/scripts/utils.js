
const printStuff = (str) => str 

const getData = (url, dataGetter) => dataGetter.get(url)

const threeDigit = (num) => ("00" + num).slice(-3);

const capital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const hexToRgba = (hexString, opacity) =>  {
	let hex = hexString.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    let result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}

export default {
	printStuff,
	getData,
	threeDigit,
	capital,
	hexToRgba
}