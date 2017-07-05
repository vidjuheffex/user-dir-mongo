var core = (function(){
    let get =  function(url){
        return new Promise(function(success, fail){
            let req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.addEventListener("load", function(){
                if (req.status < 400){
                    success(req.responseText);
                }
                else{
                    fail(new Error("Request failed: " + req.statusText));
                }
            });
            req.addEventListener("error", function(){
                fail(new Error("Network error"));
            });
            req.send(null);
        });
    };

    return {
        get: get
    };
})();


