

model.Group.events.restrict = function(event) {
	if(currentSession().belongsTo('administrators')){
		return this.all();
	}
	
	return this.query('company.ID == :1', sessionStorage.compID);
};


model.Group.events.validate = function(event) {
	if(!this.company){
		return {
			error: 2,
			errorMessage: 'The company is mondatory'
		};
	}
};
