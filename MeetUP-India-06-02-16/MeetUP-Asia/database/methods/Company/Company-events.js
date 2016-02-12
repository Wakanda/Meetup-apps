

model.Company.events.restrict = function(event) {
	var curSession = currentSession();
	
	if(curSession.belongsTo('administrators')){
		return this.all();
	}
	
	return this.query('ID == :1', sessionStorage.compID);
};
