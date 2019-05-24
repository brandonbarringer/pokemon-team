
const printStuff = (str) => str 

const getData = (url) => {
	axios
	.get(url)
	.then(response => {
		let temp;
		let arr = [];
		temp = response.data.results;
		
		temp.forEach((item ) => {
			axios.get(item.url).then(results => {
				arr.push(results.data);
			})
		})
		return arr
	});
}

const threeDigit = (num) => ("00" + num).slice(-3);

const capital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const createClassRoot = (rootString) => rootString

export default {
	printStuff,
	getData,
	threeDigit,
	capital
}