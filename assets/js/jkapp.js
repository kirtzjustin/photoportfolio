let app;
require([
  "esri/config",
  "esri/portal/Portal",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/widgets/Search",
  "esri/widgets/BasemapGallery",
  "esri/widgets/BasemapToggle",
  "esri/widgets/LayerList",
  "esri/widgets/CoordinateConversion",
  "esri/widgets/Home",
  "esri/widgets/Print",
  "esri/widgets/Legend",
  "esri/widgets/Track",
  "esri/widgets/ScaleBar",
  "esri/widgets/Bookmarks",
  "esri/widgets/Popup",
  "esri/widgets/Editor",
  "esri/widgets/FeatureTable",
  "esri/widgets/ElevationProfile",
  "esri/core/reactiveUtils",
  "esri/geometry/SpatialReference",
  "esri/geometry/Point",
  "esri/widgets/CoordinateConversion/support/Conversion",
  "esri/widgets/CoordinateConversion/support/Format",
  "esri/geometry/geometryEngine",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/widgets/DirectLineMeasurement3D",
  "esri/widgets/AreaMeasurement3D",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/widgets/Sketch",
  // "esri/rest/Locator",
  "esri/tasks/GeometryService",
  "esri/rest/support/ProjectParameters",
  "esri/widgets/Measurement",
  // Calcite-maps
  // "calcite-maps/calcitemaps-v0.8",
  // "calcite-maps/calcitemaps-arcgis-support-v0.8",
  // Bootstrap
  //"bootstrap/Collapse",
  //"bootstrap/Dropdown",
  //"bootstrap/Tab",
  //"dojo/domReady!"
], function (
  esriConfig,
  Portal,
  WebMap,
  MapView,
  SceneView,
  Search,
  BasemapGallery,
  BasemapToggle,
  LayerList,
  CoordinateConversion,
  Home,
  Print,
  Legend,
  Track,
  ScaleBar,
  Bookmarks,
  Popup,
  Editor,
  FeatureTable,
  ElevationProfile,
  reactiveUtils,
  SpatialReference,
  Point,
  Conversion,
  Format,
  geometryEngine,
  Graphic,
  GraphicsLayer,
  DirectLineMeasurement3D,
  AreaMeasurement3D,
  DistanceMeasurement2D,
  AreaMeasurement2D,
  SketchViewModel,
  Sketch,
  // Locator,
  GeometryService,
  ProjectParameters,
  Measurement
) {
  // App
  app = {
    // zoom: 1,
    // center: [-40,40],
    basemap: "satellite",
    viewPadding: {
      top: 10,
      bottom: 0,
    },
    uiPadding: {
      top: 15,
      bottom: 15,
    },
    map: null,
    overviewMap: null,
    overviewMapView: null,
    overviewMapSceneView: null,
    overviewMapBasemapToggle: null,
    overviewMapBasemapToggleSceneView: null,
    overviewMapScaleBar: null,
    extentIndicator: null,
    overviewMapToggleBox: null,
    mapView: null,
    sceneView: null,
    activeView: null,
    // mapViewNav: null,
    // sceneViewNav: null,
    searchWidgetNav: null,
    containerMap: "mapViewDiv",
    containerScene: "sceneViewDiv",
    home: null,
    defaultHomeViewPoint: null,
    track: null,
    scaleBar: null,
    basemapGallery: null,
    legend: null,
    layerList: null,
    bookmarksWidget: null,
    bookmarksWidgetListItem: null,
    addCustomBookmark: null,
    bookmarksWidget3dWarningText: null,
    bookmarkCounter: 1,
    coordinateConversion: null,
    newCoordFormat: null,
    coordinateConversionSearchPattern: /-?\d+[\.]?\d*/,
    measureWidget2D: null,
    measureWidget3D: null,
    eventListener2DMeasureWidgetDistance: null,
    eventListener2DMeasureWidgetArea: null,
    eventListener3DMeasureWidgetDistance: null,
    eventListener3DMeasureWidgetArea: null,
    measureWidgetButtons2D: null,
    measureWidgetButtons3D: null,
    sketchWidget: null,
    sketchWidgetGraphicsLayer: null,
    sketchWidgetSketchViewModel: null,
    sketchWidgetPointSymbol: null,
    sketchWidgetPolylineSymbol: null,
    sketchWidgetPolygonSymbol: null,
    pointStyles: null,
    polylineStyles: null,
    polygonStyles: null,
    pointSymbolButtonColor: null,
    pointSymbolButtonOpacity: null,
    pointSymbolButtonStyle: null,
    pointSymbolButtonSize: null,
    pointSymbolButtonOutlineColor: null,
    pointSymbolButtonOutlineColorOpacity: null,
    pointSymbolButtonOutlineWidth: null,
    polylineSymbolButtonColor: null,
    polylineSymbolButtonOpacity: null,
    polylineSymbolButtonStyle: null,
    polylineSymbolButtonWidth: null,
    polygonSymbolButtonColor: null,
    polygonSymbolButtonOpacity: null,
    polygonSymbolButtonStyle: null,
    polygonSymbolButtonOutlineColor: null,
    polygonSymbolButtonOutlineColorOpacity: null,
    polygonSymbolButtonOutlineWidth: null,
    pointSymbolButtonColorValue: null,
    pointSymbolButtonStyleValue: null,
    pointSymbolButtonSizeValue: null,
    pointSymbolButtonOutlineColorValue: null,
    pointSymbolButtonOutlineWidthValue: null,
    polylineSymbolButtonColorValue: null,
    polylineSymbolButtonStyleValue: null,
    polylineSymbolButtonWidthValue: null,
    polygonSymbolButtonColorValue: null,
    polygonSymbolButtonStyleValue: null,
    polygonSymbolButtonOutlineColorValue: null,
    polygonSymbolButtonOutlineWidthValue: null,
    printWidget: null,
    printWidgetDiv: null,
    selectedTableFeature: null,
    queryGraphicsLayer: null,
    querySketchWidget: null,
    queryPoint: null,
    queryPolyline: null,
    queryPolygon: null,
    querySketchViewModel: null,
    queryLayer: null,
    queryLayerView: null,
    queryTools: null,
    activeQueryPolygonButton: null,
    highlightedFeature: null,
    statsTable: null,
    queryMeasureArea: null,
    queryMeasureRadius: null,
    queryMeasureContainerArea: null,
    queryMeasureContainerRadius: null,
    queryingIndicatorContainer: null,
    clearHighlightedFeatures: null,
    zoomToExtentOfQueryPoly: null,
    squaredSymbol: "2".sup(),
    chartCount: null,
    bookmarksWidgetListItem: null,
    screenshot3DButton: null,
    screenshotBtn11X17: null,
    screenshot3DSection: null,
    screenshot3DDiv: null,
    smartPhonesPortrait: null,
    smartPhonesLandscape: null,
    ipadPro125Landscape: null,
    ipadPro125Portrait: null,
    ipadPro105Landscape: null,
    ipadPro105Portrait: null,
    ipad3497: null,
    ipad12MiniAir: null,
    elevationToggleDiv: null,
    elevationToggle: null,
    // editorWidget: null,
    // editorWidgetLayerToEdit: null,
    // editorWidgetLayerNotToEdit1: null,
    // editorWidgetLayerNotToEdit2: null,
    // editorWidgetListItem: null,
    filterToolLayer: null,
    filterToolLayerOverviewMap: null,
    filterToolSelectMenu: null,
    filterToolSelectMenuLabel: null,
    filterToolField: null,
    coordinateConversionWarningText: null,
    clusterPointLayer: null,
    clusterPointLayerOverview: null,
    clusterPointLayer_clusterSettings: null,
    clusterDiv: null,
    attributeTableLayerSelect: null,
    attributeTable: null,
    attributeTableLayer: null,
    attributeTableFieldConfig: [],
    highlights: [],
    elevationProfileContainer: null,
    elevationProfileWidget: null,
    elevationProfileButton: null,
    activeWidget: null,
    nextWidget: null,
    switchButton: null,
  };

  app.elevationProfileButton = document.getElementById(
    "elevationProfileButton"
  );

  // graphics laye for sketch widget
  app.sketchWidgetGraphicsLayer = new GraphicsLayer({
    id: "sketchWidgetGraphicsLayer",
  });
  app.sketchWidgetGraphicsLayer.listMode = "hide";
  app.queryGraphicsLayer = new GraphicsLayer();
  app.queryGraphicsLayer.listMode = "hide";
  // graphic for highlighted feature when user hovers over row of selected feature in query table
  app.selectedTableFeature = new Graphic({
    symbol: {
      type: "simple-marker",
      style: "square",
      color: [255, 255, 255, 0],
      size: "16px", // pixels
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: "red",
        width: 2, // points
      },
    },
  });

  // Map
  app.map = new WebMap({
    portalItem: {
      id: "701743de5dfe42f5aa4fd06e185eb322",
    },
    layers: [app.sketchWidgetGraphicsLayer, app.queryGraphicsLayer],
    ground: "world-elevation",
  });

  // overview map and map/scene views
  app.overviewMap = new WebMap({
    portalItem: {
      id: "957e0ef0d5bc45eeae43e148434e1bfe",
    },
  });
  // disable overview map popups
  app.overviewMap.popup = null;

  app.overviewMapView = new MapView({
    container: "overviewMap",
    map: app.overviewMap,
    constraints: {
      rotationEnabled: false,
    },
    ui: {
      components: ["compass"],
      padding: app.uiPadding,
    },
  });
  app.overviewMapSceneView = new SceneView({
    container: null,
    map: app.overviewMap,
    ui: {
      components: ["compass"],
      padding: app.uiPadding,
    },
  });
  app.overviewMapBasemapToggle = new BasemapToggle({
    view: app.overviewMapView,
    nextBasemap: "streets-vector",
  });
  app.overviewMapBasemapToggleSceneView = new BasemapToggle({
    view: app.overviewMapSceneView,
    nextBasemap: "streets-vector",
  });
  app.overviewMapView.ui.add(app.overviewMapBasemapToggle, "top-right");
  app.overviewMapScaleBar = new ScaleBar({
    view: app.overviewMapView,
    style: "ruler",
  });
  app.overviewMapView.ui.add(app.overviewMapScaleBar, "bottom-left");
  // 2D View
  app.mapView = new MapView({
    container: "mapViewDiv", // activate
    map: app.map,
    padding: app.viewPadding,
    ui: {
      components: ["zoom", "compass", "attribution"],
      padding: app.uiPadding,
    },
    popup: {
      dockEnabled: true,
      dockOptions: {
        position: "bottom-right",
        breakpoint: {
          width: 600,
          height: 1000,
        },
      },
    },
  });
  // 3D View
  app.sceneView = new SceneView({
    container: null, // deactivate
    map: app.map,
    padding: app.viewPadding,
    ui: {
      padding: app.uiPadding,
    },
    popup: {
      dockEnabled: true,
      dockOptions: {
        position: "bottom-right",
        breakpoint: {
          width: 600,
          height: 1000,
        },
      },
    },
  });
  // Active view is scene
  setActiveView(app.mapView);

  // Create search widget
  app.searchWidgetNav = new Search({
    container: "searchNavDiv",
    //view: app.activeView,
  });
  // creates new coordinate format for coordinate conversion widget.
  app.newCoordFormat = new Format({
    name: "SC STATE PLANE",
    conversionInfo: {
      spatialReference: new SpatialReference({
        wkid: 102733,
      }),
      reverseConvert: function (string, format) {
        let parts = string.split(",");
        return new Point({
          x: parseFloat(parts[0]),
          y: parseFloat(parts[1]),
          spatialReference: {
            wkid: 102733,
          },
        });
      },
    },
    coordinateSegments: [
      {
        alias: "X",
        description: "easting",
        searchPattern: app.coordinateConversionSearchPattern,
      },
      {
        alias: "Y",
        description: "northing",
        searchPattern: app.coordinateConversionSearchPattern,
      },
    ],
    defaultPattern: "X, Y",
  });

  app.sketchWidgetPointSymbol = {
    type: "simple-marker",
    style: "circle",
    color: "rgb(0,120,140)",
    size: "12px",
    outline: {
      color: [29, 17, 96],
      width: 1,
    },
  };
  app.sketchWidgetPolylineSymbol = {
    type: "simple-line",
    color: "rgb(0,133,202)",
    width: "5",
    style: "solid",
  };
  app.sketchWidgetPolygonSymbol = {
    type: "simple-fill",
    color: "rgba(187, 0, 0, 0.65)",
    style: "solid",
    outline: {
      color: [102, 102, 102],
      width: 1,
    },
  };
  // widgets
  app.switchButton = document.getElementById("switchbutton");

  app.switchButton.addEventListener("click", function () {
    switchView();
  });

  app.home = new Home({});
  app.track = new Track({});
  app.scaleBar = new ScaleBar({
    style: "ruler",
  });
  app.basemapGallery = new BasemapGallery({
    container: "basemapGallery",
  });
  app.legend = new Legend({
    container: "legendDiv",
    style: "classic",
  });
  app.layerList = new LayerList({
    container: "layerListDiv",
  });
  app.bookmarksWidget = new Bookmarks({
    container: "bookmarksDiv",
  });
  app.coordinateConversion = new CoordinateConversion({
    container: "coordinateConversionDiv",
  });
  app.sketchWidgetSketchViewModel = new SketchViewModel({
    layer: app.sketchWidgetGraphicsLayer,
    pointSymbol: app.sketchWidgetPointSymbol,
    polylineSymbol: app.sketchWidgetPolylineSymbol,
    polygonSymbol: app.sketchWidgetPolygonSymbol,
  });
  app.sketchWidget = new Sketch({
    container: "sketchWidgetButtons",
    id: "sketchWidget",
    viewModel: app.sketchWidgetSketchViewModel,
  });

  app.printWidget = new Print({
    printServiceUrl:
      "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
  });

  app.querySketchWidget = new Sketch({
    creationMode: "single",
  });

  // app.editorWidget = new Editor({
  //   container: 'editorDiv'
  // });

  // Creates geometries for query widget
  app.queryPoint = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    style: "circle",
    color: "rgb(23, 43, 94)",
    size: "8px",
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: [0, 138, 80],
      width: 1,
    },
  };

  app.queryPolyline = {
    type: "simple-line", // autocasts as new SimpleLineSymbol()
    color: "red",
    width: "3.5",
    style: "dash",
  };

  app.queryPolygon = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "rgba(51, 51, 51, 0.5)",
    style: "solid",
    outline: {
      color: "red",
      width: 3.5,
    },
  };

  app.elevationProfileContainer = document.getElementById(
    "eleProfilePanelBody"
  );
  app.elevationProfileWidget = new ElevationProfile({
    container: app.elevationProfileContainer,
    profiles: [
      {
        type: "ground", // autocasts as new ElevationProfileLineGround(),
        color: "red", // display this profile in red
        title: "World Elevation", // with a custom label
      },
    ],
  });

  // wait for app.activeView to become ready
  reactiveUtils
    .whenOnce(() => app.activeView.ready)
    .then(() => {
      // assign element id/class names to app properties
      assignAppProperties();

      // defaults 2D Map tab pointerevents to off
      // app.mapViewNav.style.pointerEvents = "none";

      // set component views
      app.home.view = app.activeView;
      app.track.view = app.activeView;
      app.scaleBar.view = app.activeView;
      app.sketchWidgetSketchViewModel.view = app.activeView;
      app.sketchWidget.view = app.activeView;
      app.printWidget.view = app.activeView;
      app.searchWidgetNav.view = app.activeView;
      // app.editorWidget.view = app.activeView;
      // add ui components to app.activeView
      app.activeView.ui.add([
        {
          component: app.searchWidgetNav,
          position: "top-right",
        },
        {
          component: app.home,
          position: "top-right",
        },
        {
          component: app.track,
          position: "top-right",
        },
        {
          component: app.scaleBar,
          position: "bottom-right",
        },
      ]);
      app.activeView.ui.move("zoom", "top-right");

      app.basemapGallery.view = app.activeView;
      app.basemapGallery.watch("activeBasemap", function (newValue) {
        try {
          if (
            newValue.title === "Imagery with Labels" ||
            newValue.title === "Imagery" ||
            newValue.title === "Imagery Hybrid" ||
            newValue.title === "Firefly Imagery Hybrid" ||
            newValue.title === "NAIP Imagery Hybrid"
          ) {
            app.overviewMap.basemap = "streets-vector";
            app.overviewMapBasemapToggle.nextBasemap = "hybrid";
          } else {
            app.overviewMap.basemap = "hybrid";
            app.overviewMapBasemapToggle.nextBasemap = "streets-vector";
          }
        } catch (error) {
          console.log("Error message: ", error.message);
        }
      });
      app.legend.view = app.activeView;
      app.bookmarksWidget.view = app.activeView;
      app.bookmarksWidget.editingEnabled = true;
      app.coordinateConversion.view = app.activeView;
      app.coordinateConversion.formats.add(app.newCoordFormat);
      app.coordinateConversion.conversions.splice(
        0,
        0,
        new Conversion({
          format: app.newCoordFormat,
        })
      );
      app.coordinateConversion.watch(
        "mode",
        function (newValue, oldValue, propertyName, target) {
          if (newValue === "capture") {
            app.activeView.popup = null;
            app.coordinateConversionWarningText.classList.remove("hidden");
          } else {
            app.coordinateConversionWarningText.classList.add("hidden");
            app.activeView.popup = new Popup({
              dockEnabled: true,
              dockOptions: {
                position: "bottom-right",
                breakpoint: {
                  width: 600,
                  height: 1000,
                },
              },
            });
          }
        }
      );
      app.layerList.view = app.activeView;
      app.layerList.listItemCreatedFunction = function (e) {
        let item = e.item;
        item.view = app.activeView;
        // add a legend to the layer list
        if (!item.panel) {
          item.panel = {
            content: "legend",
            open: false,
          };
        }
        // add opacity buttons to the layer list
        item.actionsSections = [
          [
            {
              title: "Increase Layer Opacity",
              className: "esri-icon-up",
              id: "increase-opacity",
            },
            {
              title: "Decrease Layer Opacity",
              className: "esri-icon-down",
              id: "decrease-opacity",
            },
            {
              title: "Zoom To Layer's Full Extent",
              className: "esri-icon-zoom-out-fixed",
              id: "full-extent",
            },
          ],
        ];
      };
      app.layerList.on("trigger-action", function (e) {
        let layer = e.item.layer;
        let id = e.action.id;
        if (id === "increase-opacity") {
          if (layer.opacity < 1) {
            layer.opacity += 0.25;
          }
        } else if (id === "decrease-opacity") {
          if (layer.opacity > 0) {
            layer.opacity -= 0.25;
          }
        } else if (id === "full-extent") {
          // if the full-extent action is triggered then navigate
          // to the full extent of the visible layer
          if (
            layer.fullExtent.spatialReference !==
            app.activeView.spatialReference
          ) {
            var geomSer = new GeometryService({
              url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer",
            });
            var params = new ProjectParameters({
              geometries: [layer.fullExtent],
              outSpatialReference: app.activeView.spatialReference,
            });
            geomSer.project(params).then(function (results) {
              app.activeView.goTo(results[0]);
            });
          } else {
            app.activeView.goTo(layer.fullExtent);
          }
        }
      });
      // creates a clone of app.mapView's viewpoint to keep home button viewpoint consistent
      app.defaultHomeViewPoint = (() => app.mapView.viewpoint.clone())();

      app.printWidget.container = app.printWidgetDiv;

      create2DDistanceMeasureWidget();
      create2DAreaMeasureWidget();
      // get styling values for sketch widget
      reactiveUtils.watch(
        // getValue function
        () => app.sketchWidget.activeTool,
        // Callback function
        (newValue, oldValue) => {
          let pointSymbol,
            polylineSymbol,
            polygonSymbol,
            rectangleSymbol,
            circleSymbol;

          app.pointSymbolButtonColorValue = hexToRgbA(
            app.pointSymbolButtonColor.value,
            app.pointSymbolButtonOpacity.value
          );

          app.pointSymbolButtonStyleValue =
            app.pointSymbolButtonStyle.options[
              app.pointSymbolButtonStyle.selectedIndex
            ].value;

          app.pointSymbolButtonSizeValue =
            app.pointSymbolButtonSize.options[
              app.pointSymbolButtonSize.selectedIndex
            ].value;

          app.pointSymbolButtonOutlineColorValue = hexToRgbA(
            app.pointSymbolButtonOutlineColor.value,
            app.pointSymbolButtonOutlineColorOpacity.value
          );

          app.pointSymbolButtonOutlineWidthValue = parseInt(
            app.pointSymbolButtonOutlineWidth.options[
              app.pointSymbolButtonOutlineWidth.selectedIndex
            ].value
          );

          app.polylineSymbolButtonColorValue = hexToRgbA(
            app.polylineSymbolButtonColor.value,
            app.polylineSymbolButtonOpacity.value
          );

          app.polylineSymbolButtonStyleValue =
            app.polylineSymbolButtonStyle.options[
              app.polylineSymbolButtonStyle.selectedIndex
            ].value;

          app.polylineSymbolButtonWidthValue = parseInt(
            app.polylineSymbolButtonWidth.options[
              app.polylineSymbolButtonWidth.selectedIndex
            ].value
          );

          app.polygonSymbolButtonColorValue = hexToRgbA(
            app.polygonSymbolButtonColor.value,
            app.polygonSymbolButtonOpacity.value
          );

          app.polygonSymbolButtonStyleValue =
            app.polygonSymbolButtonStyle.options[
              app.polygonSymbolButtonStyle.selectedIndex
            ].value;

          app.polygonSymbolButtonOutlineColorValue = hexToRgbA(
            app.polygonSymbolButtonOutlineColor.value,
            app.polygonSymbolButtonOutlineColorOpacity.value
          );

          app.polygonSymbolButtonOutlineWidthValue = parseInt(
            app.polygonSymbolButtonOutlineWidth.options[
              app.polygonSymbolButtonOutlineWidth.selectedIndex
            ].value
          );

          switch (newValue) {
            case "point":
              pointSymbol = app.sketchWidget.viewModel.pointSymbol.clone();
              pointSymbol.color = app.pointSymbolButtonColorValue;
              pointSymbol.outline.color =
                app.pointSymbolButtonOutlineColorValue;
              pointSymbol.style = app.pointSymbolButtonStyleValue;
              pointSymbol.size = app.pointSymbolButtonSizeValue;
              pointSymbol.outline.width =
                app.pointSymbolButtonOutlineWidthValue;
              app.sketchWidget.viewModel.pointSymbol = pointSymbol;
              app.pointStyles.classList.remove("hidden");
              app.polylineStyles.classList.add("hidden");
              app.polygonStyles.classList.add("hidden");
              break;
            case "polyline":
              polylineSymbol =
                app.sketchWidget.viewModel.polylineSymbol.clone();
              polylineSymbol.color = app.polylineSymbolButtonColorValue;
              polylineSymbol.style = app.polylineSymbolButtonStyleValue;
              polylineSymbol.width = app.polylineSymbolButtonWidthValue;
              app.sketchWidget.viewModel.polylineSymbol = polylineSymbol;
              app.pointStyles.classList.add("hidden");
              app.polylineStyles.classList.remove("hidden");
              app.polygonStyles.classList.add("hidden");
              break;
            case "polygon":
              polygonSymbol = app.sketchWidget.viewModel.polygonSymbol.clone();
              polygonSymbol.color = app.polygonSymbolButtonColorValue;
              polygonSymbol.outline.color =
                app.polygonSymbolButtonOutlineColorValue;
              polygonSymbol.style = app.polygonSymbolButtonStyleValue;
              polygonSymbol.outline.width =
                app.polygonSymbolButtonOutlineWidthValue;
              app.sketchWidget.viewModel.polygonSymbol = polygonSymbol;
              app.pointStyles.classList.add("hidden");
              app.polylineStyles.classList.add("hidden");
              app.polygonStyles.classList.remove("hidden");
              break;
            case "rectangle":
              rectangleSymbol =
                app.sketchWidget.viewModel.polygonSymbol.clone();
              rectangleSymbol.color = app.polygonSymbolButtonColorValue;
              rectangleSymbol.outline.color =
                app.polygonSymbolButtonOutlineColorValue;
              rectangleSymbol.style = app.polygonSymbolButtonStyleValue;
              rectangleSymbol.outline.width =
                app.polygonSymbolButtonOutlineWidthValue;
              app.sketchWidget.viewModel.polygonSymbol = rectangleSymbol;
              app.pointStyles.classList.add("hidden");
              app.polylineStyles.classList.add("hidden");
              app.polygonStyles.classList.remove("hidden");
              break;
            case "circle":
              circleSymbol = app.sketchWidget.viewModel.polygonSymbol.clone();
              circleSymbol.color = app.polygonSymbolButtonColorValue;
              circleSymbol.outline.color =
                app.polygonSymbolButtonOutlineColorValue;
              circleSymbol.style = app.polygonSymbolButtonStyleValue;
              circleSymbol.outline.width =
                app.polygonSymbolButtonOutlineWidthValue;
              app.sketchWidget.viewModel.polygonSymbol = circleSymbol;
              app.pointStyles.classList.add("hidden");
              app.polylineStyles.classList.add("hidden");
              app.polygonStyles.classList.remove("hidden");
              break;
          }
        }
      );

      app.elevationProfileWidget.view = app.activeView;
      app.map.layers.reorder(
        app.queryGraphicsLayer,
        app.map.layers.items.length - 1
      );
      app.map.layers.reorder(
        app.sketchWidget_graphicsLayer,
        app.map.layers.items.length
      );
      // Query widget
      app.querySketchViewModel = new SketchViewModel({
        view: app.activeView,
        layer: app.queryGraphicsLayer,
        polygonSymbol: app.queryPolygon,
        pointSymbol: app.queryPoint,
        polylineSymbol: app.queryPolyline,
      });

      app.querySketchWidget.view = app.activeView;
      app.querySketchWidget.viewModel = app.querySketchViewModel;
      app.querySketchWidget.container = "geometryQueryButtons";
      app.querySketchWidget.id = "geometryquerybuttons_sketchWidget";

      app.queryLayer = findLayerByTitle("My Travel Locations", "main");
      app.queryLayer.outFields = ["*"];

      app.activeView.whenLayerView(app.queryLayer).then(function (layerView) {
        app.queryLayerView = layerView;
        app.querySketchWidget.on("create", function (event) {
          try {
            app.queryPolygon = event.graphic.geometry;
            app.activeQueryPolygonButton = event.tool;
          } catch (error) {
            console.log("stats widget error message: ", error.message);
          }

          if (event.state === "active") {
            // remove existing buffer graphic and any highlighted features before creating new one
            try {
              app.queryGraphicsLayer.removeAll();
              if (app.highlightedFeature) {
                app.highlightedFeature.remove();
              }
              app.statsTable.clearData();
            } catch (error) {
              console.log("querySketchWidget error: ", error.message);
            }

            // calculate area of query polygon
            app.queryMeasureArea = geometryEngine.geodesicArea(
              app.queryPolygon,
              "square-feet"
            );
            if (app.queryMeasureArea < 0) {
              // simplify the polygon if needed and calculate the area again
              let simplifiedPolygon = geometryEngine.simplify(app.queryPolygon);
              if (simplifiedPolygon) {
                app.queryMeasureArea = geometryEngine.geodesicArea(
                  simplifiedPolygon,
                  "square-feet"
                );
              }
            }

            // if tool is circle also calculate radius
            if (event.tool === "circle") {
              app.queryMeasureRadius = Math.sqrt(
                app.queryMeasureArea / Math.PI
              );
            } else {
              app.queryMeasureRadius = 0;
            }
            app.queryMeasureContainerArea.innerHTML =
              numberWithCommas(app.queryMeasureArea.toFixed(2)) +
              " ft" +
              app.squaredSymbol;
            app.queryMeasureContainerRadius.innerHTML =
              numberWithCommas(app.queryMeasureRadius.toFixed(2)) + " ft";
          } else if (event.state === "complete") {
            app.queryingIndicatorContainer.classList.remove("noVisibility");
            // this polygon will be used to query features that intersect it
            startQuery(app.queryPolygon);
            app.queryLayer
              .queryFeatures({
                geometry: app.queryPolygon,
                outFields: ["*"],
                outSpatialReference: app.activeView.spatialReference,
                returnGeometry: true,
              })
              .then(function (results) {
                let graphics = results.features;

                // remove existing highlighted features
                if (app.highlightedFeature) {
                  app.highlightedFeature.remove();
                }

                // highlight query results
                app.highlightedFeature = layerView.highlight(graphics);
                // zoom to extent of query polygon, zoomed out by a factor of 2
                app.activeView.goTo(app.queryPolygon.extent.expand(2));
              });
          }
        });

        app.querySketchWidget.on("update", function (event) {
          let queryPolygon = event.graphics[0].geometry;
          if (event.state === "start" && event.toolEventInfo === null) {
            // USER SELECTS QUERY POLYGON TO MOVE, SCALE, OR RESHAPE FOR FIRST TIME
            // FIRST SET POPUP TO NULL TO PREVENT POPUP FROM OPENING WHEN USER CLICKS ON GRAPHIC TO START UPDATE THEN IMMEDIATELY RE-CREATE THE POPUP
            app.activeView.popup = null;
            app.activeView.popup = new Popup({
              dockEnabled: true,
              dockOptions: {
                position: "bottom-right",
                breakpoint: {
                  width: 600,
                  height: 1000,
                },
              },
            });
          } else if (
            event.state === "active" &&
            (event.toolEventInfo.type === "scale" ||
              event.toolEventInfo.type === "reshape")
          ) {
            // AS USER SCALES OR ROTATES QUERY POLYGON, UPDATE MEASUREMENTS
            // let queryPolygon = event.graphics[0].geometry;
            app.queryMeasureArea = geometryEngine.geodesicArea(
              queryPolygon,
              "square-feet"
            );
            if (app.queryMeasureArea < 0) {
              // simplify the polygon if needed and calculate the area again
              let simplifiedPolygon = geometryEngine.simplify(queryPolygon);
              if (simplifiedPolygon) {
                app.queryMeasureArea = geometryEngine.geodesicArea(
                  simplifiedPolygon,
                  "square-feet"
                );
              }
            }
            // if tool is circle also calculate radius
            if (app.activeQueryPolygonButton === "circle") {
              app.queryMeasureRadius = Math.sqrt(
                app.queryMeasureArea / Math.PI
              );
            } else {
              app.queryMeasureRadius = 0;
            }
            app.queryMeasureContainerArea.innerHTML =
              numberWithCommas(app.queryMeasureArea.toFixed(2)) +
              " ft" +
              app.squaredSymbol;
            app.queryMeasureContainerRadius.innerHTML =
              numberWithCommas(app.queryMeasureRadius.toFixed(2)) + " ft";
          } else if (
            event.state === "active" &&
            (event.toolEventInfo.type === "move-stop" ||
              event.toolEventInfo.type === "scale-stop" ||
              event.toolEventInfo.type === "reshape-stop" ||
              event.toolEventInfo.type === "rotate-stop")
          ) {
            // ONCE USER STOPS MOVING, SCALING, OR RESHAPING QUERY POLYGON, EXECUTE THE QUERY
            app.queryingIndicatorContainer.classList.remove("noVisibility");
            startQuery(queryPolygon);
            app.queryLayer
              .queryFeatures({
                geometry: queryPolygon,
                outFields: ["*"],
                outSpatialReference: app.activeView.spatialReference,
                returnGeometry: true,
              })
              .then(function (results) {
                let graphics = results.features;

                // remove existing highlighted features
                if (app.highlightedFeature) {
                  app.highlightedFeature.remove();
                }
                // highlight query results
                app.highlightedFeature = layerView.highlight(graphics);
                // zoom to extent of query polygon, zoomed out by a factor of 2
                app.activeView.goTo(queryPolygon.extent.expand(2));
              });
          } else if (event.state === "aborted" || event.state === "complete") {
            // USER EITHER COMPLETED THE POLYGON OR CLICKED OFF OF QUERY POLYGON WITHOUT MOVING IT
            // RE-ENABLE POPUPS
            try {
              app.activeView.popup = new Popup({
                dockEnabled: true,
                dockOptions: {
                  position: "bottom-right",
                  breakpoint: {
                    width: 600,
                    height: 1000,
                  },
                },
              });
            } catch (error) {
              console.log("Error recreating popup: ", error.message);
            }
          }
        });
      });

      // removes query graphic and highlighted features
      app.clearHighlightedFeatures.addEventListener("click", function () {
        try {
          app.queryGraphicsLayer.removeAll();
          app.highlightedFeature.remove();
          app.statsTable.clearData();
          app.queryPolygon = null;
        } catch (error) {
          console.log("clearHighlightedFeatures Error: ", error.message);
        }
      });

      // zooms to full extent of query polygon
      app.zoomToExtentOfQueryPoly.addEventListener("click", function () {
        try {
          app.activeView.goTo(app.queryPolygon.extent);
        } catch (error) {
          console.log("zoomToExtentOfQueryPoly error: ", error.message);
        }
      });

      // define layers to be/not to be editable and add them to editor widget config
      // app.activeView.map.layers.forEach(function(layer){
      //   switch(layer.title) {
      //     case 'Guest Messages':
      //       app.editorWidgetLayerToEdit = {
      //         layer: layer,
      //         deleteEnabled: false,
      //         fieldConfig: [
      //           {
      //             name: 'name',
      //             label: 'Name'
      //           },
      //           {
      //             name: 'date',
      //             label: 'Date'
      //           },
      //           {
      //             name: 'location',
      //             label: 'Your Location'
      //           },
      //           {
      //             name: 'message',
      //             label: 'Leave Me A Message'
      //           }
      //         ]
      //       }
      //       break;
      //     case 'My Travel Locations':
      //       app.editorWidgetLayerNotToEdit1 = {
      //         layer: layer,
      //         enabled: false,
      //         addEnabled: false,
      //         updateEnabled: false,
      //         deleteEnabled: false
      //       }
      //       break;
      //     case 'My Favorite Photos':
      //         app.editorWidgetLayerNotToEdit2 = {
      //           layer: layer,
      //           enabled: false,
      //           addEnabled: false,
      //           updateEnabled: false,
      //           deleteEnabled: false
      //         }
      //       break;
      //   }
      // });
      // app.editorWidget.layerInfos = [
      //   app.editorWidgetLayerToEdit,
      //   app.editorWidgetLayerNotToEdit1,
      //   app.editorWidgetLayerNotToEdit2,
      // ]

      // FILTER TOOL LOGIC

      app.filterToolLayer = findLayerByTitle("My Favorite Photos", "main"); // UPDATE WHEN DEPLOYING
      app.filterToolLayerOverviewMap = findLayerByTitle(
        "My Favorite Photos",
        "overview"
      ); // UPDATE WHEN DEPLOYING
      app.filterToolField = "takenwith"; //UPDATE WHEN DEPLOYING
      // query all features in app.filterToolLayer, add unique values from filter field to dropdown menu, then apply definition expression to filter app.filterToolLayer
      app.filterToolLayer
        .when(function () {
          let query = app.filterToolLayer.createQuery();
          query.outFields = [app.filterToolField];
          return app.filterToolLayer.queryFeatures(query);
        })
        .then(getUniqueValues)
        .then(addToSelectMenu);
      // whenever user selects new attribute to filter by in dropdown menu, apply definition expression SQL query
      app.filterToolSelectMenu.addEventListener("change", function () {
        let option = event.target.value;
        setFilterLayerDefinitionExpression(option);
      });

      // enable point layer clustering, if needed
      app.clusterPointLayer = findLayerByTitle("My Travel Locations", "main");
      app.clusterPointLayerOverview = findLayerByTitle(
        "My Travel Locations",
        "overview"
      );
      app.clusterPointLayer_clusterSettings = {
        // UPDATE WHEN DEPLOYING
        type: "cluster",
        clusterRadius: "20",
        popupTemplate: {
          title: "Cluster of {cluster_count} " + app.clusterPointLayer.title,
          content:
            "Cluster represents {cluster_count} " + app.clusterPointLayer.title,
        },
      };

      // disable clustering by default, uncomment below code if clustering should be turned on by default
      // app.clusterPointLayer.featureReduction = app.clusterPointLayer_clusterSettings

      // app.clusterPointLayerOverview.featureReduction = {
      //     type: 'cluster',
      //     clusterRadius: "60",
      //     popupTemplate: null
      // }

      // ATTRIBUTE TABLE LOGIC
      // populate layer select dropdown menu
      for (let i = 0; i < app.activeView.map.layers.items.length; i++) {
        if (app.activeView.map.layers.items[i].type === "feature") {
          let option = document.createElement("option");
          option.text = app.activeView.map.layers.items[i].title;
          option.value = app.activeView.map.layers.items[i].title;
          app.attributeTableLayerSelect.add(option);
        }
      }
      // add blank option to dropdown menu and have it selected by default
      let blankOption = document.createElement("option");
      blankOption.text = "";
      blankOption.value = "";
      blankOption.selected = true;
      app.attributeTableLayerSelect.add(blankOption);
      // when user selects layer, create attribute table
      app.attributeTableLayerSelect.addEventListener("change", function () {
        let selectedLayer = event.target.value;
        app.attributeTableLayer = findLayerByTitle(selectedLayer, "main");
        try {
          // create Field Config array
          if (app.attributeTableFieldConfig.length > 0) {
            // clear out any existing field configs if needed
            app.attributeTableFieldConfig = [];
          }
          for (let i = 0; i < app.attributeTableLayer.fields.length; i++) {
            // create array of objects consiting of all attributes in layer
            app.attributeTableFieldConfig.push({
              name: app.attributeTableLayer.fields[i].name,
              label: app.attributeTableLayer.fields[i].name,
            });
          }
          // if attribute table already exists, destroy it and recreate the attribute table div
          if (app.attributeTable) {
            app.attributeTable.destroy();
            let panelBody = document.getElementById("attributeTablePanelBody");
            let attributeTable = document.createElement("div");
            attributeTable.id = "attributeTable";
            panelBody.appendChild(attributeTable);
          }
          // create attribute table
          app.attributeTable = new FeatureTable({
            layer: app.attributeTableLayer,
            fieldConfigs: app.attributeTableFieldConfig,
            container: document.getElementById("attributeTable"),
            view: app.activeView,
            // attachmentsEnabled: true
          });

          // add Zoom To Selected Features Button To Table Controls dropdown
          // try {
          //   if ($('.esri-feature-table__menu-accordion #zoomTo').length === 0) {
          //     let tableControls = document.getElementsByClassName('esri-feature-table__menu-accordion').item(0);
          //     let li = document.createElement('li');
          //     // let button = document.createElement('button');
          //     let span = document.createElement('span');
          //     li.id = 'zoomTo'
          //     li.classList.add('esri-feature-table__menu-item')
          //     li.setAttribute('role', 'menuitem')
          //     button.classList.add('esri-feature-table__button', 'esri-feature-table__menu-item-label');
          //     button.id = 'zoomToButton';
          //     span.classList.add('esri-feature-table__menu-item-label__content');
          //     span.innerHTML = 'Zoom To Selected Feature'
          //     button.appendChild(span)
          //     li.appendChild(button)
          //     tableControls.appendChild(li)
          //   }
          // } catch(err) {
          //   console.log('Error message: ', err.message)
          // }

          // Get the FeatureLayer's layerView and listen for the table's selection-change event
          app.activeView
            .whenLayerView(app.attributeTableLayer)
            .then(function (layerView) {
              app.attributeTable.on("selection-change", function (changes) {
                // If the selection is removed remove its highlighted feature from the layerView
                changes.removed.forEach(function (item) {
                  const data = app.highlights.find(function (data) {
                    return data.feature === item.feature;
                  });
                  if (data) {
                    app.highlights.splice(app.highlights.indexOf(data), 1);
                    data.highlight.remove();
                  }
                });

                // If the selection is added, push all added selections to array and highlight on layerView
                changes.added.forEach(function (item) {
                  const feature = item.feature;
                  highlight = layerView.highlight(item.feature);
                  app.highlights.push({
                    feature: feature,
                    highlight: highlight,
                  });
                });
              });

              // document.getElementById('zoomToButton').addEventListener("click", zoomToSelectedFeature);

              // fires when "Zoom to selected feature" button is clicked
              function zoomToSelectedFeature() {
                // Create a query off of the feature layer
                const query = app.attributeTableLayer.createQuery();
                // Iterate through the highlights and grab the feature's objectID
                const featureIds = app.highlights.map(function (result) {
                  return result.feature.getAttribute(
                    app.attributeTableLayer.objectIdField
                  );
                });
                // Set the query's objectId
                query.objectIds = featureIds;
                // Make sure to return the geometry to zoom to
                query.returnGeometry = true;
                // Call queryFeatures on the feature layer and zoom to the resulting features
                app.attributeTableLayer
                  .queryFeatures(query)
                  .then(function (results) {
                    app.activeView
                      .goTo(results.features)
                      .catch(function (error) {
                        if (error.name != "AbortError") {
                          console.error(error);
                        }
                      });
                  });
              }
            });
        } catch (e) {
          console.log("Error Message: Attribute Table: ", e.mesage);
        }
      });
    })
    .then(function () {
      app.activeView.watch("extent", () =>
        updateOverviewMapExtent(app.extentIndicator)
      );
      app.overviewMapView.watch("extent", () =>
        updateOverviewMapExtent(app.extentIndicator)
      );
    })
    .then(function () {
      reactiveUtils.when(
        () => app.activeView.stationary,
        () => {
          updateOverviewMap();
        }
      );
    });

  app.map.when(() => {
    const handleActionBarClick = ({ target }) => {
      try {
        if (target.tagName !== "CALCITE-ACTION") {
          return;
        }
        if (app.activeWidget) {
          document.querySelector(
            `[data-action-id=${app.activeWidget}]`
          ).active = false;
          document.querySelector(
            `[data-panel-id=${app.activeWidget}]`
          ).hidden = true;
        }

        app.nextWidget = target.dataset.actionId;
        if (app.nextWidget !== app.activeWidget) {
          // app.activeView.padding = {
          //     right: actionBarExpanded ? 275 : 50,
          // };
          app.activeWidget = app.nextWidget;
          document.querySelector(
            `[data-action-id=${app.nextWidget}]`
          ).active = true;
          document.querySelector(
            `[data-panel-id=${app.nextWidget}]`
          ).hidden = false;
        } else {
          // app.activeView.padding = {
          //     right: actionBarExpanded ? 275 : 50,
          // };
          app.activeWidget = null;
        }
      } catch (e) {
        console.log("Error message: ", e.message);
      }
    };

    document
      .querySelectorAll("calcite-action-bar")
      .forEach((element) =>
        element.addEventListener("click", handleActionBarClick)
      );
    document.querySelector("calcite-shell").hidden = false;
    document.querySelector("calcite-loader").active = false;
  });

  // watchUtils.whenOnce(app.activeView, "ready").then(function () {

  // }).then(function () {
  //   app.activeView.watch('extent', () => updateOverviewMapExtent(app.extentIndicator));
  //   app.overviewMapView.watch('extent', () => updateOverviewMapExtent(app.extentIndicator));
  // }).then(function () {
  //   watchUtils.when(app.activeView, "stationary", updateOverviewMap);
  // });

  // Wire-up expand events
  // CalciteMapsArcGIS.setSearchExpandEvents(app.searchWidgetNav);
  // CalciteMapsArcGIS.setPopupPanelSync(app.mapView);
  // CalciteMapsArcGIS.setPopupPanelSync(app.sceneView);

  // Tab UI - switch views
  // $(".calcite-navbar li a[data-toggle='tab']").on("click", function (e) {
  //     if (e.target.text.indexOf("2D") > -1) {
  //         // switch views from 3D to 2D

  //         // disable 2D map nav button, re-enable 3D map nav button
  //         app.mapViewNav.style.pointerEvents = "none";
  //         app.sceneViewNav.style.pointerEvents = "auto";

  //         // remove elevation ground from map
  //         app.map.ground = new Ground({});
  //         app.overviewMap.ground = new Ground({});
  //         app.overviewMapSceneView.container = null;
  //         app.overviewMapView.container = "overviewMap";
  //         app.overviewMapView.popup = null;
  //         app.overviewMapBasemapToggle.view = app.overviewMapView;
  //         app.overviewMapView.ui.add(app.overviewMapBasemapToggle, "top-right");

  //         // if the user switchs views while measuring, clear measurement and destroy widget instance
  //         try {
  //             app.measureWidget3D.viewModel.clearMeasurement();
  //             app.activeView.ui.remove(app.measureWidget3D);
  //             app.measureWidget3D.destroy();
  //             app.measureWidget3D = null;
  //         } catch (e) {
  //             console.log("3D Measurement Widget Error Message: ", e.message);
  //         }

  //         // is the user switches views while updating graphic, cancel update procedure
  //         if (app.sketchWidget.updateGraphics.items.length > 0) {
  //             try {
  //                 app.sketchWidget.cancel();
  //             } catch (e) {
  //                 console.log("Sketch Widget Error Message: ", e.message);
  //             }
  //         }

  //         // if overview map toggle button is turned off re-check box
  //         if (!app.overviewMapToggleBox.checked) {
  //             app.overviewMapToggleBox.checked = "checked";
  //         }

  //         // if user switched overview off, turn back on. always keep off on mobile
  //         redisplayOverviewMap();

  //         syncViews(app.sceneView, app.mapView);
  //         setActiveView(app.mapView);

  //         // once app.activeView finishes loading...
  //         reactiveUtils
  //             .whenOnce(() => app.activeView.ready)
  //             .then(() => {
  //                 // sync widget views
  //                 app.home.view = app.activeView;
  //                 app.home.viewpoint = app.defaultHomeViewPoint;
  //                 app.track.view = app.activeView;
  //                 app.scaleBar.view = app.activeView;
  //                 app.basemapGallery.view = app.activeView;
  //                 app.legend.view = app.activeView;
  //                 app.layerList.view = app.activeView;
  //                 app.bookmarksWidget.view = app.activeView;
  //                 app.coordinateConversion.view = app.activeView;
  //                 app.sketchWidget.view = app.activeView;
  //                 app.querySketchWidget.view = app.activeView;
  //                 app.elevationProfileWidget.view = app.activeView;
  //                 // redisplay 2D items
  //                 app.bookmarksWidgetListItem.classList.remove("hidden");
  //                 // app.editorWidgetListItem.classList.remove('hidden');
  //                 // hide 2D measure buttons, display 3D measure buttons
  //                 app.measureWidgetButtons2D.classList.remove("hidden");
  //                 app.measureWidgetButtons3D.classList.add("hidden");
  //                 app.screenshot3DSection.classList.add("hidden");
  //                 app.elevationProfileButton.classList.add("hidden");

  //                 // reset custom bookmark counter back to 1
  //                 app.bookmarkCounter = 1;

  //                 app.printWidgetDiv.classList.remove("hidden");
  //                 app.elevationToggleDiv.classList.add("hidden");
  //                 app.clusterDiv.classList.remove("hidden");
  //                 // reset query widget
  //                 app.queryLayer = findLayerByTitle("My Travel Locations", "main");
  //                 app.queryLayer.outFields = ["*"];

  //                 try {
  //                     app.statsTable.clearData();
  //                 } catch (error) {
  //                     console.log("clear stats table Error: ", error.message);
  //                 }

  //                 app.activeView.whenLayerView(app.queryLayer).then(function (layerView) {
  //                     app.queryLayerView = layerView;
  //                     app.querySketchWidget.on("create", function (event) {
  //                         try {
  //                             app.queryPolygon = event.graphic.geometry;
  //                             app.activeQueryPolygonButton = event.tool;
  //                         } catch (error) {
  //                             console.log("stats widget error message: ", error.message);
  //                         }

  //                         if (event.state === "active") {
  //                             // remove existing buffer graphic and any highlighted features before creating new one
  //                             try {
  //                                 app.queryGraphicsLayer.removeAll();
  //                                 if (app.highlightedFeature) {
  //                                     app.highlightedFeature.remove();
  //                                 }
  //                                 app.statsTable.clearData();
  //                             } catch (error) {
  //                                 console.log("querySketchWidget error: ", error.message);
  //                             }

  //                             // calculate area of query polygon
  //                             app.queryMeasureArea = geometryEngine.geodesicArea(app.queryPolygon, "square-feet");
  //                             if (app.queryMeasureArea < 0) {
  //                                 // simplify the polygon if needed and calculate the area again
  //                                 let simplifiedPolygon = geometryEngine.simplify(app.queryPolygon);
  //                                 if (simplifiedPolygon) {
  //                                     app.queryMeasureArea = geometryEngine.geodesicArea(simplifiedPolygon, "square-feet");
  //                                 }
  //                             }

  //                             // if tool is circle also calculate radius
  //                             if (event.tool === "circle") {
  //                                 app.queryMeasureRadius = Math.sqrt(app.queryMeasureArea / Math.PI);
  //                             } else {
  //                                 app.queryMeasureRadius = 0;
  //                             }
  //                             app.queryMeasureContainerArea.innerHTML = numberWithCommas(app.queryMeasureArea.toFixed(2)) + " ft" + app.squaredSymbol;
  //                             app.queryMeasureContainerRadius.innerHTML = numberWithCommas(app.queryMeasureRadius.toFixed(2)) + " ft";
  //                         } else if (event.state === "complete") {
  //                             app.queryingIndicatorContainer.classList.remove("noVisibility");
  //                             // this polygon will be used to query features that intersect it
  //                             startQuery(app.queryPolygon);

  //                             app.queryLayer
  //                                 .queryFeatures({
  //                                     geometry: app.queryPolygon,
  //                                     outFields: ["*"],
  //                                     outSpatialReference: app.activeView.spatialReference,
  //                                     returnGeometry: true,
  //                                 })
  //                                 .then(function (results) {
  //                                     let graphics = results.features;

  //                                     // remove existing highlighted features
  //                                     if (app.highlightedFeature) {
  //                                         app.highlightedFeature.remove();
  //                                     }

  //                                     // highlight query results
  //                                     app.highlightedFeature = layerView.highlight(graphics);
  //                                     // zoom to extent of query polygon, zoomed out by a factor of 2
  //                                     app.activeView.goTo(app.queryPolygon.extent.expand(2));
  //                                 });
  //                         }
  //                     });

  //                     app.querySketchWidget.on("update", function (event) {
  //                         let queryPolygon = event.graphics[0].geometry;
  //                         if (event.state === "start" && event.toolEventInfo === null) {
  //                             // USER SELECTS QUERY POLYGON TO MOVE, SCALE, OR RESHAPE FOR FIRST TIME
  //                             // FIRST SET POPUP TO NULL TO PREVENT POPUP FROM OPENING WHEN USER CLICKS ON GRAPHIC TO START UPDATE THEN IMMEDIATELY RE-CREATE THE POPUP
  //                             app.activeView.popup = null;
  //                             app.activeView.popup = new Popup({
  //                                 dockEnabled: true,
  //                                 dockOptions: {
  //                                     position: "bottom-right",
  //                                     breakpoint: {
  //                                         width: 600,
  //                                         height: 1000,
  //                                     },
  //                                 },
  //                             });
  //                         } else if (event.state === "active" && (event.toolEventInfo.type === "scale" || event.toolEventInfo.type === "reshape")) {
  //                             // AS USER SCALES OR ROTATES QUERY POLYGON, UPDATE MEASUREMENTS
  //                             // let queryPolygon = event.graphics[0].geometry;
  //                             app.queryMeasureArea = geometryEngine.geodesicArea(queryPolygon, "square-feet");
  //                             if (app.queryMeasureArea < 0) {
  //                                 // simplify the polygon if needed and calculate the area again
  //                                 let simplifiedPolygon = geometryEngine.simplify(queryPolygon);
  //                                 if (simplifiedPolygon) {
  //                                     app.queryMeasureArea = geometryEngine.geodesicArea(simplifiedPolygon, "square-feet");
  //                                 }
  //                             }
  //                             // if tool is circle also calculate radius
  //                             if (app.activeQueryPolygonButton === "circle") {
  //                                 app.queryMeasureRadius = Math.sqrt(app.queryMeasureArea / Math.PI);
  //                             } else {
  //                                 app.queryMeasureRadius = 0;
  //                             }
  //                             app.queryMeasureContainerArea.innerHTML = numberWithCommas(app.queryMeasureArea.toFixed(2)) + " ft" + app.squaredSymbol;
  //                             app.queryMeasureContainerRadius.innerHTML = numberWithCommas(app.queryMeasureRadius.toFixed(2)) + " ft";
  //                         } else if (event.state === "active" && (event.toolEventInfo.type === "move-stop" || event.toolEventInfo.type === "scale-stop" || event.toolEventInfo.type === "reshape-stop" || event.toolEventInfo.type === "rotate-stop")) {
  //                             // ONCE USER STOPS MOVING, SCALING, OR RESHAPING QUERY POLYGON, EXECUTE THE QUERY
  //                             app.queryingIndicatorContainer.classList.remove("noVisibility");
  //                             startQuery(queryPolygon);
  //                             app.queryLayer
  //                                 .queryFeatures({
  //                                     geometry: queryPolygon,
  //                                     outFields: ["*"],
  //                                     outSpatialReference: app.activeView.spatialReference,
  //                                     returnGeometry: true,
  //                                 })
  //                                 .then(function (results) {
  //                                     let graphics = results.features;

  //                                     // remove existing highlighted features
  //                                     if (app.highlightedFeature) {
  //                                         app.highlightedFeature.remove();
  //                                     }
  //                                     // highlight query results
  //                                     app.highlightedFeature = layerView.highlight(graphics);
  //                                     // zoom to extent of query polygon, zoomed out by a factor of 2
  //                                     app.activeView.goTo(queryPolygon.extent.expand(2));
  //                                 });
  //                         } else if (event.state === "aborted" || event.state === "complete") {
  //                             // USER EITHER COMPLETED THE POLYGON OR CLICKED OFF OF QUERY POLYGON WITHOUT MOVING IT
  //                             // RE-ENABLE POPUPS
  //                             try {
  //                                 app.activeView.popup = new Popup({
  //                                     dockEnabled: true,
  //                                     dockOptions: {
  //                                         position: "bottom-right",
  //                                         breakpoint: {
  //                                             width: 600,
  //                                             height: 1000,
  //                                         },
  //                                     },
  //                                 });
  //                             } catch (error) {
  //                                 console.log("Error recreating popup: ", error.message);
  //                             }
  //                         }
  //                     });
  //                 });

  //                 // reactivate query
  //                 app.activeView.whenLayerView(app.queryLayer).then(function (layerView) {
  //                     app.queryLayerView = layerView;
  //                     app.querySketchWidget.on("create", function (event) {
  //                         try {
  //                             app.queryPolygon = event.graphic.geometry;
  //                             app.activeQueryPolygonButton = event.tool;
  //                         } catch (error) {
  //                             console.log("stats widget error message: ", error.message);
  //                         }

  //                         if (event.state === "active") {
  //                             // remove existing buffer graphic and any highlighted features before creating new one
  //                             try {
  //                                 app.queryGraphicsLayer.removeAll();
  //                                 if (app.highlightedFeature) {
  //                                     app.highlightedFeature.remove();
  //                                 }
  //                                 app.statsTable.clearData();
  //                             } catch (error) {
  //                                 console.log("querySketchWidget error: ", error.message);
  //                             }

  //                             // calculate area of query polygon
  //                             app.queryMeasureArea = geometryEngine.geodesicArea(app.queryPolygon, "square-feet");
  //                             if (app.queryMeasureArea < 0) {
  //                                 // simplify the polygon if needed and calculate the area again
  //                                 let simplifiedPolygon = geometryEngine.simplify(app.queryPolygon);
  //                                 if (simplifiedPolygon) {
  //                                     app.queryMeasureArea = geometryEngine.geodesicArea(simplifiedPolygon, "square-feet");
  //                                 }
  //                             }

  //                             // if tool is circle also calculate radius
  //                             if (event.tool === "circle") {
  //                                 app.queryMeasureRadius = Math.sqrt(app.queryMeasureArea / Math.PI);
  //                             } else {
  //                                 app.queryMeasureRadius = 0;
  //                             }
  //                             app.queryMeasureContainerArea.innerHTML = numberWithCommas(app.queryMeasureArea.toFixed(2)) + " ft" + app.squaredSymbol;
  //                             app.queryMeasureContainerRadius.innerHTML = numberWithCommas(app.queryMeasureRadius.toFixed(2)) + " ft";
  //                         } else if (event.state === "complete") {
  //                             app.queryingIndicatorContainer.classList.remove("noVisibility");
  //                             // this polygon will be used to query features that intersect it
  //                             startQuery(app.queryPolygon);

  //                             app.queryLayer
  //                                 .queryFeatures({
  //                                     geometry: app.queryPolygon,
  //                                     outFields: ["*"],
  //                                     outSpatialReference: app.activeView.spatialReference,
  //                                     returnGeometry: true,
  //                                 })
  //                                 .then(function (results) {
  //                                     let graphics = results.features;

  //                                     // remove existing highlighted features
  //                                     if (app.highlightedFeature) {
  //                                         app.highlightedFeature.remove();
  //                                     }

  //                                     // highlight query results
  //                                     app.highlightedFeature = layerView.highlight(graphics);
  //                                     // zoom to extent of query polygon, zoomed out by a factor of 2
  //                                     app.activeView.goTo(app.queryPolygon.extent.expand(2));
  //                                 });
  //                         }
  //                     });

  //                     app.querySketchWidget.on("update", function (event) {
  //                         let queryPolygon = event.graphics[0].geometry;
  //                         if (event.state === "start" && event.toolEventInfo === null) {
  //                             // USER SELECTS QUERY POLYGON TO MOVE, SCALE, OR RESHAPE FOR FIRST TIME
  //                             // FIRST SET POPUP TO NULL TO PREVENT POPUP FROM OPENING WHEN USER CLICKS ON GRAPHIC TO START UPDATE THEN IMMEDIATELY RE-CREATE THE POPUP
  //                             app.activeView.popup = null;
  //                             app.activeView.popup = new Popup({
  //                                 dockEnabled: true,
  //                                 dockOptions: {
  //                                     position: "bottom-right",
  //                                     breakpoint: {
  //                                         width: 600,
  //                                         height: 1000,
  //                                     },
  //                                 },
  //                             });
  //                         } else if (event.state === "active" && (event.toolEventInfo.type === "scale" || event.toolEventInfo.type === "reshape")) {
  //                             // AS USER SCALES OR ROTATES QUERY POLYGON, UPDATE MEASUREMENTS
  //                             // let queryPolygon = event.graphics[0].geometry;
  //                             app.queryMeasureArea = geometryEngine.geodesicArea(queryPolygon, "square-feet");
  //                             if (app.queryMeasureArea < 0) {
  //                                 // simplify the polygon if needed and calculate the area again
  //                                 let simplifiedPolygon = geometryEngine.simplify(queryPolygon);
  //                                 if (simplifiedPolygon) {
  //                                     app.queryMeasureArea = geometryEngine.geodesicArea(simplifiedPolygon, "square-feet");
  //                                 }
  //                             }
  //                             // if tool is circle also calculate radius
  //                             if (app.activeQueryPolygonButton === "circle") {
  //                                 app.queryMeasureRadius = Math.sqrt(app.queryMeasureArea / Math.PI);
  //                             } else {
  //                                 app.queryMeasureRadius = 0;
  //                             }
  //                             app.queryMeasureContainerArea.innerHTML = numberWithCommas(app.queryMeasureArea.toFixed(2)) + " ft" + app.squaredSymbol;
  //                             app.queryMeasureContainerRadius.innerHTML = numberWithCommas(app.queryMeasureRadius.toFixed(2)) + " ft";
  //                         } else if (event.state === "active" && (event.toolEventInfo.type === "move-stop" || event.toolEventInfo.type === "scale-stop" || event.toolEventInfo.type === "reshape-stop" || event.toolEventInfo.type === "rotate-stop")) {
  //                             // ONCE USER STOPS MOVING, SCALING, OR RESHAPING QUERY POLYGON, EXECUTE THE QUERY
  //                             app.queryingIndicatorContainer.classList.remove("noVisibility");
  //                             startQuery(queryPolygon);
  //                             app.queryLayer
  //                                 .queryFeatures({
  //                                     geometry: queryPolygon,
  //                                     outFields: ["*"],
  //                                     outSpatialReference: app.activeView.spatialReference,
  //                                     returnGeometry: true,
  //                                 })
  //                                 .then(function (results) {
  //                                     let graphics = results.features;

  //                                     // remove existing highlighted features
  //                                     if (app.highlightedFeature) {
  //                                         app.highlightedFeature.remove();
  //                                     }
  //                                     // highlight query results
  //                                     app.highlightedFeature = layerView.highlight(graphics);
  //                                     // zoom to extent of query polygon, zoomed out by a factor of 2
  //                                     app.activeView.goTo(queryPolygon.extent.expand(2));
  //                                 });
  //                         } else if (event.state === "aborted" || event.state === "complete") {
  //                             // USER EITHER COMPLETED THE POLYGON OR CLICKED OFF OF QUERY POLYGON WITHOUT MOVING IT
  //                             // RE-ENABLE POPUPS
  //                             try {
  //                                 app.activeView.popup = new Popup({
  //                                     dockEnabled: true,
  //                                     dockOptions: {
  //                                         position: "bottom-right",
  //                                         breakpoint: {
  //                                             width: 600,
  //                                             height: 1000,
  //                                         },
  //                                     },
  //                                 });
  //                             } catch (error) {
  //                                 console.log("Error recreating popup: ", error.message);
  //                             }
  //                         }
  //                     });
  //                 });

  //                 // if attribute table already exists, destroy it and recreate the attribute table div
  //                 if (app.attributeTable) {
  //                     app.attributeTable.destroy();
  //                     let panelBody = document.getElementById("attributeTablePanelBody");
  //                     let attributeTable = document.createElement("div");
  //                     attributeTable.id = "attributeTable";
  //                     panelBody.appendChild(attributeTable);
  //                 }
  //                 // create attribute table
  //                 app.attributeTable = new FeatureTable({
  //                     layer: app.attributeTableLayer,
  //                     fieldConfigs: app.attributeTableFieldConfig,
  //                     container: document.getElementById("attributeTable"),
  //                     // attachmentsEnabled: true
  //                 });
  //                 // add Zoom To Selected Features Button To Table Controls dropdown
  //                 // try {
  //                 //   if ($('.esri-feature-table__menu-accordion #zoomTo').length === 0) {
  //                 //     let tableControls = document.getElementsByClassName('esri-feature-table__menu-accordion').item(0);
  //                 //       let li = document.createElement('li');
  //                 //       let button = document.createElement('button');
  //                 //       let span = document.createElement('span');
  //                 //       li.id = 'zoomTo';
  //                 //       li.classList.add('esri-feature-table__menu-item');
  //                 //       li.setAttribute('role', 'menuitem');
  //                 //       button.classList.add('esri-feature-table__button', 'esri-feature-table__menu-item-label');
  //                 //       button.id = 'zoomToButton';
  //                 //       span.classList.add('esri-feature-table__menu-item-label__content');
  //                 //       span.innerHTML = 'Zoom To Selected Feature';
  //                 //       button.appendChild(span);
  //                 //       li.appendChild(button);
  //                 //       tableControls.appendChild(li);

  //                 //   }
  //                 // } catch(err) {
  //                 //   console.log('error message',err.message)
  //                 // }

  //                 // Get the FeatureLayer's layerView and listen for the table's selection-change event
  //                 app.activeView.whenLayerView(app.attributeTableLayer).then(function (layerView) {
  //                     app.attributeTable.on("selection-change", function (changes) {
  //                         // If the selection is removed remove its highlighted feature from the layerView
  //                         changes.removed.forEach(function (item) {
  //                             const data = app.highlights.find(function (data) {
  //                                 return data.feature === item.feature;
  //                             });
  //                             if (data) {
  //                                 app.highlights.splice(app.highlights.indexOf(data), 1);
  //                                 data.highlight.remove();
  //                             }
  //                         });

  //                         // If the selection is added, push all added selections to array and highlight on layerView
  //                         changes.added.forEach(function (item) {
  //                             const feature = item.feature;
  //                             highlight = layerView.highlight(item.feature);
  //                             app.highlights.push({
  //                                 feature: feature,
  //                                 highlight: highlight,
  //                             });
  //                         });
  //                     });

  //                     // document.getElementById('zoomToButton').addEventListener("click", zoomToSelectedFeature);

  //                     // fires when "Zoom to selected feature" button is clicked
  //                     function zoomToSelectedFeature() {
  //                         // Create a query off of the feature layer
  //                         const query = app.attributeTableLayer.createQuery();
  //                         // Iterate through the highlights and grab the feature's objectID
  //                         const featureIds = app.highlights.map(function (result) {
  //                             return result.feature.getAttribute(app.attributeTableLayer.objectIdField);
  //                         });
  //                         // Set the query's objectId
  //                         query.objectIds = featureIds;
  //                         // Make sure to return the geometry to zoom to
  //                         query.returnGeometry = true;
  //                         // Call queryFeatures on the feature layer and zoom to the resulting features
  //                         app.attributeTableLayer.queryFeatures(query).then(function (results) {
  //                             app.activeView.goTo(results.features).catch(function (error) {
  //                                 if (error.name != "AbortError") {
  //                                     console.error(error);
  //                                 }
  //                             });
  //                         });
  //                     }
  //                 });
  //             })
  //             .then(function () {
  //                 app.activeView.watch("extent", () => updateOverviewMapExtent(app.extentIndicator));
  //                 app.overviewMapView.watch("extent", () => updateOverviewMapExtent(app.extentIndicator));
  //             })
  //             .then(function () {
  //                 reactiveUtils.when(
  //                     () => app.activeView.stationary,
  //                     () => {
  //                         updateOverviewMap();
  //                     }
  //                 );
  //             });

  //         // watchUtils.whenOnce(app.activeView, "ready").then(function () {

  //         // }).then(function () {
  //         //   app.activeView.watch('extent', () => updateOverviewMapExtent(app.extentIndicator));
  //         //   app.overviewMapView.watch('extent', () => updateOverviewMapExtent(app.extentIndicator));
  //         // }).then(function () {
  //         //   watchUtils.when(app.activeView, "stationary", updateOverviewMap);
  //         // });
  //     } else {
  //         // disable 3D map nav button, re-enable 2D map nav button
  //         app.mapViewNav.style.pointerEvents = "auto";
  //         app.sceneViewNav.style.pointerEvents = "none";
  //         // switch views from 2D to 3D
  //         app.overviewMap.ground = "world-elevation";
  //         app.overviewMapView.container = null;
  //         app.overviewMapSceneView.container = "overviewMap";
  //         app.overviewMapSceneView.popup = null;
  //         app.overviewMapBasemapToggle.view = app.overviewMapSceneView;
  //         app.overviewMapSceneView.ui.add(app.overviewMapBasemapToggle, "top-right");

  //         // add elevation ground to 3D scene
  //         app.map.ground = "world-elevation";

  //         // if the user switchs views while measuring, clear measurement and destroy widget instance
  //         try {
  //             app.measureWidget2D.viewModel.clearMeasurement();
  //             app.activeView.ui.remove(app.measureWidget2D);
  //             app.measureWidget2D.destroy();
  //             app.measureWidget2D = null;
  //         } catch (e) {
  //             console.log("2D Measurement Widget Error Message: ", e.message);
  //         }

  //         // is the user switches views while updating graphic, cancel update procedure
  //         if (app.sketchWidget.updateGraphics.items.length > 0) {
  //             try {
  //                 app.sketchWidget.cancel();
  //             } catch (e) {
  //                 console.log("Sketch Widget Error Message: ", e.message);
  //             }
  //         } else if (app.querySketchWidget.updateGraphics.items.length > 0) {
  //             try {
  //                 app.querySketchWidget.cancel();
  //             } catch (error) {
  //                 console.log("stats widget - sketch widget update error: ", error.message);
  //             }
  //         }

  //         // if overview map toggle button is turned off re-check box
  //         if (!app.overviewMapToggleBox.checked) {
  //             app.overviewMapToggleBox.checked = "checked";
  //         }

  //         // if user switched overview off, turn back on. always keep off on mobile
  //         redisplayOverviewMap();

  //         syncViews(app.mapView, app.sceneView);
  //         setActiveView(app.sceneView);

  //         app.queryGraphicsLayer.removeAll();
  //         try {
  //             app.chartCount.destroy();
  //         } catch (error) {
  //             console.log("Chart Destroy Error Message: ", error.message);
  //         }
  //         app.chartCount = null;

  //         // once app.activeView finishes loading...
  //         reactiveUtils
  //             .whenOnce(() => app.activeView.ready)
  //             .then(() => {
  //                 app.home.view = app.activeView;
  //                 app.home.viewpoint = app.defaultHomeViewPoint;
  //                 app.track.view = app.activeView;
  //                 app.scaleBar.view = app.activeView;
  //                 app.basemapGallery.view = app.activeView;
  //                 app.legend.view = app.activeView;
  //                 app.layerList.view = app.activeView;
  //                 app.coordinateConversion.view = app.activeView;
  //                 app.sketchWidget.view = app.activeView;
  //                 app.querySketchWidget.view = app.activeView;
  //                 app.elevationProfileWidget.view = app.activeView;

  //                 // hide bookmarks widget
  //                 app.bookmarksWidget3dWarningText[0].innerHTML = "<p>Bookmarks widget is not supported in 3D.</p>";
  //                 app.bookmarksWidgetListItem.classList.add("hidden");
  //                 // app.editorWidgetListItem.classList.add('hidden');

  //                 // create 3D area and distance measurements
  //                 create3DDistanceMeasureWidget();
  //                 create3DAreaMeasureWidget();
  //                 // hide 2D measure buttons, display 3D measure buttons
  //                 app.measureWidgetButtons2D.classList.add("hidden");
  //                 app.measureWidgetButtons3D.classList.remove("hidden");

  //                 app.printWidgetDiv.classList.add("hidden");
  //                 app.elevationToggleDiv.classList.remove("hidden");
  //                 app.clusterDiv.classList.add("hidden");

  //                 app.elevationProfileButton.classList.remove("hidden");

  //                 // if attribute table already exists, destroy it and recreate the attribute table div
  //                 if (app.attributeTable) {
  //                     app.attributeTable.destroy();
  //                     let panelBody = document.getElementById("attributeTablePanelBody");
  //                     let attributeTable = document.createElement("div");
  //                     attributeTable.id = "attributeTable";
  //                     panelBody.appendChild(attributeTable);
  //                 }
  //                 // create attribute table
  //                 app.attributeTable = new FeatureTable({
  //                     layer: app.attributeTableLayer,
  //                     fieldConfigs: app.attributeTableFieldConfig,
  //                     container: document.getElementById("attributeTable"),
  //                     // attachmentsEnabled: true
  //                 });

  //                 // add Zoom To Selected Features Button To Table Controls dropdown
  //                 // try{
  //                 //   if ($('.esri-feature-table__menu-accordion #zoomTo').length === 0) {
  //                 //     let tableControls = document.getElementsByClassName('esri-feature-table__menu-accordion').item(0);
  //                 //     let li = document.createElement('li');
  //                 //     let button = document.createElement('button');
  //                 //     let span = document.createElement('span');
  //                 //     li.id = 'zoomTo'
  //                 //     li.classList.add('esri-feature-table__menu-item')
  //                 //     li.setAttribute('role', 'menuitem')
  //                 //     button.classList.add('esri-feature-table__button', 'esri-feature-table__menu-item-label');
  //                 //     button.id = 'zoomToButton';
  //                 //     span.classList.add('esri-feature-table__menu-item-label__content');
  //                 //     span.innerHTML = 'Zoom To Selected Feature'
  //                 //     button.appendChild(span)
  //                 //     li.appendChild(button)
  //                 //     tableControls.appendChild(li)
  //                 //   }
  //                 // }catch(err){
  //                 //     console.log('Error message', err.message)
  //                 // }

  //                 // Get the FeatureLayer's layerView and listen for the table's selection-change event
  //                 app.activeView.whenLayerView(app.attributeTableLayer).then(function (layerView) {
  //                     app.attributeTable.on("selection-change", function (changes) {
  //                         // If the selection is removed remove its highlighted feature from the layerView
  //                         changes.removed.forEach(function (item) {
  //                             const data = app.highlights.find(function (data) {
  //                                 return data.feature === item.feature;
  //                             });
  //                             if (data) {
  //                                 app.highlights.splice(app.highlights.indexOf(data), 1);
  //                                 data.highlight.remove();
  //                             }
  //                         });

  //                         // If the selection is added, push all added selections to array and highlight on layerView
  //                         changes.added.forEach(function (item) {
  //                             const feature = item.feature;
  //                             highlight = layerView.highlight(item.feature);
  //                             app.highlights.push({
  //                                 feature: feature,
  //                                 highlight: highlight,
  //                             });
  //                         });
  //                     });

  //                     // document.getElementById('zoomToButton').addEventListener("click", zoomToSelectedFeature);

  //                     // fires when "Zoom to selected feature" button is clicked
  //                     function zoomToSelectedFeature() {
  //                         // Create a query off of the feature layer
  //                         const query = app.attributeTableLayer.createQuery();
  //                         // Iterate through the highlights and grab the feature's objectID
  //                         const featureIds = app.highlights.map(function (result) {
  //                             return result.feature.getAttribute(app.attributeTableLayer.objectIdField);
  //                         });
  //                         // Set the query's objectId
  //                         query.objectIds = featureIds;
  //                         // Make sure to return the geometry to zoom to
  //                         query.returnGeometry = true;
  //                         // Call queryFeatures on the feature layer and zoom to the resulting features
  //                         app.attributeTableLayer.queryFeatures(query).then(function (results) {
  //                             app.activeView.goTo(results.features).catch(function (error) {
  //                                 if (error.name != "AbortError") {
  //                                     console.error(error);
  //                                 }
  //                             });
  //                         });
  //                     }
  //                 });

  //                 // 3d screenshot section
  //                 app.screenshot3DSection.classList.remove("hidden");

  //                 // add an event listener to capture a screenshot
  //                 app.screenshot3DButton.addEventListener("click", function () {
  //                     let width, height, padding, innerWidth, innerHeight, options;

  //                     app.screenshot3DButton.classList.add("active");

  //                     width = 1532;
  //                     height = 992;
  //                     padding = app.activeView.padding;
  //                     innerWidth = app.activeView.width - padding.left - padding.right;
  //                     innerHeight = app.activeView.height - padding.top - padding.bottom;
  //                     options = {
  //                         format: "png",
  //                         area: {
  //                             x: (innerWidth - width) / 2,
  //                             y: (innerHeight - height) / 2,
  //                             width: width,
  //                             height: height,
  //                         },
  //                     };

  //                     app.activeView.takeScreenshot(options).then(function (screenshot) {
  //                         // display a preview of the image
  //                         showPreview(screenshot);
  //                         // create the image for download
  //                         document.getElementById("download3dScreenshotButton").onclick = function () {
  //                             let title, dataUrl;

  //                             title = document.getElementById("screenshot3ddiv_title").value;

  //                             // if a text exists, then add it to the image
  //                             if (title) {
  //                                 dataUrl = getImageWithText(screenshot, title);
  //                                 downloadImage(app.map.portalItem.title + ".png", dataUrl);
  //                             }
  //                             // otherwise download only the webscene screenshot
  //                             else {
  //                                 downloadImage(app.map.portalItem.title + ".png", screenshot.dataUrl);
  //                             }
  //                         };

  //                         // the screenshot mode is disabled
  //                         app.screenshot3DButton.classList.remove("active");
  //                     });
  //                 });

  //                 // button to hide the print preview html element
  //                 document.getElementById("close3dScreenshotButton").addEventListener("click", function () {
  //                     app.screenshot3DDiv.classList.add("hidden");
  //                 });

  //                 // allows user to turn elevation ground layer on/off

  //                 app.elevationToggle.addEventListener("change", toggleElevation);
  //                 // if user turns off elevation and switches back to 2d re-check box once they switch back to 3d again
  //                 if (!app.elevationToggle.checked) {
  //                     app.elevationToggle.checked = "checked";
  //                 }
  //                 // reactivate query
  //                 app.activeView.whenLayerView(app.queryLayer).then(function (layerView) {
  //                     app.queryLayerView = layerView;
  //                     app.querySketchWidget.on("create", function (event) {
  //                         try {
  //                             app.queryPolygon = event.graphic.geometry;
  //                             app.activeQueryPolygonButton = event.tool;
  //                         } catch (error) {
  //                             console.log("stats widget error message: ", error.message);
  //                         }

  //                         if (event.state === "active") {
  //                             // remove existing buffer graphic and any highlighted features before creating new one
  //                             try {
  //                                 app.queryGraphicsLayer.removeAll();
  //                                 if (app.highlightedFeature) {
  //                                     app.highlightedFeature.remove();
  //                                 }
  //                                 app.statsTable.clearData();
  //                             } catch (error) {
  //                                 console.log("querySketchWidget error: ", error.message);
  //                             }

  //                             // calculate area of query polygon
  //                             app.queryMeasureArea = geometryEngine.geodesicArea(app.queryPolygon, "square-feet");
  //                             if (app.queryMeasureArea < 0) {
  //                                 // simplify the polygon if needed and calculate the area again
  //                                 let simplifiedPolygon = geometryEngine.simplify(app.queryPolygon);
  //                                 if (simplifiedPolygon) {
  //                                     app.queryMeasureArea = geometryEngine.geodesicArea(simplifiedPolygon, "square-feet");
  //                                 }
  //                             }

  //                             // if tool is circle also calculate radius
  //                             if (event.tool === "circle") {
  //                                 app.queryMeasureRadius = Math.sqrt(app.queryMeasureArea / Math.PI);
  //                             } else {
  //                                 app.queryMeasureRadius = 0;
  //                             }
  //                             app.queryMeasureContainerArea.innerHTML = numberWithCommas(app.queryMeasureArea.toFixed(2)) + " ft" + app.squaredSymbol;
  //                             app.queryMeasureContainerRadius.innerHTML = numberWithCommas(app.queryMeasureRadius.toFixed(2)) + " ft";
  //                         } else if (event.state === "complete") {
  //                             app.queryingIndicatorContainer.classList.remove("noVisibility");
  //                             // this polygon will be used to query features that intersect it
  //                             startQuery(app.queryPolygon);

  //                             app.queryLayer
  //                                 .queryFeatures({
  //                                     geometry: app.queryPolygon,
  //                                     outFields: ["*"],
  //                                     outSpatialReference: app.activeView.spatialReference,
  //                                     returnGeometry: true,
  //                                 })
  //                                 .then(function (results) {
  //                                     let graphics = results.features;

  //                                     // remove existing highlighted features
  //                                     if (app.highlightedFeature) {
  //                                         app.highlightedFeature.remove();
  //                                     }

  //                                     // highlight query results
  //                                     app.highlightedFeature = layerView.highlight(graphics);
  //                                     // zoom to extent of query polygon, zoomed out by a factor of 2
  //                                     app.activeView.goTo(app.queryPolygon.extent.expand(2));
  //                                 });
  //                         }
  //                     });

  //                     app.querySketchWidget.on("update", function (event) {
  //                         let queryPolygon = event.graphics[0].geometry;
  //                         if (event.state === "start" && event.toolEventInfo === null) {
  //                             // USER SELECTS QUERY POLYGON TO MOVE, SCALE, OR RESHAPE FOR FIRST TIME
  //                             // FIRST SET POPUP TO NULL TO PREVENT POPUP FROM OPENING WHEN USER CLICKS ON GRAPHIC TO START UPDATE THEN IMMEDIATELY RE-CREATE THE POPUP
  //                             app.activeView.popup = null;
  //                             app.activeView.popup = new Popup({
  //                                 dockEnabled: true,
  //                                 dockOptions: {
  //                                     position: "bottom-right",
  //                                     breakpoint: {
  //                                         width: 600,
  //                                         height: 1000,
  //                                     },
  //                                 },
  //                             });
  //                         } else if (event.state === "active" && (event.toolEventInfo.type === "scale" || event.toolEventInfo.type === "reshape")) {
  //                             // AS USER SCALES OR ROTATES QUERY POLYGON, UPDATE MEASUREMENTS
  //                             // let queryPolygon = event.graphics[0].geometry;
  //                             app.queryMeasureArea = geometryEngine.geodesicArea(queryPolygon, "square-feet");
  //                             if (app.queryMeasureArea < 0) {
  //                                 // simplify the polygon if needed and calculate the area again
  //                                 let simplifiedPolygon = geometryEngine.simplify(queryPolygon);
  //                                 if (simplifiedPolygon) {
  //                                     app.queryMeasureArea = geometryEngine.geodesicArea(simplifiedPolygon, "square-feet");
  //                                 }
  //                             }
  //                             // if tool is circle also calculate radius
  //                             if (app.activeQueryPolygonButton === "circle") {
  //                                 app.queryMeasureRadius = Math.sqrt(app.queryMeasureArea / Math.PI);
  //                             } else {
  //                                 app.queryMeasureRadius = 0;
  //                             }
  //                             app.queryMeasureContainerArea.innerHTML = numberWithCommas(app.queryMeasureArea.toFixed(2)) + " ft" + app.squaredSymbol;
  //                             app.queryMeasureContainerRadius.innerHTML = numberWithCommas(app.queryMeasureRadius.toFixed(2)) + " ft";
  //                         } else if (event.state === "active" && (event.toolEventInfo.type === "move-stop" || event.toolEventInfo.type === "scale-stop" || event.toolEventInfo.type === "reshape-stop" || event.toolEventInfo.type === "rotate-stop")) {
  //                             // ONCE USER STOPS MOVING, SCALING, OR RESHAPING QUERY POLYGON, EXECUTE THE QUERY
  //                             app.queryingIndicatorContainer.classList.remove("noVisibility");
  //                             startQuery(queryPolygon);
  //                             app.queryLayer
  //                                 .queryFeatures({
  //                                     geometry: queryPolygon,
  //                                     outFields: ["*"],
  //                                     outSpatialReference: app.activeView.spatialReference,
  //                                     returnGeometry: true,
  //                                 })
  //                                 .then(function (results) {
  //                                     let graphics = results.features;

  //                                     // remove existing highlighted features
  //                                     if (app.highlightedFeature) {
  //                                         app.highlightedFeature.remove();
  //                                     }
  //                                     // highlight query results
  //                                     app.highlightedFeature = layerView.highlight(graphics);
  //                                     // zoom to extent of query polygon, zoomed out by a factor of 2
  //                                     app.activeView.goTo(queryPolygon.extent.expand(2));
  //                                 });
  //                         } else if (event.state === "aborted" || event.state === "complete") {
  //                             // USER EITHER COMPLETED THE POLYGON OR CLICKED OFF OF QUERY POLYGON WITHOUT MOVING IT
  //                             // RE-ENABLE POPUPS
  //                             try {
  //                                 app.activeView.popup = new Popup({
  //                                     dockEnabled: true,
  //                                     dockOptions: {
  //                                         position: "bottom-right",
  //                                         breakpoint: {
  //                                             width: 600,
  //                                             height: 1000,
  //                                         },
  //                                     },
  //                                 });
  //                             } catch (error) {
  //                                 console.log("Error recreating popup: ", error.message);
  //                             }
  //                         }
  //                     });
  //                 });
  //             })
  //             .then(function () {
  //                 app.activeView.watch("extent", () => updateOverviewMapExtent(app.extentIndicator));
  //                 app.overviewMapView.watch("extent", () => updateOverviewMapExtent(app.extentIndicator));
  //             })
  //             .then(function () {
  //                 reactiveUtils.when(
  //                     () => app.activeView.stationary,
  //                     () => {
  //                         updateOverviewMap();
  //                     }
  //                 );
  //             });

  //         // watchUtils.whenOnce(app.activeView, "ready").then(function () {

  //         // }).then(function () {
  //         //   app.activeView.watch('extent', () => updateOverviewMapExtent(app.extentIndicator));
  //         //   app.overviewMapView.watch('extent', () => updateOverviewMapExtent(app.extentIndicator));
  //         // }).then(function () {
  //         //   watchUtils.when(app.activeView, "stationary", updateOverviewMap);
  //         // });
  //     }
  //     // add ui widgets every time the view is changed
  //     app.activeView.ui.add(app.home, "top-left");
  //     app.activeView.ui.add(app.track, "top-left");
  //     app.activeView.ui.add(app.scaleBar, "bottom-left");
  //     syncSearch(app.activeView);
  // });

  // $("#collapseTable").on("shown.bs.collapse", function () {
  //     try {
  //         if (app.statsTable !== null) {
  //             app.statsTable.redraw(true);
  //         }
  //     } catch (error) {
  //         console.log("Error Message redraw table: ", error.message);
  //     }
  // });

  // assign element id/class names to app properties
  function assignAppProperties() {
    app.bookmarksWidgetListItem = document.getElementById(
      "bookmarksWidgetListItem"
    );
    app.bookmarksWidget3dWarningText = document.getElementsByClassName(
      "esri-bookmarks__loader-container"
    );
    app.extentIndicator = document.getElementById("extentIndicator");

    app.measureWidgetButtons2D = document.getElementById(
      "measureWidgetButtons2D"
    );

    app.measureWidgetButtons3D = document.getElementById(
      "measureWidgetButtons3D"
    );

    app.pointStyles = document.getElementById("sketchWidgetStylesPoint");

    app.polylineStyles = document.getElementById("sketchWidgetStylesPolyline");

    app.polygonStyles = document.getElementById("sketchWidgetStylesPolygon");

    app.pointSymbolButtonColor = document.getElementById("colorSelectPoint");

    app.pointSymbolButtonOpacity = document.getElementById(
      "colorSelectPointAlpha"
    );

    app.pointSymbolButtonStyle = document.getElementById("pointStyleSelect");

    app.pointSymbolButtonSize = document.getElementById("pointSizeSelect");

    app.pointSymbolButtonOutlineColor = document.getElementById(
      "outlineColorSelectPoint"
    );

    app.pointSymbolButtonOutlineColorOpacity = document.getElementById(
      "outlineColorSelectPointAlpha"
    );

    app.pointSymbolButtonOutlineWidth = document.getElementById(
      "outlineWidthSelectPoint"
    );

    app.polylineSymbolButtonColor = document.getElementById(
      "colorSelectPolyline"
    );

    app.polylineSymbolButtonOpacity = document.getElementById(
      "colorSelectPolylineAlpha"
    );

    app.polylineSymbolButtonStyle = document.getElementById(
      "polylineStyleSelect"
    );

    app.polylineSymbolButtonWidth = document.getElementById(
      "polylineWidthSelect"
    );

    app.polygonSymbolButtonColor =
      document.getElementById("colorSelectPolygon");

    app.polygonSymbolButtonOpacity = document.getElementById(
      "colorSelectPolygonAlpha"
    );

    app.polygonSymbolButtonStyle =
      document.getElementById("polygonStyleSelect");

    app.polygonSymbolButtonOutlineColor = document.getElementById(
      "outlineColorSelectPolygon"
    );

    app.polygonSymbolButtonOutlineColorOpacity = document.getElementById(
      "outlineColorSelectPolygonAlpha"
    );

    app.polygonSymbolButtonOutlineWidth = document.getElementById(
      "polygonOutlineWidthSelect"
    );
    app.printWidgetDiv = document.getElementById("printWidgetDiv");

    app.chartDiv = document.getElementById("chartDiv");

    app.queryingIndicatorContainer = document.getElementById(
      "queryingIndicatorContainer"
    );

    app.queryMeasureContainerArea = document.getElementById(
      "queryMeasureContainerArea"
    );

    app.queryMeasureContainerRadius = document.getElementById(
      "queryMeasureContainerRadius"
    );

    app.queryTools = document.getElementById("queryTools");

    app.clearHighlightedFeatures = document.getElementById(
      "clearHighlightedFeatures"
    );

    app.zoomToExtentOfQueryPoly = document.getElementById(
      "zoomToExtentOfQueryPoly"
    );

    // app.mapViewNav = document.getElementById("mapViewNav");

    // app.sceneViewNav = document.getElementById("sceneViewNav");

    app.screenshot3DButton = document.getElementById("screenshot3DButton");

    app.screenshot3DSection = document.getElementById("screenshot3DSection");

    app.screenshot3DDiv = document.getElementById("screenshot3DDiv");

    // app.editorWidgetListItem = document.getElementById('editorWidgetListItem');

    app.overviewMapToggleBox = document.getElementById("overviewMapToggleBox");

    app.elevationToggleDiv = document.getElementById("elevationToggleDiv");

    app.clusterDiv = document.getElementById("clusterDiv");

    app.elevationToggle = document.getElementById("elevationToggle");

    app.filterToolSelectMenu = document.getElementById("filterToolSelectMenu");
    app.filterToolSelectMenuLabel = document.getElementById(
      "filterToolSelectMenuLabel"
    );

    app.coordinateConversionWarningText = document.getElementById(
      "coordConversionWarning"
    );

    app.attributeTableLayerSelect = document.getElementById("layerSelectMenu");
  }

  function findLayerByTitle(title, map) {
    try {
      if (map === "main") {
        return app.activeView.map.allLayers.find(function (layer) {
          return layer.title === title;
        });
      } else if (map === "overview") {
        return app.overviewMapView.map.allLayers.find(function (layer) {
          return layer.title === title;
        });
      } else {
        console.log('Error, please enter either "main" or "overview"');
      }
    } catch (error) {
      console.log("Error message findLayerByTitle: ", error.message);
    }
  }

  function startQuery(queryPolygon) {
    return queryLayerViewStats(queryPolygon).then(function (newData) {
      updateCharts(newData, "canvasCount");
    });
  }

  // FILTER LAYERS SECTION
  // creates an array of attribute values for all features in the queried layer, then creates a new array of unique values
  function getUniqueValues(response) {
    let uniqueValues = [];
    let features = response.features;
    let layerTitle = features[0].layer.title;
    let fieldNameToFilterBy = response.fields[0].name;
    let values = features.map(function (feature) {
      return feature.attributes[app.filterToolField];
    });
    // create array of unique values
    values.forEach(function (item) {
      if (
        (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
        item !== ""
      ) {
        uniqueValues.push(item);
      }
    });
    // after array of unique attributes has been created add 'empty' value that will be used to clear the definition expression SQL query
    uniqueValues.push("");
    // populate filter dropdown menu with dynamic label
    app.filterToolSelectMenuLabel.innerHTML =
      "Filter " +
      "<i>" +
      layerTitle +
      "</i>" +
      " By " +
      "<i>" +
      fieldNameToFilterBy +
      "</i>";
    return uniqueValues;
  }
  // receives array of unique values and then creates html option elements that are added to dropdown menu
  function addToSelectMenu(uniqueValues) {
    let i;
    // clear existing options if needed
    if (app.filterToolSelectMenu.options.length > 0) {
      for (i = app.filterToolSelectMenu.options.length - 1; i >= 0; i--) {
        app.filterToolSelectMenu.remove(i);
      }
    }
    uniqueValues.sort();

    uniqueValues.forEach(function (value) {
      let option = document.createElement("option");
      if (value === "") {
        option.text = "No Filter";
        option.value = "";
        app.filterToolSelectMenu.add(option);
      } else {
        option.text = value;
        app.filterToolSelectMenu.add(option);
      }
    });
    return setFilterLayerDefinitionExpression(app.filterToolSelectMenu.value);
  }
  // creates a definition expression SQL query to filter layer
  function setFilterLayerDefinitionExpression(value) {
    if (value === "") {
      app.filterToolLayer.definitionExpression = null;
      app.filterToolLayerOverviewMap.definitionExpression = null;
    } else {
      try {
        app.filterToolLayer.definitionExpression =
          app.filterToolField + " = '" + value + "'";
        app.filterToolLayerOverviewMap.definitionExpression =
          app.filterToolField + " = '" + value + "'";
      } catch (error) {
        console.log(
          "Error message setFilterLayerDefinitionExpression: ",
          error.message
        );
      }
    }
  }

  function updateOverviewMapExtent(extentIndicator) {
    let extent, bottomLeft, topRight;
    // Update the overview extent by converting the SceneView extent to the
    // MapView screen coordinates and updating the extentIndicator position.
    reactiveUtils
      .whenOnce(() => app.activeView.ready)
      .then(() => {
        // only actively update extent div when map is pointed due north to prevent div size errors. When user rotates away from due north
        // the overview map extent will still be present, however, it will not actively move as user pans map
        if (app.activeView.type === "3d") {
          extentIndicator.style.visibility = "hidden";
        } else if (
          app.activeView.type === "2d" &&
          app.activeView.rotation === 0
        ) {
          // if user switches to 3d then back to 2d again, turn extent indicator back on
          if (extentIndicator.style.visibility === "hidden") {
            extentIndicator.style.visibility = "visible";
          }

          extent = app.activeView.extent;

          bottomLeft = app.overviewMapView.toScreen(
            new Point({
              x: extent.xmin,
              y: extent.ymin,
              spatialReference: extent.spatialReference,
            })
          );
          topRight = app.overviewMapView.toScreen(
            new Point({
              x: extent.xmax,
              y: extent.ymax,
              spatialReference: extent.spatialReference,
            })
          );
          extentIndicator.style.top = topRight.y + "px";
          extentIndicator.style.left = bottomLeft.x + "px";

          extentIndicator.style.height = bottomLeft.y - topRight.y + "px";
          extentIndicator.style.width = topRight.x - bottomLeft.x + "px";
        } else if (app.activeView.type === "2d") {
          // if user switches to 3d then back to 2d again, turn extent indicator back on
          if (extentIndicator.style.visibility === "hidden") {
            extentIndicator.style.visibility = "visible";
          }
        }
      });
  }

  function updateOverviewMap() {
    // Animate the MapView to a zoomed-out scale so we get a nice overview.
    // We use the "progress" callback of the goTo promise to update
    // the overview extent while animating
    reactiveUtils
      .whenOnce(() => app.activeView.ready)
      .then(() => {
        if (app.activeView.type === "2d") {
          app.overviewMapView.goTo(
            {
              center: app.activeView.center,
              scale:
                app.activeView.scale *
                2 *
                Math.max(
                  app.activeView.width / app.overviewMapView.width,
                  app.activeView.height / app.overviewMapView.height
                ),
              rotation: app.activeView.rotation,
            },
            {
              duration: 200,
              easing: "ease-out",
            }
          );
        } else {
          app.overviewMapSceneView.goTo(
            {
              center: app.activeView.center,
              heading: app.activeView.camera.heading,
              tilt: app.activeView.camera.tilt,
              scale:
                app.activeView.scale *
                2.35 *
                Math.max(
                  app.activeView.width / app.overviewMapSceneView.width,
                  app.activeView.height / app.overviewMapSceneView.height
                ),
            },
            {
              duration: 750,
              easing: "ease-out",
            }
          );
        }
      });
  }

  function redisplayOverviewMap() {
    // gets media query matches to control when overview map should automatically turn back on.
    // Only turn back on automatically when on desktop, keep hidden while on mobile.
    app.ipadPro125Landscape = window.matchMedia(
      "only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)"
    );
    app.ipadPro125Portrait = window.matchMedia(
      "only screen and (min-device-width: 1024px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2)"
    );
    app.ipadPro105Landscape = window.matchMedia(
      "only screen and (min-device-width: 1112px) and (max-device-width: 1112px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)"
    );
    app.ipadPro105Portrait = window.matchMedia(
      "only screen and (min-device-width: 834px) and (max-device-width: 834px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2)"
    );
    app.ipad3497 = window.matchMedia(
      "only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2)"
    );
    app.ipad12MiniAir = window.matchMedia(
      "only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1)"
    );
    app.smartPhonesPortrait = window.matchMedia(
      "(min-width: 320px) and (max-width: 480px)"
    );
    app.smartPhonesLandscape = window.matchMedia(
      "(min-width: 481px) and (max-width: 767px)"
    );

    if (
      app.smartPhonesPortrait.matches ||
      app.smartPhonesLandscape.matches ||
      app.ipadPro125Landscape.matches ||
      app.ipadPro125Portrait.matches ||
      app.ipadPro105Landscape.matches ||
      app.ipadPro105Portrait.matches ||
      app.ipad3497.matches ||
      app.ipad12MiniAir.matches
    ) {
      console.log("On phone");
    } else {
      console.log("On desktop");
      // if overviewDiv is hidden by user, turn it back on
      if ($("#overviewMap").is(":hidden")) {
        $("#overviewMap").show();
      }
    }
  }

  function setActiveWidget2D(type) {
    let distanceDiv, distanceDivArea;
    switch (type) {
      case "distance":
        app.measureWidget2D = new DistanceMeasurement2D({
          viewModel: {
            view: app.activeView,
            // unit: 'imperial',
            // mode: 'geodesic'
          },
        });

        if (app.measureWidget2D.view === null) {
          app.measureWidget2D.view = app.activeView;
        }
        distanceDiv = document.createElement("div");
        app.measureWidget2D.container = distanceDiv;
        document.getElementById("measureOutput2D").appendChild(distanceDiv);
        setActiveButton_2Dmeasurewidget(document.getElementById("drawPolygon"));
        break;
      case "area":
        app.measureWidget2D = new AreaMeasurement2D({
          viewModel: {
            view: app.activeView,
            // unit: 'imperial',
            // mode: 'geodesic'
          },
        });
        distanceDivArea = document.createElement("div");
        app.measureWidget2D.container = distanceDivArea;
        document.getElementById("measureOutput2D").appendChild(distanceDivArea);
        break;
      case null:
        if (app.measureWidget2D) {
          app.activeView.ui.remove(app.measureWidget2D);
          app.measureWidget2D.destroy();
        }
        break;
    }
  }

  function setActiveButton_2Dmeasurewidget(selectedbutton) {
    app.activeView.focus();
    let i,
      elements = document.getElementsByClassName("active");
    for (i = 0; i < elements.length; i++) {
      if (elements[i].id === "drawPolygon") {
        elements[i].classList.remove("active");
      } else if (elements[i].id === "drawPolyline") {
        elements[i].classList.remove("active");
      }
    }
    if (selectedbutton) {
      selectedbutton.classList.add("active");
    }
  }

  function create2DDistanceMeasureWidget() {
    let distanceButton = document.getElementById("drawPolyline");
    distanceButton.removeEventListener(
      "click",
      app.eventListener2DMeasureWidgetDistance
    );
    app.eventListener2DMeasureWidgetDistance = function () {
      setActiveWidget2D(null);
      if (!this.classList.contains("active")) {
        return setActiveWidget2D("distance");
      } else {
        return setActiveButton_2Dmeasurewidget(null);
      }
    };
    distanceButton.addEventListener(
      "click",
      app.eventListener2DMeasureWidgetDistance
    );
  }

  function create2DAreaMeasureWidget() {
    let distanceButton = document.getElementById("drawPolygon");
    distanceButton.removeEventListener(
      "click",
      app.eventListener2DMeasureWidgetArea
    );
    app.eventListener2DMeasureWidgetArea = function () {
      setActiveWidget2D(null);
      if (!this.classList.contains("active")) {
        setActiveWidget2D("area");
      } else {
        setActiveButton_2Dmeasurewidget(null);
      }
    };
    distanceButton.addEventListener(
      "click",
      app.eventListener2DMeasureWidgetArea
    );
  }

  function setActiveWidget3D(type) {
    let distanceDiv, distanceDivArea;
    switch (type) {
      case "distance":
        app.measureWidget3D = new DirectLineMeasurement3D({
          view: app.activeView,
          unit: "imperial",
        });
        if (app.measureWidget3D.view === null) {
          app.measureWidget3D.view = app.activeView;
        }
        distanceDiv = document.createElement("div");
        app.measureWidget3D.container = distanceDiv;
        document.getElementById("measureOutput3D").appendChild(distanceDiv);
        setActiveButton_3dmeasurewidget(
          document.getElementById("distanceButton")
        );

        break;
      case "area":
        app.measureWidget3D = new AreaMeasurement3D({
          view: app.activeView,
          unit: "imperial",
        });
        distanceDivArea = document.createElement("div");
        app.measureWidget3D.container = distanceDivArea;
        document.getElementById("measureOutput3D").appendChild(distanceDivArea);
        setActiveButton_3dmeasurewidget(document.getElementById("areaButton"));
        break;
      case null:
        if (app.measureWidget3D) {
          app.activeView.ui.remove(app.measureWidget3D);
          app.measureWidget3D.destroy();
        }
        break;
    }
  }

  function setActiveButton_3dmeasurewidget(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    app.activeView.focus();
    let i,
      elements = document.getElementsByClassName("active");
    for (i = 0; i < elements.length; i++) {
      if (elements[i].id === "areaButton") {
        elements[i].classList.remove("active");
      } else if (elements[i].id === "distanceButton") {
        elements[i].classList.remove("active");
      }
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }

  function create3DDistanceMeasureWidget() {
    let distanceButton = document.getElementById("distanceButton");
    distanceButton.removeEventListener(
      "click",
      app.eventListener3DMeasureWidgetDistance
    );
    app.eventListener3DMeasureWidgetDistance = function () {
      setActiveWidget3D(null);
      if (!this.classList.contains("active")) {
        return setActiveWidget3D("distance");
      } else {
        return setActiveButton_3dmeasurewidget(null);
      }
    };
    distanceButton.addEventListener(
      "click",
      app.eventListener3DMeasureWidgetDistance
    );
  }

  function create3DAreaMeasureWidget() {
    let distanceButton = document.getElementById("areaButton");
    distanceButton.removeEventListener(
      "click",
      app.eventListener3DMeasureWidgetArea
    );
    app.eventListener3DMeasureWidgetArea = function () {
      setActiveWidget3D(null);
      if (!this.classList.contains("active")) {
        setActiveWidget3D("area");
      } else {
        setActiveButton_3dmeasurewidget(null);
      }
    };
    distanceButton.addEventListener(
      "click",
      app.eventListener3DMeasureWidgetArea
    );
  }

  // used to give opacity to color selector, converts color selector hex code to rgba value using alpha value from input slider
  function hexToRgbA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        "," +
        alpha +
        ")"
      );
    }
    throw new Error("Bad Hex");
  }

  function numberWithCommas(y) {
    return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 3D SCREENSHOT SECTION

  // creates an image that will be appended to the DOM
  // so that users can have a preview of the 8.5x11 image they will download
  function showPreview(screenshot) {
    app.screenshot3DDiv.classList.remove("hidden");
    // add the screenshot dataUrl as the src of an image element
    let screenshotImage = document.getElementsByClassName(
      "js-screenshot-image"
    )[0];
    screenshotImage.width = screenshot.data.width * 0.65;
    screenshotImage.height = screenshot.data.height * 0.65;
    screenshotImage.src = screenshot.dataUrl;
  }

  // returns a new image created by adding a custom text to the webscene image
  function getImageWithText(screenshot, text) {
    let imageData = screenshot.data;

    // to add the text to the screenshot we create a new canvas element
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.height = imageData.height;
    canvas.width = imageData.width;

    // add the screenshot data to the canvas
    context.putImageData(imageData, 0, 0);
    context.font = "20px Arial";
    context.fillStyle = "#000";
    context.fillRect(
      0,
      imageData.height - 40,
      context.measureText(text).width + 20,
      30
    );

    // add the text from the textInput element
    context.fillStyle = "#fff";
    context.fillText(text, 10, imageData.height - 20);

    return canvas.toDataURL();
  }

  function downloadImage(filename, dataUrl) {
    let i, element, blobby, blobbyURL, byteString, mimeString, ab, ia, blob;
    // the download is handled differently in Microsoft browsers
    // because the download attribute for <a> elements is not supported
    if (!window.navigator.msSaveOrOpenBlob) {
      // in browsers that support the download attribute
      // a link is created and a programmatic click will trigger the download
      element = document.createElement("a");
      blobby = dataURIToBlob(dataUrl);
      blobbyURL = URL.createObjectURL(blobby);
      element.href = blobbyURL;
      element.download = filename;
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      // for MS browsers convert dataUrl to Blob
      byteString = atob(dataUrl.split(",")[1]);
      mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
      ab = new ArrayBuffer(byteString.length);
      ia = new Uint8Array(ab);
      for (i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      blob = new Blob([ab], {
        type: mimeString,
      });

      // download file
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
  }

  // converts screenshot URL to blob for 3d screenshot widget, called in downloadImage()
  function dataURIToBlob(dataURI) {
    let i, binStr, len, arr, mimeString;
    (binStr = atob(dataURI.split(",")[1])),
      (len = binStr.length),
      (arr = new Uint8Array(len)),
      (mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]);
    for (i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], {
      type: mimeString,
    });
  }

  function toggleElevation(ev) {
    app.map.ground.layers.forEach(function (layer) {
      layer.visible = ev.target.checked;
    });
  }

  // Views
  function syncViews(fromView, toView) {
    let viewPt = fromView.viewpoint.clone();
    fromView.container = null;
    if (fromView.type === "3d") {
      toView.container = app.containerMap;
    } else {
      toView.container = app.containerScene;
    }
    toView.viewpoint = viewPt;
    toView.padding = app.viewPadding;
  }
  // Search Widget
  // function syncSearch(view) {
  //     app.searchWidgetNav.view = view;
  //     if (app.searchWidgetNav.selectedResult) {
  //         reactiveUtils.when(
  //             () => view.ready,
  //             () => {
  //                 app.searchWidgetNav.autoSelect = false;
  //                 app.searchWidgetNav.search(app.searchWidgetNav.selectedResult.name);
  //                 app.searchWidgetNav.autoSelect = true;
  //             },
  //             {
  //                 once: true,
  //             }
  //         );
  //     }
  // }
  // Active view
  function setActiveView(view) {
    app.activeView = view;
  }

  function switchView() {
    const is3D = app.activeView.type === "3d";
    const activeViewpoint = app.activeView.viewpoint.clone();

    // remove the reference to the container for the previous view
    app.activeView.container = null;
    if (is3D) {
      //Switch from 3D to 2D
      //Switch from 3D to 2D
      app.mapView.viewpoint = activeViewpoint;
      app.mapView.container = "mapViewDiv";
      app.activeView = app.mapView;
      //switch overview maps from 3d to 2d
      app.overviewMapSceneView.container = null;
      app.overviewMap.container = "overviewMap";
      app.overviewMap.popup = null;
      app.switchButton.icon = "map";
      app.switchButton.text = "Toggle Map To 3D View";
      app.switchButton.title = "Toggle Map To 3D View";
      reactiveUtils
        .whenOnce(() => app.activeView.ready)
        .then(() => {
          try {
            app.legend.view = app.activeView;
            app.basemapGallery.view = app.activeView;
            app.searchWidgetNav.view = app.activeView;
            app.scaleBar.view = app.activeView;
            app.track.view = app.activeView;
            app.home.view = app.activeView;
            app.coordinateConversion.view = app.activeView;
            app.sketchWidgetSketchViewModel.view = app.activeView;
            app.sketchWidget.view = app.activeView;
            //app.attributeTable.view = app.activeView;
            app.elevationProfileWidget.view = app.activeView;
            app.layerList.view = app.activeView;

            app.measureWidgetButtons2D.classList.remove("hidden");
            app.measureWidgetButtons3D.classList.add("hidden");
          } catch (error) {
            console.log("Error message: ", error.message);
          }
        })
        .then(function () {
          app.activeView.watch("extent", () =>
            updateOverviewMapExtent(extentIndicator)
          );
          app.overviewMapView.watch("extent", () =>
            updateOverviewMapExtent(extentIndicator)
          );
        })
        .then(function () {
          reactiveUtils.when(
            () => app.activeView.stationary,
            updateOverviewMap
          );
        });
      app.activeView.ui.add([
        {
          component: app.searchWidgetNav,
          position: "top-right",
        },
        {
          component: app.home,
          position: "top-right",
        },
        {
          component: app.track,
          position: "top-right",
        },
        {
          component: app.scaleBar,
          position: "bottom-right",
        },
      ]);
      app.activeView.ui.move("zoom", "top-right");
    } else {
      //Switch from 2D to 3D

      app.sceneView.viewpoint = activeViewpoint;
      app.sceneView.container = "mapViewDiv";
      app.activeView = app.sceneView;
      app.activeView.map.ground = "world-elevation";
      app.overviewMapSceneView.map.ground = "world-elevation";
      //switch overview maps from 2d to 3d
      app.overviewMap.container = null;
      app.overviewMapSceneView.container = "overviewMap";
      app.overviewMapSceneView.popup = null;
      //Modify view toggle button/text
      app.switchButton.icon = "map";
      app.switchButton.text = "Toggle Map To 2D View";
      app.switchButton.title = "Toggle Map To 2D View";

      reactiveUtils
        .whenOnce(() => app.activeView.ready)
        .then(() => {
          try {
            app.legend.view = app.activeView;
            app.basemapGallery.view = app.activeView;
            app.searchWidgetNav.view = app.activeView;
            //app.scaleBar.view = app.activeView;
            app.track.view = app.activeView;
            app.home.view = app.activeView;
            app.coordinateConversion.view = app.activeView;
            app.sketchWidgetSketchViewModel.view = app.activeView;
            app.sketchWidget.view = app.activeView;
            //app.attributeTable.view = app.activeView;
            app.elevationProfileWidget.view = app.activeView;
            app.layerList.view = app.activeView;
            app.measureWidgetButtons2D.classList.add("hidden");
            app.measureWidgetButtons3D.classList.remove("hidden");
            create3DDistanceMeasureWidget();
            create3DAreaMeasureWidget();
          } catch (error) {
            console.log("Error message sdf: ", error.message);
          }
        })
        .then(function () {
          app.activeView.watch("extent", () =>
            updateOverviewMapExtent(extentIndicator)
          );
          app.overviewMapView.watch("extent", () =>
            updateOverviewMapExtent(extentIndicator)
          );
        })
        .then(function () {
          reactiveUtils.when(
            () => app.activeView.stationary,
            updateOverviewMap
          );
        });

      app.activeView.ui.add([
        {
          component: app.searchWidgetNav,
          position: "top-right",
        },
        {
          component: app.home,
          position: "top-right",
        },
        {
          component: app.track,
          position: "top-right",
        },
        // {
        //     component: app.scaleBar,
        //     position: "bottom-right",
        // },
      ]);
      app.activeView.ui.move("zoom", "top-right");
    }
  }
});
