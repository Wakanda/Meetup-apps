

model.Employee.entityMethods.isPwdValid = function(password) {
	return this.ha1key === directory.computeHA1(this.getKey(), password);
};
