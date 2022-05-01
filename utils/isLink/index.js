function isLink(str) {
	let url

	try {
		url = new URL(str)
	} catch (_) {
		return false
	}

	return url.protocol === "http:" || url.protocol === "https:"
}

export default isLink