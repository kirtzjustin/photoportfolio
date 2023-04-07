

// returns number-string with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// FEATURE COUNT QUERY

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function formatDate(date) {
    let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + year;
}

// Query the layer view for  count statistics
function queryLayerViewStats(buffer) {

    // MAKE SURE TO CONVERT ANY DATETIME FIELDS TO UTC TIME ZONE VIA THE ARCMAP TOOL 'CONVERT TIME ZONE' IN THE DATA MANAGEMENT TOOLBOX IN ARCTOOLBOX
    let dataFields = ["Google Map", "Location", "Published", "Title", "Updated"];

    // tableData is used for tabulator table
    let tableData = [];

    let june18 = 0, july18 = 0, aug18 = 0, sep18 = 0, oct18 = 0, nov18 = 0, dec18 = 0, jan19 = 0, feb19 = 0, mar19 = 0, may19 = 0;

    // let statsToQuery = ['avg']; 
 
    // let statDef = [];
    // // create stats definition array
    // for (let i = 0; i < statsToQuery.length; i++) {
    //     let currentStat = statsToQuery[i];
    //     dataFields.forEach(function (fieldName) {
    //         statDef.push({
    //             onStatisticField: fieldName,
    //             outStatisticFieldName: fieldName + "_" + currentStat.toUpperCase(),
    //             statisticType: currentStat
    //         })
    //     })
    // }
    // query statistics for features only in buffer polygon
    try {

        // query layerview to get total of each month/year date published

        return app.queryLayerView.queryFeatures({
            // returns count of features and also populates tabulator table
            geometry: buffer,
            outFields: dataFields,
            returnGeometry: true
        }).then(function (response) {

            for (var i in response.features) {
                // create array of attribute objects for tabulator table
                tableData.push(response.features[i].attributes);
                // GETS COUNT OF FEATURES BROKEN OUT BY SPECIFIED ATTRIBUTE NAME FROM DATAFIELDS ARRAY
                if (response.features[i].attributes.Published) {
                    let published = response.features[i].attributes.Published;
                    let date = new Date(published)
                    let formattedDate = formatDate(date);
                    switch (formattedDate) {
                        case 'June 2018':
                            june18++;
                            break;
                        case 'July 2018':
                            july18++;
                            break;
                        case 'August 2018':
                            aug18++;
                            break;
                        case 'September 2018':
                            sep18++;
                            break;
                        case 'October 2018':
                            oct18++;
                            break;
                        case 'November 2018':
                            nov18++;
                            break;
                        case 'December 2018':
                            dec18++;
                            break;
                        case 'January 2019':
                            jan19++;
                            break;
                        case 'February 2019':
                            feb19++;
                            break;
                        case 'March 2019':
                            mar19++;
                            break;
                        case 'May 2019':
                            may19++;
                            break;
                    }
                } else {
                    console.log('No value found')
                }
            }

            totalSelectedFeatures = response.features.length;
            let updatedDataCount = [
                june18,
                july18,
                aug18,
                sep18,
                oct18,
                nov18,
                dec18,
                jan19,
                feb19,
                mar19,
                may19
            ];

            return {
                updatedDataCount: updatedDataCount,
                // totalWells_count: totalSelectedFeatures,
                tableData: tableData,
                titleCount: "Total: " + totalSelectedFeatures.toString() + " Features",
            };
        })

    } catch (error) {
        console.log('Error Message - Count Chart: ', error.message);
    }
}

function updateCharts(
    response,
    canvasel1
) {
    // feature count and table
    let updatedDataCount = response.updatedDataCount;
    let titleCount = response.titleCount;
    let tableData;
    // converts JSON date to formatted date for tabulator table
    for (var dict in response.tableData) {
        let formattedPublishedDate = new Date(response.tableData[dict]['Published']);
        let formattedUpdatedDate = new Date(response.tableData[dict]['Updated']);
        response.tableData[dict]['Published'] = (formattedPublishedDate.getMonth() + 1).toString() + '/' + (formattedPublishedDate.getDate()).toString() + '/' + (formattedPublishedDate.getFullYear()).toString()
        response.tableData[dict]['Updated'] = (formattedUpdatedDate.getMonth() + 1).toString() + '/' + (formattedUpdatedDate.getDate()).toString() + '/' + (formattedUpdatedDate.getFullYear()).toString()
    }
    tableData = response.tableData;

    // make count chart
    if (!app.chartCount) {
        // get the canvas element and use it to render the chart
        let canvasel_count = document.getElementById(canvasel1);
        app.chartCount = new Chart(canvasel_count.getContext("2d"), {
            type: "pie",
            data: {
                labels: ['June 2018',
                    'July 2018',
                    'August 2018',
                    'September 2018',
                    'October 2018',
                    'November 2018',
                    'December 2018',
                    'January 2019',
                    'February 2019',
                    'March 2019',
                    'May 2019'
                ],
                datasets: [{
                    label: "My Travel Locations",
                    datalabels: {
                        color: 'black',
                        align: 'center',
                        clamp: true,
                        font: {
                            size: 10,
                            family: "'Quicksand', 'Arial', sans-serif"
                        }
                    },
                    
                    backgroundColor: ["rgb(255, 255, 120)", "rgb(255, 180, 120)", "rgb(80, 255, 120)", "rgb(190, 180, 235)", 'rgb(255, 140, 0)', 'rgb(54,171,51)', 'rgb(190, 26, 235)', 'rgb(178, 178, 178)', 'rgb(45,211,21)', 'rgb(77,22,222)', 'rgb(90,0,175)'],
                    borderColor: ["rgb(255, 255, 255)"],
                    borderWidth: 1,
                    data: updatedDataCount
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: "bottom",
                    labels: {
                        
                        fontColor: 'rgb(23, 43, 94)',
                        fontFamily: "'Quicksand', 'Arial', sans-serif"
                    },
                    onHover: function (e) {
                        e.target.style.cursor = 'pointer';
                    }
                },
                title: {
                    display: true,
                    text: titleCount,
                    
                    fontColor: 'rgb(0, 138, 80)',
                    fontFamily: "'Quicksand', 'Arial', sans-serif"
                },
                animation: {
                    easing: 'easeOutBounce',
                    duration: 1250,
                    onComplete: function () {
                        app.chartCount.options.animation.easing = 'easeOutCubic';
                        app.chartCount.options.animation.duration = 1000;
                        app.queryingIndicatorContainer.classList.add('noVisibility');
                    }


                },
                tooltips: {
                    callbacks: {
                        // This formats the label to display both number of features and percentage of total features
                        label: (tooltipItem, data) => {
                            // 'label' is line with colorded box legend                          
                            let dataIndex = tooltipItem.index;
                            let value = data.datasets[0].data[dataIndex];
                            return [value + ' Features'];
                        },
                        afterLabel: (tooltipItem, data) => {
                            // this displays percentage of total text after 'label' line
                            //get the concerned dataset
                            let dataset = data.datasets[tooltipItem.datasetIndex];
                            //calculate the total of this data set
                            let total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                            //get the current items value
                            let currentValue = dataset.data[tooltipItem.index];
                            //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                            let percentage = Math.round(((currentValue / total) * 100));

                            return percentage + "% Of Total Selected Features";
                        },
                        title: (tooltipItem, data) => {
                            let dataIndex = tooltipItem[0].index;
                            let label = data.labels[dataIndex];
                            return label;
                        }
                    }

                }
            }
        });
    } else {
        app.chartCount.options.title.text = titleCount;
        app.chartCount.data.datasets[0].data = updatedDataCount;
        app.chartCount.update();
    }

    //Trigger setFilter function with correct parameters
    function updateFilter() {
        let filter = $("#filter-field").val();
        app.statsTable.setFilter(filter, $("#filter-type").val(), $("#filter-value").val());
    }

    // returns an HTML element to put zoom icon in table cell
    var zoomIcon = () => "<span class=\"esri-icon esri-icon-zoom-in-magnifying-glass\" aria-hidden=\"true\" title=\"Zoom To Feature\"></span>"

    // update group results by method on change
    function setGroupResultsBy(evt) {
        let filter = evt.currentTarget.value;
        app.statsTable.setGroupBy(filter);
    }

    //Update filters on value change
    $("#filter-field, #filter-type").change(updateFilter);
    $("#filter-value").keyup(updateFilter);
    $("#groupByFilter").change(setGroupResultsBy);

    //Clear filters on "Clear Filters" button click
    $("#filterClear").click(function () {
        $("#filter-field").val("");
        $("#filter-type").val("like");
        $("#filter-value").val("");
        $("#groupByFilter").val("");

        app.statsTable.clearFilter();
    });

    //define attribute table
    app.statsTable = new Tabulator("#jhkTable", { 
        data: tableData,
        height: 450,
        layout: "fitDataFill",
        selectable: 1,
        placeholder: "No Features Available In Specified Area",
        pagination: "local",
        paginationSize: 20,
        groupBy: '',
        groupClosedShowCalcs: true,
        columnCalcs: 'both',
        downloadConfig: {
            columnGroups: true,
            rowGroups: true, //include row groups in download
            columnCalcs: true, //include column calculation rows in download
        },
        paginationSizeSelector: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        rowClick: function (e, row) {
            // WHEN ROW IS CLICKED, ZOOM TO SELECTED FEATURE AND DISPLAY POPUP
            app.activeView.whenLayerView(app.queryLayer).then(function (layerView) {

                let query = app.queryLayer.createQuery();
                query.where = "Title = " + "'" + row._row.data.Title + "'";
                query.outSpatialReference = app.activeView.spatialReference;
                query.returnGeometry = true;

                app.queryLayer.queryFeatures(query).then(function (results) {
                    let selectedFeature = results.features[0];

                    app.activeView.goTo({
                        target: selectedFeature.geometry,
                        zoom: 20
                    });

                    app.activeView.popup.open({
                        location: selectedFeature.geometry,
                        features: results.features
                    });
                });
            });
        },
        rowMouseOver: function (e, row) {
            // highlight selected feature when row is hovered
            app.activeView.whenLayerView(app.queryLayer).then(function (layerView) {

                let query = app.queryLayer.createQuery();
                query.where = "Title = " + "'" + row._row.data.Title + "'";
                query.outSpatialReference = app.activeView.spatialReference;
                query.returnGeometry = true;

                layerView.queryFeatures(query).then(function (results) {
                    let graphic = results.features[0];
                    app.activeView.graphics.removeAll();
                    app.selectedTableFeature.geometry = graphic.geometry;
                    app.activeView.graphics.add(app.selectedTableFeature);
                });
            });
        },
        rowMouseLeave: function (e, row) {
            // remove highlight box graphic when user stops hovering over table row
            app.activeView.graphics.removeAll();
        },
        initialSort: [{
                column: "Title",
                dir: "asc"
            }, //sort by this first
            // { column: "SAMPLETYPE", dir: "asc" }, //then sort by this second
        ],
        columns: [{
                // row of zoom icons to allow user to zoom to selected feature. does not download to exported spreadsheet
                title: 'Zoom',
                align: "center",
                formatter: zoomIcon,
                headerSort: false,
                download: false,
                frozen: true
            },
            {
                title: "Title",
                field: "Title",
                sorter: "string",
                frozen: true,
                download: false,
                topCalc: "count",
                // // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },
            {
                title: "Location",
                field: "Location",
                sorter: "string",
                frozen: false,
                // topCalc: "count",
                // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },
            {
                title: "Google Map",
                field: "Google_Map",
                sorter: "string",
                frozen: false,
                // topCalc: "count",
                // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },
            {
                title: "Published",
                field: "Published",
                sorter: "string",
                frozen: false,
                // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },
            {
                title: "Updated",
                field: "Updated",
                sorter: "string",
                // editor: "input",
                headerFilter: true,
                frozen: false,
                headerFilterPlaceholder: 'Filter Column'
            }
        ]
    });

    //trigger download of data.xlsx/csv file
    var xlsxButton = document.getElementById("downloadXlsx");
    var csvButton = document.getElementById('downloadCsv');

    // var pdfButton = document.getElementById('download-pdf');
    xlsxButton.onclick = function () {
        app.statsTable.download("xlsx", "data.xlsx", {
            sheetName: "My Data"
        });
    };
    csvButton.onclick = function () {
        app.statsTable.download("csv", "data.csv");
    };
}