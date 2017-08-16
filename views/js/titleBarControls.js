const $ = require('jquery');
window.$ = window.jQuery = $;
const {remote} = require('electron');
let win = remote.getCurrentWindow();

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
    $(anchor.attr('href')).remove();
	$(this).parent().parent().remove();
	$(".nav-tabs li").children('a').first().click();
});


$("#itemBar").on('click', '#item', function(e){
	e.preventDefault();
	console.log($(this).children('a').attr('href'));
	$($(this)).tab('show');
});

$("#itemBar").on('dblclick', function(){
	var id = $("#itemBar").children().length;
	$('#itemBar').append('<li role="presentation" id="item" class="nav-item"><a href="#new'+ id +'" aria-controls="new'+ id +'" data-toggle="tab" role="tab" class="nav-link">untitled<span class="tabClose"><i class="material-icons s18">close</i></span></a></li>');
	$('.tab-content').append('<div role="tabpanel" class="tab-pane" aria-expanded="false" id="new'+id+'"><p>Text'+id+'</p></div>');
	var nid = '#new'+id;
	$(nid).click();
});