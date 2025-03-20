

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

    return year.toString();
}

// Query the layer view for  count statistics
function queryLayerViewStats(buffer) {

    // MAKE SURE TO CONVERT ANY DATETIME FIELDS TO UTC TIME ZONE VIA THE ARCMAP TOOL 'CONVERT TIME ZONE' IN THE DATA MANAGEMENT TOOLBOX IN ARCTOOLBOX
    let dataFields = ["google_map", "location", "date", "Comment", "FID"];

    // tableData is used for tabulator table
    let tableData = [];

    let y2018 = 0, y2019 = 0, y2020 = 0, y2021 = 0, y2022 = 0, y2023 = 0, y2024 = 0, y2025 = 0;
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
                let stringifiedJSON = JSON.parse(response.features[i].attributes.location)
                for(let x in stringifiedJSON) {
                    response.features[i].attributes[x] = stringifiedJSON[x]
                }
                tableData.push(response.features[i].attributes);
                // GETS COUNT OF FEATURES BROKEN OUT BY SPECIFIED ATTRIBUTE NAME FROM DATAFIELDS ARRAY
                if (response.features[i].attributes.date) {
                    let published = response.features[i].attributes.date;
                    let date = new Date(published)
                    let formattedDate = formatDate(date);
                    switch (formattedDate) {
                        case "2018":
                            y2018++;
                            break;
                        case "2019":
                            y2019++;
                            break;
                        case "2020":
                            y2020++;
                            break;
                        case "2021":
                            y2021++;
                            break;
                        case "2022":
                            y2022++;
                            break;
                        case "2023":
                            y2023++;
                            break;
                        case "2024":
                            y2024++;
                            break;
                        case "2025":
                            y2025++;
                            break;
                    }
                } else {
                    console.log('No value found')
                }
            }


            totalSelectedFeatures = response.features.length;
            let updatedDataCount = [
                y2018,
                y2019,
                y2020,
                y2021,
                y2022,
                y2023,
                y2024,
                y2025
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
        let formattedPublishedDate = new Date(response.tableData[dict]['date']);
        response.tableData[dict]['date'] = (formattedPublishedDate.getMonth() + 1).toString() + '/' + (formattedPublishedDate.getDate()).toString() + '/' + (formattedPublishedDate.getFullYear()).toString()
    }
    tableData = response.tableData;

    // make count chart
    if (!app.chartCount) {
        // get the canvas element and use it to render the chart
        let canvasel_count = document.getElementById(canvasel1);
        app.chartCount = new Chart(canvasel_count.getContext("2d"), {
            type: "line",
            data: {
                labels: [
                    '2018',
                    '2019',
                    '2020',
                    '2021',
                    '2022',
                    '2023',
                    '2024',
                    '2025',
                ],
                datasets: [{
                    label: "My Travel Locations",
                    datalabels: {
                        color: 'black',
                        align: 'end',
                        clamp: true,
                        font: {
                            size: 10,
                            family: "'Quicksand', 'Arial', sans-serif"
                        }
                    },
                    borderColor: ["rgb(255, 36, 36)"],
                    borderWidth: 3,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                    pointBorderColor: 'rgb(0, 0, 0)',
                    pointBorderWidth: 2,
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

                },
                scales: {
                    xAxes: [{
                      display: true,
                      ticks: {
                        major: {
                          enabled: true
                        }
                      }
                    }],
                    yAxes: [{
                      id: 'y',
                      display: true,
                    }]
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
                query.where = "FID = " + "'" + row._row.data.FID + "'";
                query.outSpatialReference = app.activeView.spatialReference;
                query.returnGeometry = true;

                app.queryLayer.queryFeatures(query).then(function (results) {
                    let selectedFeature = results.features[0];

                    app.activeView.goTo({
                        target: selectedFeature.geometry,
                        zoom: 20
                    });

                    // app.activeView.popup.open({
                    //     location: selectedFeature.geometry,
                    //     features: results.features
                    // });
                });
            });
        },
        rowMouseOver: function (e, row) {
            // highlight selected feature when row is hovered
            app.activeView.whenLayerView(app.queryLayer).then(function (layerView) {

                let query = app.queryLayer.createQuery();
                query.where = "FID = " + "'" + row._row.data.FID + "'";
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
                column: "name",
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
                title: "Business Name",
                field: "name",
                sorter: "string",
                frozen: true,
                // topCalc: "count",
                // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },
            {
                title: "Address",
                field: "address",
                sorter: "string",
                frozen: false,
                // topCalc: "count",
                // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },
            {
                title: "Country Code",
                field: "country_code",
                sorter: "string",
                frozen: false,
                // topCalc: "count",
                // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },
            {
                title: "Google Map",
                field: "google_map",
                sorter: "string",
                frozen: false,
                // topCalc: "count",
                // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },
            {
                title: "Date Added",
                field: "date",
                sorter: "date",
                frozen: false,
                // topCalc: "count",
                // editor: "input",
                headerFilter: true,
                headerFilterPlaceholder: 'Filter Column'
            },

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