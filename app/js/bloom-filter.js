var buckets;
initArray(10000000);

$('#bloomInitBtn').on('click', function() {
	buckets = initArray($('#bloomInitInput').val());
	alert("Array size has been set to " + $('#bloomInitInput').val());
});

$('#bloomAddBtn').on('click', function() {
	if ($('#bloomAddInput').val() !== '') {
		add($('#bloomAddInput').val());
		$('#addResult').text('"' + $('#bloomAddInput').val() + '" added');
		$('#bloomAddInput').val("");
	}
});


$('#bloomCheckBtn').on('click', function() {
	var value = $('#bloomCheckInput').val();
	if (value !== '') {
		if (check($('#bloomCheckInput').val())) {
			$('#checkResult').text('"' + value + '" probably exists');
			$('#checkResult').removeClass("text-danger");
			$('#checkResult').addClass("text-success");
		} else {
			$('#checkResult').text('"' + value + '" not found');
			$('#checkResult').removeClass("text-success");
			$('#checkResult').addClass("text-danger");
		}
	}
});

$('#bloomAddDictionaryBtn').on('click', function() {
	$('#bloomAddDictionaryBtn').prop('disabled', true);
	$.get( "wordlist", function( data ) {
		if (data.words) {
			for (i=0; i<data.words.length; i++) {
				add(data.words[i]);
			}
			$('#addResult').text(data.words.length + " words added");
			$('#bloomAddDictionaryBtn').prop('disabled', false);
		}
	});
});


function initArray(size) {
	buckets = new Array(size);
}

function add(value) {
	var index1 = getBucket(value, buckets.length, 0);
	buckets[index1] = true;
	var index2 = getBucket(value, buckets.length, 1);
	buckets[index2] = true;
	var index3 = getBucket(value, buckets.length, 2);
	buckets[index3] = true;
}


function check(value) {
	var index1 = getBucket(value, buckets.length, 0);
	var index2 = getBucket(value, buckets.length, 1);
	var index3 = getBucket(value, buckets.length, 2);
	if (buckets[index1] && buckets[index2] && buckets[index3]) {
		return true;
	} else {
		return false;
	}
}


// Get bucket index using murmur hash
function getBucket(str, buckets, offset) {
  var hash = murmur(str, str.length + offset);
  var bucket = hash % buckets;
  return bucket;
}




