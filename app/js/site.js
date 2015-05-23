if (!Modernizr.touch) {
    var s = skrollr.init({forceHeight: false});
}

$(document).ready(function() {
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    getData(chart);
    setInterval(getData(chart),300);
});

// http://www.hugbot.me/info.json


function getData(chart) {
    $.getJSON("http://localhost/~creinartz/hugbot-frontend/app/test.json", function(data) {
        $('.js_tweet-count').html(data.received);
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

