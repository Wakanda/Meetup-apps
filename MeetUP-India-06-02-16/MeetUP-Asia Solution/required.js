function loginListener(username, password) {
    var myDS = solution.getApplicationByName("MeetUP-Asia").ds;
    var emp = myDS.Employee.find('username == :1', username);

    if (emp && emp.isPwdValid(password)) {
        return {
            name: username,
            fullName: emp.fullname,
            belongsTo: emp.is_admin? ['administrators']: ['employees'],
            storage: {
                time: new Date(),
                compID: emp.company.getKey(),
                ID: emp.getKey()
            }
        };
    }
    
    return false;
}