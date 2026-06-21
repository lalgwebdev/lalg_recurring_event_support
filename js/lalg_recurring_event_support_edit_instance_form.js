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
			const textarea = context.querySelector(
				'textarea[data-drupal-selector="edit-field-instance-description-0-value"]');			
			const editorId = textarea.dataset.ckeditor5Id;

			waitForEditor(editorId, function(editor) {
				const currenteditordesc = $('<div>').html(editor.getData()).text().trim();				
				if (currenteditordesc === '') {
					const seriesdescription = seriesdescriptionobject[0].innerHTML.replace(/<!--[\s\S]*?-->/g, '');
					editor.setData(seriesdescription);
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
