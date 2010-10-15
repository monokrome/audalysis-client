(function(){
	var beat_count = 0;

	var 
	    measure_initial,
			beat_count = 0,
	    tempo = 140,        // The tempo of this song is 140.
	    beats_per_measure = 4,     // There are four quarter notes per measure.
	    beat_value = 1/4;   // These beats are quarter notes.

	ProcessingJS = {
		self: this,

		// This is a function that receives an event name and returns a "real" event handler.
		EventHandler: function(event_name)
		{
			return function(e)
			{
				for (var i=0, pil=Processing.instances.length; i < pil; ++i)
				{
					if (typeof Processing.instances[i][e.type] != 'undefined')
					{
						Processing.instances[i][e.type]();
					}
				}
			}
		},

		InitHandler: function(e)
		{
			var event_name;

			// Loop through each of the events in Audalysis for attaching
			for (event_name in Audalysis.Events)
			{
				var handler;

				/**
				 * Use a custom handler if it exists, otherwise revert back to a generic
				 * handler that will at least let you do something when that event happens.
				 */
				if (typeof ProcessingJS[event_name + 'Handler'] != 'undefined')
					handler = ProcessingJS[event_name + 'Handler'];
				else
					handler = ProcessingJS.EventHandler(event_name);

				bind_event(Audalysis.Events[event_name], handler);
			}

			// Start a virtual beat for testing your animations in.
			Audalysis.PaceMaker({
				tempo: tempo,
				count: beats_per_measure,
				beat_value: beat_value,
			});

			Audalysis.Processing = Audalysis.Processing || ProcessingJS;
		},

		BeatHandler: function(e)
		{
			if (beat_count == beats_per_measure)
				beat_count = 0;

			beat_count++;

			if (beat_count == 1)
				measure_initial = true;
			else
				measure_initial = false;

			ProcessingJS.EventHandler(e.type)(e);
		}
	}

	function bind_event(event_name, handler, ele)
	{
		if (typeof ele == 'undefined')
			ele = window;

		if (typeof document.all == 'undefined')
			ele.addEventListener(event_name, handler, true);
		else
			ele.attachEvent(event_name, handler);
	}

	bind_event('load', ProcessingJS.InitHandler);

})();

