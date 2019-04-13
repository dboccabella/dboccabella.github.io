 (function(){
		document.title = "Start " + getQueryVariable("site");
        var myArrayList = [];
        var FILE_NAME = "list.csv";
		
        $(function() {

            var bigStringList, linesList, tempArrayList, tempObjectList, xhrList;

            xhrList = new XMLHttpRequest();

            xhrList.onload = function(e){
                 bigStringList = e.target.responseText;  
                 linesList = bigStringList.split("\n");

                 linesList.forEach(function(lineList){
                    tempArrayList = lineList.split(",");
                    tempObjectList = {};
                    tempObjectList.userLogin = tempArrayList[0];
                    tempObjectList.image = tempArrayList[1];
                    tempObjectList.userName = tempArrayList[2];
                    tempObjectList.userDescription = tempArrayList[3];
                    myArrayList.push(tempObjectList);
                 });

                console.log(myArrayList);
                displayLinks(myArrayList);

            }

            //xhr.open(method, path, asynch);
            xhrList.open("GET", FILE_NAME, true);
            xhrList.send();

        });


        function displayLinks(arrayList){
            var htmlList = '<i class="fa fa-plus fa-2x" aria-hidden="true"></i>'
            htmlList += '<ul class="list-unstyled">';
            arrayList.forEach(function(o){
                htmlList += '<li>';
                    htmlList += '<a alt="';
                        htmlList += o.userLogin;
                    htmlList += '" href="" target="_blank">';
                        htmlList += '<div class="user-image no-flick">';
                            htmlList += '<img src="';
                                htmlList += o.image;
                            htmlList += '">';
                        htmlList += '</div>';
                        htmlList += '<div class="name no-flick">';
                                    htmlList += o.userName;
                                htmlList += '<br>';
                                    htmlList += o.userDescription;
                        htmlList += '</div>';
                    htmlList += '</a>';
                htmlList += '</li>';

            });
            htmlList += '</ul>';

            document.getElementById("other-users").innerHTML = htmlList;
            
            $('.fa-plus').click(function() {
                $('#other-users').toggleClass('open');
            });

            $(function() {
              $('a').each(function() {
                  
                var user = $(this).attr('alt');
                  
                var fullLink = "https://" + getQueryVariable("site") + ".sumtotaldemo.net/broker/Token/Saml11.ashx?username=" + user + "&password=" + getQueryVariable("pw") + "&wa=wsignin1.0&wtrealm=https%3a%2f%2f" + getQueryVariable("site") + ".sumtotaldemo.net%2fcore%2f&wreply=https%3a%2f%2f" + getQueryVariable("site") + ".sumtotaldemo.net%2fCore%2fdash%2fhome";
                
                var checkDiv = $(this).attr("id");
                  
                var mobileLink = "https://" + getQueryVariable("site") + ".sumtotaldemo.net/Broker/Public/MobileAutoFillUrl.html?FillURL=true";
                  
                if (checkDiv == "mobileLink") {
                    $(this).attr('href', mobileLink);
                } else {
                    $(this).attr('href', fullLink); 
                };


                  
              });
            });
        }
	
    }());
