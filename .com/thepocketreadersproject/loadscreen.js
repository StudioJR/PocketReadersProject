var search_btn = document.getElementById("search");
var book_name_ipf = document.getElementById("name");
search_btn.addEventListener("click", function () {
check()
},true);
function check() {
var loc = book_name_ipf.value + "/content.json";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json_data = JSON.parse(this.responseText);
        //console.log("Json parsed data is: " + JSON.stringify(json_data));
if (json_data["type"] == "book") {
window.location=".com/thepocketreadersproject/book.html?"+book_name_ipf.value;
} else {
alert("No Valid Book found");
}
       } else if (this.readyState==4&&this.status!=200) {
alert("Unfortunately there is no Book with this Name");
}
    };
xmlhttp.open("GET", loc, true);
xmlhttp.send();


}