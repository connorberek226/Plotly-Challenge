// Fetch the JSON data and console log it
// d3.json("samples.json").then((data) => console.log(data));
d3.json("data/samples.json").then((data) => {
    console.log(data.samples[0]);
});



function buildChart(sample) {

    d3.json(`data/samples.json`).then((data) => {

        console.log(data.samples);

        let barChartData = [];
        for (let i = 0; i < data.samples.length; i++) {
            barChartData.push({
                "id": data.samples[i]["id"],
                "otu_ids": data.samples[i]["otu_ids"],
                "sample_values": data.samples[i]["sample_values"],
                "otu_labels": data.samples[i]["otu_labels"]
            })
        }
        console.log(barChartData);


        let barChartDataSorted = barChartData.sort((a, b) =>
            parseFloat(b.sample_values) - parseFloat(a.sample_values)
        );
        console.log(barChartDataSorted[0]["id"]);
        

        Object.keys(barChartDataSorted).forEach((key) => {
            
            if (barChartDataSorted[key]["id"] === sample) {
                var topIds = barChartDataSorted[key];
            }
        })


        console.log(barChartDataSorted);


        // const barChart = [{
        //     x: barChartData,
        //     y: `OTU ${topIDS}`,
        //     type: "bar",
        //     orientation: "h",
        //     text: otuLabels
        // }];

        // const layout = {
        //     title: `Top 10 OTU from sample ${sample}`
        // };

        // Plotly.newPlot("bar", barChart, layout);



        var bubbleData = [{
            x: data.samples["otu_ids"],
            y: data.samples["sample_values"],
            text: data.samples["otu_labels"],
            type: "scatter",
            mode: "markers",
            marker: {
                color: data.samples["otu_ids"],
                symbol: "circle",
                size: data.samples["sample_values"],
            },
        }];
        var bubbleLayout = {
            title: `<b>Biodiversity of sample ${sample}</b>`,
            xaxis: {
                title: "OTU ID",
                // range: [startDate, endDate],
            },
            yaxis: {
                title: "Value",
                // autorange: true,
                range: [0, Math.max(data.samples["sample_values"])]
                // type: "linear"
            }
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);



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
        buildMetaData(firstSample);

    });
}


function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildChart(newSample);
    buildMetaData(newSample);
}


function buildMetaData(sample) {

    d3.json("data/samples.json").then((data) => {
        console.log(data.metadata);

        var metaData = data.metadata;
        var panelBody = d3.select(".panel-body");

        panelBody.html("")

        for (let i = 0; i < 153; i++) {
            
            if (metaData[i]["id"] === sample) {
                Object.entries(metaData[i]).forEach(([key, val]) => {
                    var panelLine = panelBody.append("p");
                    panelLine.text(`${key}: ${val}`);
                })
            }
        }
        console.log(metaData[0]["id"]);

        

    })


}

init();
