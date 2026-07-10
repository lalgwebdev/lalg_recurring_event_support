(function ($, Drupal) {
	'use strict';
	
	Drupal.behaviors.pre_populate_instance_fields = {
		attach: function (context) {

			const seriestitleobject = $('.views-field-field-series-title .field-content');
			const instancetitleobject = $('input[data-drupal-selector="edit-field-instance-title-0-value"]');					

			if (seriestitleobject.length && instancetitleobject.length && instancetitleobject.val().trim() === '') {
				instancetitleobject.val(seriestitleobject.text());
			}

			const seriesdescriptionobject = $('.views-field-field-series-description .field-content');
			const textareaDescription = context.querySelector(
				'textarea[data-drupal-selector="edit-field-instance-description-0-value"]');
			const editorIdDescription = textareaDescription.dataset.ckeditor5Id;

			waitForEditor(editorIdDescription, function(editor) {
				const currenteditordesc = $('<div>').html(editor.getData()).text().trim();
				if (currenteditordesc === '') {
					const seriesdescription = seriesdescriptionobject[0].innerHTML.replace(/<!--[\s\S]*?-->/g, '');
					editor.setData(seriesdescription);
				}
			});

            const seriesbookingobject = $('.views-field-field-series-booking-details .field-content');
            const textareaBooking = context.querySelector(
				'textarea[data-drupal-selector="edit-field-instance-booking-details-0-value"]');
            const editorIdBooking = textareaBooking.dataset.ckeditor5Id;

            waitForEditor(editorIdBooking, function(editor) {
                const currenteditordesc = $('<div>').html(editor.getData()).text().trim();
                if (currenteditordesc === '') {
					const seriesbooking = seriesbookingobject[0].innerHTML.replace(/<!--[\s\S]*?-->/g, '');
					editor.setData(seriesbooking);
				}
            });

			const seriescontactobject = $('.views-field-field-series-contact-details .field-content');
            const textareaContact = context.querySelector(
				'textarea[data-drupal-selector="edit-field-instance-contact-details-0-value"]');
            const editorIdContact = textareaContact.dataset.ckeditor5Id;

            waitForEditor(editorIdContact, function(editor) {
                const currenteditordesc = $('<div>').html(editor.getData()).text().trim();
                if (currenteditordesc === '') {
					const seriescontact = seriescontactobject[0].innerHTML.replace(/<!--[\s\S]*?-->/g, '');
					editor.setData(seriescontact);
				}
            });
	  	}
	}

	function waitForEditor(id, callback) {
		const timer = setInterval(() => {
			const editor = Drupal.CKEditor5Instances.get(id);
			if (editor) {
				clearInterval(timer);
				callback(editor);
			}
		}, 100);
	}
}(jQuery, Drupal));
