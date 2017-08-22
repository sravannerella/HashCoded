var instances = [];
	
function addInstance(id){
	var val = false;

	if(instances.length == 0){
		val = true;
	}
	for (var i = 0; i < instances.length; i++) {
		if(instances[i].options.name === id){
			//Reset Focus or Cursor
			setTimeout(function(){
				instances[i].focus();
			}, 1);
			
			val = false;
			break;
		} else if(instances[i].options.name === id.options){
			val = false;
			break;
		} else{
			val = true;
		}
	}

	if(val){
		instances.push(id);
		var instanceId = $.inArray(id, instances);
		codeArea(instanceId);
	}
}

function codeArea(id){
	var mac = CodeMirror.keyMap.default == CodeMirror.keyMap.macDefault;
	var extraKeys = {};
	var extraKeyMaps = {
		"Ctrl-Space" : "autocomplete",
		"N": function(cm){
            	$("#itemBar").dblclick();
        },
        "W": function(cm){
            	var editorName = '#' + cm.options.name;
            	var attrId = $(editorName).parent().attr('id');
            	var find = 'a[href="#'+attrId+'"]';
            	$(find).children('span.tabClose').click()
        },
        "O": function(cm){
        	showDir("/Users/sravannerella/Documents/My Projects/HashCoded/");
        },
        "I": function(cm){
            	CodeMirror.commands.indentAuto(instances[id]);
        },
        "Q": function(cm){
        	cm.foldCode(cm.getCursor());
        }

	}

	for (var key in extraKeyMaps) {
		if (extraKeyMaps.hasOwnProperty(key)) {

			if(key.includes('Ctrl')){
				extraKeys[key] = extraKeyMaps[key];
			} else {
				var runKey = (mac ? "Cmd-" : "Ctrl-") + key;
	    		extraKeys[runKey] = extraKeyMaps[key];
			}
	  	}
	}
	
	var elementId = instances[id];
	instances[id] = CodeMirror(document.getElementById(elementId), {
		mode: 'text/html',
		profile: 'html',
		tabSize: 4,
		dragDrop: true,
		indentUnit: 4,
		indentWithTabs: true,
		lineNumbers: true,
		showCursorWhenSelecting: true,
		autofocus: true,
		matchBrackets: true,
		styleActiveLine: true,
		theme: "material",
		foldGutter: true,
    	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		lineWrapping: true,
		autoRefresh: true,
		smartIndent: true,
		lineWrapping: true,
		name: elementId,
		autoCloseBrackets: true,
		highlightSelectionMatches: {annotateScrollbar: true},
		extraKeys: extraKeys,
		fixedGutter: true
	});

	emmetCodeMirror(instances[id], {
		'Cmd-E': 'emmet.expand_abbreviation',
		'Tab': 'emmet.expand_abbreviation_with_tab',
		'Cmd-D': 'emmet.balance_outward',
		'Shift-Cmd-D': 'emmet.balance_inward',
		'Cmd-M': 'emmet.matching_pair',
		'Shift-Cmd-A': 'emmet.wrap_with_abbreviation',
		'Ctrl-Alt-Right': 'emmet.next_edit_point',
		'Ctrl-Alt-Left': 'emmet.prev_edit_point',
		'Cmd-L': function(cm){
			var line = cm.getCursor().line;
			var others = [],
				from = line, to = line + 1;

	  		function updateLine() {
		    	var ours = {
		      		anchor: CodeMirror.Pos(from, to > from ? 0 : null),
		      		head: CodeMirror.Pos(to, 0)
		    	};
		    	cm.setSelections(others.concat([ours]), others.length,
		                     {origin: "*mouse"});
	  		}
	  		updateLine();
		},
		'Cmd-Shift-M': 'emmet.merge_lines',
		'Cmd-/': 'emmet.toggle_comment',
		'Cmd-J': 'emmet.split_join_tag',
		'Cmd-K': 'emmet.remove_tag',
		'Shift-Cmd-Y': 'emmet.evaluate_math_expression',

		'Ctrl-Up': 'emmet.increment_number_by_1',
		'Ctrl-Down': 'emmet.decrement_number_by_1',
		'Ctrl-Alt-Up': 'emmet.increment_number_by_01',
		'Ctrl-Alt-Down': 'emmet.decrement_number_by_01',
		'Shift-Ctrl-Up': 'emmet.increment_number_by_10',
		'Shift-Ctrl-Down': 'emmet.decrement_number_by_10',

		'Shift-Cmd-.': 'emmet.select_next_item',
		'Shift-Cmd-,': 'emmet.select_previous_item',
		'Cmd-B': 'emmet.reflect_css_value',
		
		'Enter': 'emmet.insert_formatted_line_break_only'
	});

	instances[id].on('inputRead', function(editor, event){
		if (!editor.state.completionActive) { 
			CodeMirror.commands.autocomplete(editor, null, {completeSingle: false});
		}
	});

	var Pos = CodeMirror.Pos;

	instances[id].on("gutterClick", function(cm, line, gutter, e) {
	  // Optionally look at the gutter passed, and ignore
	  // if clicking in it means something else
		var others = e.ctrlKey || e.metaKey ? cm.listSelections() : [];
	  	var from = line, to = line + 1;

	  	if(gutter !== "CodeMirror-foldgutter"){
	  		function update() {
		    	var ours = {
		      		anchor: CodeMirror.Pos(from, to > from ? 0 : null),
		      		head: CodeMirror.Pos(to, 0)
		    	};
		    	cm.setSelections(others.concat([ours]), others.length,
		                     {origin: "*mouse"});
		  	}
		  	update();

		  	var move = function(e) {
			    var curLine = cm.lineAtHeight(e.clientY, "client");
			    if (curLine != to) {
			      to = curLine;
			      update();
			    }
			};
		  	
		  	var up = function(e) {
			    removeEventListener("mouseup", up);
			    removeEventListener("mousemove", move)
		  	};
			
			addEventListener("mousemove", move);
			addEventListener("mouseup", up);
	  	}
	});

	setTimeout(function() {
		instances[id].refresh();
		instances[id].focus();
	}, 1);
}