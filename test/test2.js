app.airportCache = {
	
	cache: {},
	
	addAirport: function(data){
		return app.airportCache.addAirportList([data]);
	},
	
	addAirportList: function(data){
		var i, l, that = app.airportCache;
		for (i=0, l=data.length; i<l; i++) {
			data[i].id = that.generateKey(data[i]);
			that.cache[data[i].id] = data[i];
		}
	},
	
	getAirport: function(airportId) {
		var that = app.airportCache;
		
		if (that.cache[airportId]) {
			return that.cache[airportId];
		}
		
		return null;
	},
	
/**
 * Returns a valid code name and value for use in the api search
 * @param airport {object} an airport object, probably from this cache
 * @return {object} { 
 *		type {string}: the name of the code type
 *		value {string} the actual code of the airport
 *	}
 *	If there is not a valid airport code then will return null
 */
getAirportCode: function(airport) {
		var codes = ['iataCode', 'icaoCode', 'faaCode'],
			i,l;
		
		for (i=0, l=codes.length; i<l; i++) {
			if (typeof airport[codes[i]] !== 'undefined') {
				return {
					type: codes[i],
					value: airport[codes[i]]
				};
			}
		}
		return null;
		
	},
	
	generateKey: function(airport){
		var key = '';
			key += airport.name + '_' + airport.iataCode + '_' + airport.icaoCode+'_'+airport.faaCode;
		return key;
	}
	
	
};

