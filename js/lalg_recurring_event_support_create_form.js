(function ($) {
  'use strict';
   /**
   * Set end date for other dates to be the same as the start.
   */
  Drupal.behaviors.recurring_events_other_dates = {
    attach: function (context, settings) {
      const wrappers = [
        'edit-weekly-recurring-date-wrapper',
        'edit-monthly-recurring-date-wrapper',
        'edit-custom-date-wrapper'
      ];
      wrappers.forEach(wrapper => {
        const inputElements = document.querySelectorAll(`#${wrapper} input.form-date`);
        inputElements.forEach(inputElement => {
          inputElement.addEventListener('change', function(e) {
            var start_date = this;
            var parent = $(this).closest('.form-wrapper');
            $(parent).find('input.form-date').each(function (index, item) {
              if (index == 1) {
                if ($(item).val() == '') {
                  $(item).val($(start_date).val());
                }
              }
            });
          });
        });
      });
    }
  }
}(jQuery));
