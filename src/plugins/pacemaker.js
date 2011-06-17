(function(){

	var pacemaker_beat_interval,
	    pacemaker_tatum_interval;

	Audalysis.PaceMaker = function(options)
	{
		options = options || Audalysis.DefaultTime;
		options.prototype = Audalysis.DefaultTime;

		var i = 0;

		/**
		 * Start the Beat interval.
		 */
		if (typeof pacemaker_pulse_interval != 'undefined')
			clearInterval(pacemaker_pulse_interval);

		var beat_handler = function(delta)
		{
			Audalysis.DispatchEvent('Beat');
		}

		// Fire the first beat now, and then start it's interval.
		beat_handler(0);
		pacemaker_beat_interval = setInterval(beat_handler, (1000 / (options.tempo / 60)))

		/**
		 * Start the Tatum interval.
		 */
		if (typeof options.tatum_value != 'undefined')
		{
			if (typeof pacemaker_tatum_interval != 'undefined')
				clearInterval(pacemaker_tatum_interval);

			var tatum_handler = function(delta)
			{
				Audalysis.DispatchEvent('Tatum');
			}

			tatum_handler(0);
			pacemaker_tatum_interval = setInterval(
				tatum_handler,
				// Convert into milliseconds, the resulting amount from:
				1000 /

				// Get the number of beats per second multipled by...
				((options.tempo / 60) *

				// The number of tatums that occur for each beat
				((1 / options.tatum_value) / (1 / options.beat_value)))
			);
		}
	}

})();

