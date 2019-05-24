
const printStuff = function(str) {
  return str
}

const getData = function(url) {
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

const threeDigit = function(num) {
	return ("00" + num).slice(-3);
}

const capital = function(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export default {
	printStuff,
	getData,
	threeDigit,
	capital
}