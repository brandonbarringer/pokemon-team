export default {
	hp: (base, iv, ev, lv) => {
		return ((2*base + iv + ev/4 + 100) * lv) / 100 + 10
	}
	stat: (base, iv, ev, lv, nature) => {
		return (((2*base + iv + ev/4) * lv) / 100 + 5) * nature
	}
}