/*
Team Names:
CMPS3141 - HCI
PS1 - Translate Game
Due Date: Nov.10.23

COLLABORATORS: Cahlil Tillett, Duane Arzu
*/

// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var current_index;

	$(".lang1").text(lang_from);
	$(".lang2").text(lang_to);

	function randomFrom(array) {
		current_index = Math.floor(Math.random() * array.length);
		return array[current_index];
	}

	var english_words = Object.keys(current_dict);
	var spanish_words = Object.values(current_dict);

	$("#span_word").text(randomFrom(spanish_words));
	$("#input").focus();
	$("#input").autocomplete({
		source: english_words,
        minLength: 2
	});

	$("#input").on("autocompleteselect", function(event, ui) {
		event.preventDefault();
		$("#input").val(ui.item.value);
		$("#see_ans").click();
	});

	$("#input").on("keypress", function(e) { 
		if (e.keyCode == 13) {
			$("#see_ans").click();
			$("#input").autocomplete("close");
		}
	});

	$("#see_ans").on("click", function() {
		if ($("#input").val() === english_words[current_index])
			$("table tr:nth-child(2)").after("	<tr class="+"correct"+"> "+"<td><h2><span>"+ spanish_words[current_index] +"</span></h2></td>"+"<td> <h2><span>"+ $("#input").val() +"</span></h2></td>"+"<td><h3>&#x2713; </h3></td>"+"  </tr> ");
		else
			$("table tr:nth-child(2)").after("	<tr class="+"incorrect"+"> "+"<td><h2><span>"+spanish_words[current_index]+"</span></h2></td>"+"<td> <h2><s><span>"+$("#input").val()+"</span></s></h2></td>"+"<td><h2><span>"+english_words[current_index]+"</span></h2></td>"+"  </tr> ");
		
		$("#input").val("");
		$("#span_word").text(randomFrom(spanish_words));
		$("#input").focus();
	});

    });