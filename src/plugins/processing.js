	var ProcessingJS = {
		self: this,

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

			Audalysis.Processing = Audalysis.Processing || ProcessingJS;
		},

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

	if(window.addEventListener)
	{
	    // TODO: IE support?
	    window.addEventListener("load", function() {
		var scripts=document.getElementsByTagName("script");
	
		for(var i=0;i<scripts.length;i++) {
		    if(scripts[i].type=="application/processing")
		    {
			var src=scripts[i].src, canvas=scripts[i].nextSibling;
	
			if(src&&src.indexOf("#")) {
			    canvas=document.getElementById(src.substr(src.indexOf("#")+1));
	
			}
			else {
			    while(canvas && canvas.nodeName.toUpperCase() != "CANVAS")
			    {
				canvas=canvas.nextSibling;
			    }
			}
	
			if (canvas) {
			    Processing(canvas,scripts[i].text);
			}
		    }
		}
	    }, false);
	}
