var folder = File(module.filename).parent;
var extensions = /^(png|gif)$/;

exports.generate = function(){
	var names = require('./names');
	var industries = require('./industries');
	
	folder.files.map(function(f){
		if(extensions.test(f.extension)){
			try{
				var company = new ds.Company({
					name: names[Math.floor(Math.random() * names.length)],
					industry: industries[Math.floor(Math.random() * industries.length)],
					logo: loadImage(f)
				});
				company.save();
				
				['Production', 'R&D', 'Purchasing', 'Marketing', 'HR', 'Accounting and Finance'].map(function(g){
					new ds.Group({
						company: company,
						name: g
					}).save();
				});
			}catch(e){}
		}
	});
};