const checkEmail = (x) => {
    const reg = /^([a-z\d\._-]{2,25})@([a-z\d-]{2,20})\.([a-z]{2,8})(\.[a-z]{2,8})?$/i
	x = x.replace(/\s/g, '');
	if (reg.test(x) == true) return true;
	return false;
}

export { checkEmail };