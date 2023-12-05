(function ($) {
  'use strict';
   /**
   * Set end date for other dates to be the same as the start.
   */
  Drupal.behaviors.recurring_events_other_dates = {
    attach: function (context, settings) {
      $('#edit-weekly-recurring-date-wrapper, #edit-monthly-recurring-date-wrapper, #edit-custom-date-wrapper').find('input.form-date').once().on('change', function (e) {
        if ($(this).attr('name').includes('[value][date]')) {
          var start_date = this;
          var parent = $(this).closest('.form-wrapper');
          $(parent).find('input.form-date').each(function (index, item) {
            if (index == 1) {
              if ($(item).val() == '') {
                $(item).val($(start_date).val());
              }
            }
          });
        }
      });
    }
  };
}(jQuery));