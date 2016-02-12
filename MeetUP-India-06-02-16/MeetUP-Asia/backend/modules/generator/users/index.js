var folder = File(module.filename).parent;
var extensions = /^(png)$/;
var lastnames = require('./lastnames');
var Chance = require('chance');
var _ = require('lodash');

var chance = new Chance();

exports.generate = function(){
	var companies = ds.Company.toArray('ID').map(function(c){
		return c.ID;
	});
	
	[{
		folder: folder.path + 'men',
		defaults: {
			is_male: true
		},
		firstnames: require('./men/firstnames')
	}, {
		folder: folder.path + 'women',
		defaults: {
			is_male: false
		},
		firstnames: require('./women/firstnames')
	}].forEach(function(o){
		var folder = Folder(o.folder);
		
		folder.files.map(function(f){
			if(extensions.test(f.extension)){
				var fn = o.firstnames[Math.floor(Math.random() * o.firstnames.length)];
				try{
					new ds.Employee(_.extend(o.defaults, {
						company: chance.pick(companies),
						firstname: fn,
						lastname: chance.pick(lastnames),
						image: loadImage(f),
						username: fn.toLowerCase(),
						password: 'password',
						address: chance.address()
					})).save();
				}catch(e){}
			}
		});
	});
};