(function(){

var
	// Defines events that occur in relation to different occurances in our audio
	Audalysis = {
	};

	/**
	 * Create audalysis's event objects
	 */
	for (event_name in {'Beat':0, 'Tatum':0, 'Section':0})
	{
		Audalysis[event_name] = document.createEvent('Event');
		Audalysis[event_name].initEvent(event_name.toLowerCase(), true, false);
	}
	
	window.Audalysis = window.Audalysis || Audalysis;

})();

