(function(){
	var beat_count = 0;
	var measure_initial;

	var tempo = 140; // The tempo of this song is 140.
	var beat_duration = 1/4; // These beats are quarter notes.
	var beats_per_measure = 4; // There are four quarter notes per measure.

	function beat_handler(e)
	{
		if (beat_count == beats_per_measure)
			beat_count = 0;

		beat_count++;

		if (beat_count == 1)
			measure_initial = true;
		else
			measure_initial = false;

		for (var i=0, pil=Processing.instances.length; i < pil; ++i)
			Processing.instances[i].beat();
	}

	function init_handler(e)
	{
		Audalysis.PaceMaker(beat_handler, tempo, beats_per_measure, beat_duration);
	}

	if (typeof document.all == 'undefined')
	{
		window.addEventListener('load', init_handler, true);
		window.addEventListener('beat', beat_handler, true);
	}
	else
	{
		window.attachEvent('load', init_handler);
		window.attachEvent('beat', beat_handler);
	}

})();

