(function(){
	Audalysis.PaceMaker = function(pulse_callback, tempo, beats_per_measure, beat_duration)
	{
		var measures_per_second = tempo / 60,
		    beat_count = 0,
		    pulse_interval;

		if (typeof pulse_interval != 'undefined')
			clearInterval(pulse_interval);

		pulse_interval = setInterval(
			function()
			{
				if (typeof beat_duration == 'function')
					Audalysis.Beat.duration = beat_duration();
				else
					Audalysis.Beat.duration = beat_duration;

				window.dispatchEvent(Audalysis.Beat);
			}, 1000 / measures_per_second
		);
	}
})();

