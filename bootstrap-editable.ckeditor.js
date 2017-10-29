// Extensão do plugin X-Editable para permitir a edição de textos utilizando o componente CkEditor
// Criado por Thiago G. Miranda em 21/12/2015

(function ($) {
	"use strict";

	var CkEditable = function (options) {
		this.init('ckeditor', options, CkEditable.defaults);

		options.ckeditor = options.ckeditor || {};

		this.options.ckeditor = $.extend({}, CkEditable.defaults.ckeditor, options.ckeditor);
	};

	$.fn.editableutils.inherit(CkEditable, $.fn.editabletypes.textarea);

	$.extend(CkEditable.prototype, {
		render: function () {
			this.setClass();

			CKEDITOR.replace('editor_input');
		},

		//using `white-space: pre-wrap` solves \n  <--> BR conversion very elegant!
		
		value2html: function(value, element) {
			 var html = '', lines;
			 if(value) {
				 lines = value.split("\n");
				 for (var i = 0; i < lines.length; i++) {
					 lines[i] = $('<div>').html(lines[i]).html();
				 }
				 html = lines.join('<br />');
			 }
			 $(element).html(html);
		 },
		
		 html2value: function(html) {
			 if(!html) {
				 return '';
			 }

			 return html;
		 },

		 value2input: function (value) {
		 	CKEDITOR.on("instanceReady", function(event)
			{
		 		CKEDITOR.instances.editor_input.setData(value);
			});
		 },

		 input2value: function () {
		 	return CKEDITOR.instances.editor_input.getData();
		 },

		 destroy: function () {
		 	if (this.$input) {
		 		if (CKEDITOR.instances.editor_input) {
		 			CKEDITOR.instances.editor_input.destroy();
		 		}
		 	}
		 }
	});

	CkEditable.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
		/**
        @property tpl
        @default <textarea></textarea>
        **/
		tpl: '<textarea id="editor_input"></textarea>',
		/**
        @property inputclass
        @default input-large
        **/
		inputclass: 'ckeditor-input',
		/**
        Placeholder attribute of input. Shown when input is empty.
        @property placeholder
        @type string
        @default null
        **/
		placeholder: null,
		/**
        Number of rows in textarea
        @property rows
        @type integer
        @default 7
        **/
		rows: 7
	});

	$.fn.editabletypes.ckeditor = CkEditable;
}(window.jQuery));
