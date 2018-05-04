$("#ageForm").submit(function (e) {
    e.preventDefault();

    var age = $("#ageInput").val();
    var uri = 'https://query.wikidata.org/sparql?format=json&query=';
    var query = 'SELECT distinct ?item ?birth ?birth_name ?death ?age WHERE {?item (wdt:P31/wdt:P279*) wd:Q5. ?item wdt:P1477 ?birth_name. ?item wdt:P569 ?birth. ?item wdt:P570 ?death. bind( year(?death)-year(?birth) as ?age )FILTER(?age=' + age + ')}LIMIT 100';

    var requestUri = uri + query;
    
    $.ajax({
        type: 'GET',
        url: requestUri,
        success: function (response){
            var html = '<table border="1" id="customers">';

            response.head.vars.forEach(element => {
                html = html.concat("<th>");
                html = html.concat(element);
                html = html.concat("</th>");
            });

            response.results.bindings.forEach(element => {
                html = html.concat("<tr>");
                html = html.concat("<td>");
                html = html.concat(element.item.value);
                html = html.concat("</td>");

                html = html.concat("<td>");
                html = html.concat(element.birth_name.value);
                html = html.concat("</td>");

                html = html.concat("<td>");
                html = html.concat(element.birth.value);
                html = html.concat("</td>");

                html = html.concat("<td>");
                html = html.concat(element.death.value);
                html = html.concat("</td>");

                html = html.concat("<td>");
                html = html.concat(element.age.value);
                html = html.concat("</td>");
                html = html.concat("</tr>");
            });

            html = html.concat("</table>");
            $("#resultsDiv").html(html);
            console.log(response);            
        },
        error: function (a,b,c){
            console.log(a);            
        }
    });
});