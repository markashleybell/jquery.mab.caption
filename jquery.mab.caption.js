///////////////////////////////////////////////////////////////////////////////////////////
// Captions 1.0
// Version 1.0
// @requires jQuery v1.3.2
// 
// Copyright (c) 2009 Mark Ashley Bell
// Examples and docs at: http://markashleybell.com/jquery/jquery.caption.html
// 
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
///////////////////////////////////////////////////////////////////////////////////////////

(function($)
{
    $.fn.caption = function(settings)
    {
        var config = { 'toolTip': true };

        if (settings) $.extend(config, settings);
        
        if(!window.$CaptionInfo)
        {
        	$('body').append('<div id="captioninfo"></div>');
        	
        	window.$CaptionInfo = {
									obj: null,
									offsetX: 0,
									offsetY: 0
								};
	
			$CaptionInfo.obj = $('#captioninfo');
			$CaptionInfo.obj.hide();
		}
        
        this.each(function()
        {
			var img = $(this);
	        var cls = img.attr('class');
	        var caption = img.attr('alt');
	        
	        img.after('<div style="margin-left:' + img.css('marginLeft') + '; width: ' + (img.width() + 2) + 'px;" class="' + cls + '"><p>' + caption + '</p></div>');
	        
	        if(config['toolTip'] && img.attr('longdesc') && img.attr('longdesc') != '')
	        {
		        img.bind('mouseover', function(){
		        	$CaptionInfo.obj.html('<p>' + $(this).attr('longdesc') + '</p>');
		        	$CaptionInfo.offsetX = ($CaptionInfo.obj.width() + 10);
					$CaptionInfo.offsetY = ($CaptionInfo.obj.height() + 10);
		        	$CaptionInfo.obj.show();
		        });
		        
		        img.bind('mousemove', function(e){
		        	$CaptionInfo.obj.css({ 'top': (e.pageY - $CaptionInfo.offsetY) + 'px', 'left': (e.pageX - $CaptionInfo.offsetX) + 'px',});
		        });
		        
		        img.bind('mouseout', function(){
		        	$CaptionInfo.obj.hide();
		        });
	        }
        });

        return this;
    };

})(jQuery);