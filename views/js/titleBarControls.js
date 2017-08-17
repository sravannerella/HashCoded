const $ = require('jquery');
window.$ = window.jQuery = $;
const {remote} = require('electron');
let win = remote.getCurrentWindow();

var itemIDs = 0;

$(".minimize").click(function(){
	console.log("Minimize");
	win.minimize();
});

$(".maximize").click(function(){
	if(!win.isMaximized()){
		win.maximize();
	} else {
		win.unmaximize();
	}
	
});

$(".close").click(function(){
	win.close();
});


$("#itemBar").on('click', '.tabClose', function(){
	var anchor = $(this).parent();
	console.log("THIS: ", $(this));
    $(anchor.attr('href')).remove();
	$(this).parent().parent().remove();
	var id = anchor.attr('href').substr(1, anchor.attr('href').length);
	var final;
	for (var i = 0; i < instances.length; i++) {
		if(instances[i].options.name === id){
			console.log("REMOVED", instances[i].options.name);
			instances.splice(i, 1);
			break;
		}else {
			console.log(i);
			final = i;
		}
	}

	$(".nav-tabs li").children('a').last().click();
	var val = $(".nav-tabs li").children('a').last().attr('href');
	val = $(val).find('div[id^="codeArea"]');
	val.click();
	console.log("THISIS: ", val);
});


$("#itemBar").on('click', '#item', function(e){
	e.preventDefault();
	console.log($(this).children('a').attr('href'));
	$($(this)).tab('show');
});

$("#itemBar").on('dblclick', function(){
	var id = itemIDs;
	$('#itemBar').append('<li role="presentation" id="item" class="nav-item"><a href="#new'+ id +'" aria-controls="new'+ id +'" data-toggle="tab" role="tab" class="nav-link">untitled<span class="tabClose"><i class="material-icons s18">close</i></span></a></li>');
	$('.tab-content').append('<div role="tabpanel" class="tab-pane" aria-expanded="false" id="new'+id+'"><div id="codeArea'+id+'" onclick="addInstance(this.id)" style="width: 100%;height: 100vh;"></div></div>');
	var nid = '#new'+id;
	$(nid).click();
	itemIDs = itemIDs + 1;
});