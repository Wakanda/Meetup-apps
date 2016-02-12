
model.Employee_Group.events.restrict = function(event) {
    if (currentSession().belongsTo('administrators')) {
        return this.all();
    }

    return this.query('employee.company.ID == :1', sessionStorage.compID);
};


model.Employee_Group.events.validate = function(event) {
    if (this.employee.company.getKey() !== this.group.company.getKey()) {
        return {
            error: 1,
            errorMessage: 'The employee and the company should belong to the same company.'
        };
    }
};