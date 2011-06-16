(function(){

var
	// Defines events that occur in relation to different occurances in our audio
	Audalysis = {
		DefaultTime: {
			tempo: 120,
			beat_count: 4,
			beat_value: 1/4,
			tatum_value: 1/16,
		},

		Events: {'Beat': 'beat', 'Tatum': 'tatum', 'Section': 'section', 'Segment': 'segment'},
		DispatchEvent: function(event_type)
		{
			// TODO: Add custom data here.

			if (typeof window.dispatchEvent != 'undefined')
			{
				// Create a duplicate of the passed event for custom data
				var next_event = function(){};
				next_event.prototype = Audalysis[event_type];
				next_event = new next_event();

				document.dispatchEvent(next_event);
			}
			else
			{
				var event_string = Audalysis.Events[event_type];

				document.documentElement['audalysis_event_' + event_string] = !document.documentElement['audalysis_event_' + event_string];
			}
		}
	};

	/**
	 * Create audalysis's event objects
	 */
	for (var event_name in Audalysis.Events)
	{
		if (typeof document.addEventListener != 'undefined')
		{
			Audalysis[event_name] = document.createEvent('Event');
			Audalysis[event_name].initEvent(Audalysis.Events[event_name], true, false);
		}
		else if (document.attachEvent)
		{
			// IE doesn't supprt custom events, so you must use oppropertychange
			document.documentElement['audalysis_event_' + event_name] = false;
			document.documentElement.attachEvent(
				'onpropertychange',
				function (e)
				{
				}
			);
		}
	}

	window.Audalysis = window.Audalysis || Audalysis;

})();

