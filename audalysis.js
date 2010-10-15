(function(){

var
	// Defines events that occur in relation to different occurances in our audio
	Audalysis = {
		Events: {'Beat': 'beat', 'Tatum': 'tatum', 'Section': 'section'},
		DefaultTime: {
			tempo: 120,
			count: 4,
			value: 1/4,
			tatum: 0,
		}
	};

	/**
	 * Create audalysis's event objects
	 */
	for (var event_name in Audalysis.Events)
	{
		Audalysis[event_name] = document.createEvent('Event');
		Audalysis[event_name].initEvent(Audalysis.Events[event_name], true, false);
	}
	
	window.Audalysis = window.Audalysis || Audalysis;

})();

