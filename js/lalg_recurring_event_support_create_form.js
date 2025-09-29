(function ($) {
  'use strict';
   /**
   * Set end date for other dates to be the same as the start. Also set admin title.
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
        const inputElements = document.querySelectorAll(`#${wrapper} input.form-date`);
        inputElements.forEach(inputElement => {
          inputElement.addEventListener('change', function(e) {
            var start_date = this;
            var parent = $(this).closest('.form-wrapper');
            $(parent).find('input.form-date').each(function (index, item) {
              if (index == 1) {
                $(item).val($(start_date).val());
                adminTitle.value = ($(start_date).val()+" "+seriesTitle.value);
              }
            });
          });
        });
      });
    }
  }
}(jQuery));
