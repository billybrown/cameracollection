$(document).ready(function() {

  $('#container').imagesLoaded( function(){
  		$(this).isotope({
  			itemSelector : '.item',
  		});
  });

  var $container = $('#container');

  // change size of clicked element
  $container.find('.item').live('click', function(){
  		$(this).toggleClass('large');
  		$container.isotope('reLayout');
  });

  // filter buttons
  $('#filters a').click(function(){
  		var selector = $(this).attr('data-filter');
  		$container.isotope({ filter: selector });
  		return false;
  });

  // switches selected class on buttons
  $('#options').find('.option-set a').click(function(){
  var $this = $(this);

  	// don't proceed if already selected
  	if ( !$this.hasClass('selected') ) {
  			$this.parents('.option-set').find('.selected').removeClass('selected');
  			$this.addClass('selected');
  	}
  });

  $(function(){
  		$container.isotope({
  			itemSelector : '.item'
  		});
  });

});