$(document).ready(function() {
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    getData(chart);
    setInterval( function() { getData(chart); }, 3000 );
});

// http://www.hugbot.me/info.json


function getData(chart) {
    $.getJSON("http://www.hugbot.me/info.json", function(data) {
        console.log(data);
        $('.js_tweet-count').html(data.queue);
        var data = google.visualization.arrayToDataTable([
            ['Total', 'Status'],
            ['In Progress',      data.in_progress],
            ['Merged',      data.merged],
            ['Closed',  data.closed]
        ]);
        var options = {
            backgroundColor: '#f5f6f7'
        };
        chart.draw(data, options);
    });
}