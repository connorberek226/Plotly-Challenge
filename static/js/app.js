// Fetch the JSON data and console log it
// d3.json("samples.json").then((data) => console.log(data));

d3.json("data/samples.json").then(function(data) {
    console.log(data);
})

function buildChart(sample) {
    
    
    d3.json("data/samples.json").then((data) =>{
            
        function filterSampleData(otu) {
            return otu.samples;
        }
        const barChartData = data.filter(filterSampleData);

        console.log(barChartData);
        var sampleArray = [];
        for (let i = 0;i < barChartData.length; i++) {
            sampleArray.push({
                "otu_ids": barChartData.otu_ids[i],
                "sample_values": barChartData.sample_values[i],
                "otu_labels": barChartData.otu_labels[i]            
            })
        }
        
        
        const sampleArraySorted = sampleArray.sort((a, b) => 
            parseFloat(b.sample_values) - parseFloat(a.sample_values)
        );
        console.log(sampleArraySorted);
        
        const barChart = [{
            labels: sampleArraySorted.map(data => data.otu_ids).slice(0,10),
            values: sampleArraySorted.map(data => data.sample_values).slice(0,10),
            type: "bar",
            name: sampleArraySorted.map(data => data.otu_labels).slice(0,10),
        }];
        
        const layout = {
            title: `Top 10 OTU from sample ${sample}`
        };
        const barPlot = document.getElementById("bar");
        Plotly.newPlot(barPlot, barChart, layout);



    });

}

console.log(buildChart())
