$('#countBtn').on('click', function() {
	$('#countResult').text(countLines($('#codeInput').val()) + " lines");
});


function countLines(input) {
	var count = 0;

	input = removeComments(input);

	// Split lines into array
	var lines = input.split(/\r\n|\r|\n/);

	for (var i = 0; i < lines.length; i++) {
		// Remove whitespace
		lines[i] = lines[i].replace(/\s/g,'');

		// If first character is not a //, then count as a line
		if (lines[i].length > 0) {
			var index = lines[i].indexOf("//");
			if (index !== 0) {
			    count++;
			}	
		}

	}
	return count;
};

function removeComments(input) {
	var openComment = false;
	var openDoubleQuote = false;
	var result = '';
	for(var i=0; i<input.length; i++) {

		if (input.substring(i, i+1) === '"') {
			openDoubleQuote = !openDoubleQuote;
		} else if (input.substring(i, i+1) === '\n' || input.substring(i, i+1) === '\r') {
			// New lines closes double quotes
			openDoubleQuote = false;
		}

		if (!openComment && !openDoubleQuote && input.substring(i, i+2) === "/*") {
			i++;
			openComment = true;
		} else if (openComment && input.substring(i, i+2) === "*/") {
			i++;
			openComment = false;
			// End of comments reset double quotes
			openDoubleQuote = false;
		} else if (!openComment) {
			result += input[i];
		}
	}
	return result;	
}
