
const printStuff = (str) => str 

const getData = (url, dataGetter) => {
	dataGetter
	.get(url)
	.then(response => {
		let temp;
		let arr = [];
		temp = response.data.results;
		
		temp.forEach((item ) => {
			dataGetter.get(item.url).then(results => {
				arr.push(results.data);
			})
		})
		return arr
	});
}

const threeDigit = (num) => ("00" + num).slice(-3);

const capital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const createBEMClassFromRoot = (rootString, className) => rootString + '__' + className;


export default {
	printStuff,
	getData,
	threeDigit,
	capital
}