//book loading

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

} else {
alert("No Valid Book found");
}
       } else if (this.readyState==4&&this.status!=200) {
alert("Unfortunately there is no Book with this Name");
}
    };
xmlhttp.open("GET", book_path+"content.json", true);
xmlhttp.send();