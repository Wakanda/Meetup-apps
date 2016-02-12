exports.generate = function(){
	var session = currentSession();
	var token = session.promoteWith('administrators');

	require('./logos').generate();
	require('./users').generate();

	session.unPromote(token);
};