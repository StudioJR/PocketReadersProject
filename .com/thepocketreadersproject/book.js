var cover_img = document.getElementById("cover");
var book_name_field = document.getElementById("bookname");
var author_field = document.getElementById("author");
var desc = document.getElementById("desc");
//book loading technique
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
cover_img.src=book_path+json_data["data"]["cover"];
book_name_field.innerHTML=json_data["data"]["name"];
author_field.innerHTML="Author : "+json_data["data"]["author"];
desc.innerHTML=json_data["data"]["description"];
} else {
alert("No Valid Book found");
}
       } else if (this.readyState==4&&this.status!=200) {
alert("Unfortunately there is no Book with this Name");
}
    };
xmlhttp.open("GET", book_path+"content.json", true);
xmlhttp.send();
var start_reading_btn = document.getElementById("read");
start_reading_btn.addEventListener("click", function () {
window.location="reader.html?"+book_src;
},true);