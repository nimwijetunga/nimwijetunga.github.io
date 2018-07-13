
class DrawChart{

    constructor(chart_id, config){
        this.chart_id = chart_id;
        this.config = config;
        this._drawGraph();
    }

    _drawGraph(){
        var ctx = document.getElementById(this.chart_id).getContext('2d');
        var myChart = new Chart(ctx, this.config);
    }

}