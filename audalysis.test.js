(function(){

	var pacemaker_beat_interval,
	    pacemaker_tatum_interval;

	Audalysis.PaceMaker = function(options)
	{
		options = options || Audalysis.DefaultTime;
		options.prototype = Audalysis.DefaultTime;

		console.log(options);

		var i = 0;

		/**
		 * Start the Beat interval.
		 */
		if (typeof pacemaker_pulse_interval != 'undefined')
			clearInterval(pacemaker_pulse_interval);

		var beat_handler = function(delta)
		{
			window.dispatchEvent(Audalysis.Beat);
		}

		// Fire the first beat now, and then start it's interval.
		beat_handler(0);
		pacemaker_beat_interval = setInterval(beat_handler, (1000 / (options.tempo / 60)))

		/**
		 * Start the Tatum interval.
		 */
		if (options.tatum_value != 0)
		{
			if (typeof pacemaker_tatum_interval != 'undefined')
				clearInterval(pacemaker_tatum_interval);

			var tatum_handler = function(delta)
			{
				window.dispatchEvent(Audalysis.Tatum);
			}

			tatum_handler(0);
			pacemaker_tatum_interval = setInterval(tatum_handler, 1000 / ((options.tempo / 60) * options.beat_value / options.tatum_value));
		}
	}

})();

