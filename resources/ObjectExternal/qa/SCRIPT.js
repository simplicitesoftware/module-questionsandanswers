var qa = (function($) {
	var app, sec, qaa, data = { sections: null, subsections: null, questions: null, question: null };

	function breadcrumb(label) {
		var bc = $("#qa-breadcrumb");
		if (!label) {
			bc.empty();
			label = $('<a href="#"/>').append("Home").click(resetData);
		}
		bc.append($("<li/>").addClass("breadcrumb-item").append(label));

	}
	function resetData(home) {
			data.sections = null;
			data.subsections = null;
			data.questions = null;
			data.question = null;
			if (home) {
				breadcrumb();
				sec.search(function(rows) {
					data.sections = rows;
				}, { qaSecParent: "is null" });
			}
	}

	/**
	 * Render
	 * @param params Request parameters
	 * @param banner Banner URL
	 * @param pub Public?
	 * @function
	 */
	function render(params, banner, pub) {
		console.log(params);
		try {
			if (typeof Vue === 'undefined') throw 'Vue.js not available';

			if (!pub) $('#qa').css('min-height', '1000px');

			data.bannerURL = data.bannerURL || banner; // Image banner URL

			app = app || (pub
					? new Simplicite.Ajax(params.root, 'api', 'qa', 'simplicite')  // External
					: Simplicite.Application  // Internal
				);

			sec = sec || app.getBusinessObject('QASection', 'qa_QASection');
			qaa = qaa || app.getBusinessObject('QAQuestionAndAnswer', 'qa_QAQuestionAndAnswer');

			new Vue({
				el: '#qa',
				data: data,
				beforeMount: function() { resetData(false); },
				mounted: function() { resetData(true); },
				methods: {
					home: function() {
						resetData(true);
					},
					selectChapter: function(item) {
						resetData(false);
						sec.search(function(rows) {
							breadcrumb(item.qaSecNumber + " - " + item.qaSecTitle);
							data.subsections = rows;
						}, { qaSecParent: item.row_id });
					},
					selectSubChapter: function(item) {
						resetData(false);
						qaa.search(function(rows) {
							breadcrumb(item.qaSecNumber + " - " + item.qaSecTitle);
							data.questions = rows;
						}, { qaQaaChapter: item.row_id });
					},
					selectQuestion: function(item) {
						resetData(false);
						breadcrumb("Question &amp; answer");
						console.log(item);
						if (item.qaQaaDocument)
							item.qaQaaDocumentURL = app.documentURL(qaa.getName(), "qaQaaDocument", item.row_id, item.qaQaaDocument, "attachment")
						data.question = item;
					}
				}
			});
		} catch(e) {
			console.error('Render error: ' + e.message);
		}
	}

	return { render: render };	
})(jQuery);