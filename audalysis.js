(function(){

var
	// Defines events that occur in relation to different occurances in our audio
	Audalysis = {
		Events: {'Beat': 'beat', 'Tatum': 'tatum', 'Section': 'section'},
		DefaultTime: {
			tempo: 120,
			beat_count: 4,
			beat_value: 1/4,
			tatum_value: 1/16,
		}
	};

	/**
	 * Create audalysis's event objects
	 */
	for (var event_name in Audalysis.Events)
	{
		if (typeof document.createEventObject == 'undefined')
			Audalysis[event_name] = document.createEvent('Event');

		else
			Audalysis[event_name] = document.createEventObject();

		Audalysis[event_name].initEvent(Audalysis.Events[event_name], true, false);
	}
	
	window.Audalysis = window.Audalysis || Audalysis;

})();

