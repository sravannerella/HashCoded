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

$("#titleLogo").hover(function(){
	$("#titleLogo").attr("src", "../img/logo2.png");
});

$("#titleLogo").mouseleave(function(){
	$("#titleLogo").attr("src", "../img/logo.png");
});

$("#itemBar").on('click', '.tabClose', function(){
	var anchor = $(this).parent();
    $(anchor.attr('href')).remove();
	$(this).parent().parent().remove();
	var id = anchor.attr('href').substr(1, anchor.attr('href').length);
	var final;
	for (var i = 0; i < instances.length; i++) {
		if(instances[i].options.name === id){
			instances.splice(i, 1);
			break;
		}else {
			final = i;
		}
	}

	$(".nav-tabs li").children('a').last().click();

	if( $(".nav-tabs li").children('a').length === 0 ) {
		$("#itemBar").dblclick();
	} else {
		var val = $(".nav-tabs li").children('a').last().attr('href');
		val = $(val).find('div[id^="codeArea"]');
		val.click();
	}
});

// Resizing the sidebar
var min = 150;
var max = 3600;
var mainmin = 200;

$('.resizeBar').mousedown(function (e) {
    e.preventDefault();
    $(document).mousemove(function (e) {
        e.preventDefault();
        var x = e.pageX - $('.sidebar').offset().left;
        if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {  
          $('.sidebar').css("width", x);
          $('.mainTabs').css("margin-left", x);
        }
    })
});
$(document).mouseup(function (e) {
    $(document).unbind('mousemove');
});


$("#itemBar").on('click', '#item', function(e){
	e.preventDefault();
	$($(this)).tab('show');
	var id = $(this).children('a').attr('href');
	try{
		$(id).children('div[id^="codeArea"]').click();
	} catch(err){
		// console.log("nothing");
	}
	
});

$("#itemBar").on('dblclick', function(){
	var id = itemIDs;
	$('#itemBar').append('<li role="presentation" id="item" class="nav-item"><a href="#new'+ id +'" aria-controls="new'+ id +'" data-toggle="tab" role="tab" class="nav-link">untitled<span class="tabClose"><i class="material-icons s18">close</i></span></a></li>');
	$('.tab-content').append('<div role="tabpanel" class="tab-pane" aria-expanded="false" id="new'+id+'"><div id="codeArea'+id+'" onclick="addInstance(this.id)" style="width: 100%;height: 100vh;"></div></div>');
	var nid = '#new'+id;
	$(nid).click();
	itemIDs = itemIDs + 1;
});