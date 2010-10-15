(function(){

	var pacemaker_pulse_interval;

	Audalysis.PaceMaker = function(pulse_callback, options)
	{
		options = options || Audalysis.DefaultTime;
		options.prototype = Audalysis.DefaultTime;

		if (typeof pacemaker_pulse_interval != 'undefined')
			clearInterval(pacemaker_pulse_interval);

		pacemaker_pulse_interval = setInterval(
			function()
			{
				window.dispatchEvent(Audalysis.Beat);
				console.log('beat');
			}, 1000 / (options.tempo / 60)
		);
	}

})();

