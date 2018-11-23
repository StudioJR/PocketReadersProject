//book loading
var data;
var search = window.location.search;
var book_src = search.replace("?","");
var book_path = "../../"+book_src+"/";
var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json_data = JSON.parse(this.responseText);
        //console.log("Json parsed data is: " + JSON.stringify(json_data));
if (json_data["type"] == "book") {
//display book information
data = json_data;
this.data = json_data;
return data;
} else {
alert("No Valid Book found");
}
       } else if (this.readyState==4&&this.status!=200) {
alert("Unfortunately there is no Book with this Name");
}
    };
xmlhttp.open("GET", book_path+"content.json", true);
xmlhttp.send();
//click gestures
var ui_overlay = 0;
var ui = document.getElementById("ui");
var screen = document.getElementsByTagName("body")[0];
screen.addEventListener("click", function () {
//show or hide ui overlay
if (ui_overlay == 0 )
{
//open
ui.style.display="initial";
ui_overlay=1;
return ui_overlay;
} else if(ui_overlay==1){
//close
ui.style.display="none";
ui_overlay=0;
return ui_overlay;
}
},true);
var file_line = 0;
var c_line_count = 21;
function pageupdate() {

var contentrequest = new XMLHttpRequest();
    contentrequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json_data = JSON.parse(this.responseText);
if (json_data["type"] == "book") {
//display book information
var pto = parseInt(localStorage.getItem("readbook_"+book_src));
var page_src = json_data["file"];
//read file
var filereader = new XMLHttpRequest();
filereader.onreadystatechange = function () {
if(this.readyState==4&&this.status==200) {
var str = this.responseText;
var viewer = document.getElementById("viewer");
 var lines = str.split(/\r\n|\r|\n/);

var c = "";
var lc = 0;
for (i=pto;i<pto+21;i++) {
if (lines[i]!=undefined && lines[i]!="") {
c = c +"<br>"+ lines[i];
lc = lc + 1;
}
}
lc = lc +3;
viewer.innerHTML=c;
c_line_count = lc;
this.c_line_count = lc;
document.getElementById("line").innerText="line: " + pto + " - " + (pto+21);
file_line = lines.length;
this.file_line=lines.length;
return file_line, c_line_count;
} else {

}
}
filereader.open("GET",book_path+page_src+".prbook",true);
filereader.send();
} else {
alert("No Valid Book found");
}
       } else if (this.readyState==4&&this.status!=200) {
alert("Unfortunately there is no Book with this Name");
}
    };
contentrequest.open("GET", book_path+"content.json", true);
contentrequest.send();
}
//default setup
if (localStorage.getItem("readbook_"+book_src) == undefined || localStorage.getItem("readbook_"+book_src) =="" || localStorage.getItem("readbook_"+book_src)==null) {
localStorage.setItem("readbook_"+book_src,0);
}
screen.addEventListener("load", function () {

//default load
pageupdate();

},true);
//TouchGestures
/*
Stackoverflow BenM :
https://stackoverflow.com/questions/15084675/how-to-implement-swipe-gestures-for-mobile-devices
*/
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;                                                        
var yDown = null;  

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
}; 

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
        /* left swipe */ 
//pagePlus
var cline = parseInt(localStorage.getItem("readbook_"+book_src));
var new_line = cline+21;


if (new_line<file_line && new_line > cline+20) {
localStorage.setItem("readbook_"+book_src,new_line);
} else {
localStorage.setItem("readbook_"+book_src,0);
}
        } else {
        /* right swipe */
//PageMinus
var cline = parseInt(localStorage.getItem("readbook_"+book_src));
var new_line = cline-c_line_count;


if (new_line<file_line && new_line >=0) {
localStorage.setItem("readbook_"+book_src,new_line);
} else {

}
                      }         
    } else {
        if ( yDiff > 0 ) {
        /* up swipe */ 
        } else { 
        /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;        
//update
             pageupdate();                       
};