model.Employee.password.onGet = function() {
	return '***********';
};


model.Employee.password.onSet = function(value) {
	this.ha1key = directory.computeHA1(this.getKey(), value);
};


model.Employee.events.restrict = function(event) {
	if(currentSession().belongsTo('administrators')){
		return this.all();
	}
	
	return this.query('company.ID == :1', sessionStorage.compID);
};


model.Employee.fullname.onGet = function() {
	var formatter = require("formatting");
	var res = "";
	
	res += formatter.formatString(this.firstname, 'c');
	res += ' ' + formatter.formatString(this.lastname, 'U');
	
	return res;
};


model.Employee.events.validate = function(event) {
	if(!this.company){
		return {
			error: 2,
			errorMessage: 'The company is mondatory'
		};
	}
};
