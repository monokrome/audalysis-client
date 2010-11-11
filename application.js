(function()
{
	var canvas,
	    body,
			instance,
	    measure_initial,
			beat_count = 0,
	    tempo = 140,        // The tempo of this song is 140.
	    beats_per_measure = 4,     // There are four quarter notes per measure.
	    beat_value = 1/4;   // These beats are quarter notes.

	var application = {
		init: function(e)
		{
			var request;

			body = document.getElementsByTagName('body')[0];
			canvas = document.createElement('canvas');

			canvas.id = 'visualization';
			application.resize_canvas(e);

			document.body.appendChild(canvas);

			// TODO: Pretend IE doesn't suck
			if (typeof document.all == 'undefined')
			{
				request = new XMLHttpRequest();
				request.onreadystatechange = application.initialize_processing;
				request.open('GET', 'processing.pde');
				request.send();

				window.addEventListener('resize', application.resize_canvas, false);
			}
			else
			{
				window.attachEvent('resize', application.resize_canvas);
			}

			application.init_pacemaker(e);
		},

		init_pacemaker: function(e)
		{
			// Start a virtual beat for testing your animations in.
			Audalysis.PaceMaker({
				tempo: tempo,
				count: beats_per_measure,
				beat_value: beat_value,
			});
		},

		update_canvas: function(e)
		{
			application.resize_canvas(e);
		},
		resize_canvas: function(e)
		{
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		},

		initialize_processing: function(e)
		{
			if (this.readyState == 4)
			{
				instance = new Processing(canvas, this.responseText);
				Processing.instances.push(instance);
			}
		}
	};

	if (typeof document.all == 'undefined')
		window.addEventListener('load', application.init, false);
	else
		window.attachEvent('onload', application.init);

})();

