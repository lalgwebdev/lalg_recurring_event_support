(function ($) {
  'use strict';

  /**
   * Set end date and time for other dates/times to be the same as the start. 
   * Also set admin title.
   */
  Drupal.behaviors.recurring_events_other_dates = {
    attach: function (context, settings) {
      const wrappers = [
  	    'edit-daily-recurring-date-wrapper',
  	    'edit-weekly-recurring-date-wrapper',
  	    'edit-monthly-recurring-date-wrapper',
  	    'edit-custom-date-wrapper'
  	  ];

  	  wrappers.forEach(wrapper => {
  	    const adminTitle = document.querySelector(`#${'edit-title-wrapper'} input.form-text`);
        const seriesTitle = document.querySelector(`#${'edit-field-series-title-wrapper'} input.form-text`);
  	    const dateInput = document.querySelector(`#${wrapper} input.form-date`);
  	    const timeSelect = document.querySelector(`#${wrapper} select[data-drupal-selector$="time"]`);

  	    dateInput.addEventListener('change', function(e) {
  		  var parent = $(this).closest('.fieldset__wrapper');
  		  var newValue = $(this).val(); 
		  $(parent).find('input.form-date:eq(1)').val(newValue);
		  adminTitle.value = (newValue + " " + seriesTitle.value);
		});
		if(timeSelect) {
          timeSelect.addEventListener('change', function(e) {
		    var parent = $(this).closest('.fieldset__wrapper');
		    var newValue = $(this).val(); 
		    $(parent).find('select[data-drupal-selector$="time"]:eq(1)').val(newValue);
	      });
        }
	  });
    }
  }
}(jQuery));
