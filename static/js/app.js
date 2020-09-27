// Fetch the JSON data and console log it
// d3.json("samples.json").then((data) => console.log(data));
d3.json("data/samples.json").then((data) => {
    console.log(data.samples[0]);
});

function buildChart(sample) {
    
    
    
    d3.json(`data/samples.json`).then((data) => {
        
        // console.log(data);

        console.log(data.samples);

        

        let barChartData = [];
        for (let i = 0; i < data.samples.length; i++) {
            barChartData.push({
                "otu_ids": data.samples[i]["otu_ids"],
                "sample_values": data.samples[i]["sample_values"],
                "otu_labels": data.samples[i]["otu_labels"]
            })
        }
        console.log(barChartData);
        const barChartDataSorted = barChartData.sort((a, b) => 
            parseFloat(b.sample_values) - parseFloat(a.sample_values)
        );
        // console.log(barChartDataSorted);

        const topIDS = barChartDataSorted.map(d => d.otu_ids).slice(0,10);
        const topSampleValues = barChartDataSorted.map(d => d.sample_values).slice(0,10);
        const otuLabels = barChartDataSorted.map(d => d.otu_labels).slice(0,10);
        // console.log(topIDS);
        // console.log(topSampleValues);
        // console.log(otuLabels)
        
        const barChart = [{
            x: topSampleValues,
            y: topIDS,
            type: "bar",
            orientation: "h",
            text: otuLabels
        }];
        
        const layout = {
            title: `Top 10 OTU from sample ${sample}`
        };
        
        Plotly.newPlot("bar", barChart, layout);

      



    });

}

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("data/samples.json").then((sampleNames) => {
        
        sampleNames.names.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      console.log(sampleNames.names[0]);
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames.names[0];
      buildChart(firstSample);
      
    });
}


function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildChart(newSample);
    buildMetadata(newSample);
 }
  
init();
