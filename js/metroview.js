require([
  "esri/map",//1
  "esri/dijit/BasemapGallery",//2
  "esri/arcgis/utils",//3
  "dojo/parser",//4
  "esri/dijit/Search",//5
  "esri/InfoTemplate",//7
  "esri/SpatialReference",//8
  "esri/geometry/Extent",//9
  "esri/layers/FeatureLayer",//10
  "esri/tasks/query",//11
  "esri/geometry/Circle",//12
  "esri/graphic",//13
  "esri/symbols/SimpleMarkerSymbol",//14
  "esri/symbols/SimpleLineSymbol",//15
  "esri/symbols/SimpleFillSymbol",//16
  "esri/renderers/SimpleRenderer",//17
  "esri/config",//18
  "esri/Color",//19
  "dojo/dom",//20
  "esri/tasks/GeometryService",//21
  "esri/layers/ArcGISDynamicMapServiceLayer",//22
  "dijit/layout/BorderContainer",//23
  "dijit/layout/ContentPane",//24
  "dijit/TitlePane",//25
  "dojo/_base/lang",//26
  "dijit/form/Select",//27
  "esri/geometry/Point",//28
  "esri/toolbars/draw",//29
  "dijit/form/Button",//30
  "esri/layers/ImageParameters",//31
  "esri/tasks/QueryTask",//32
  "esri/tasks/StatisticDefinition",//33
  "dijit/form/CheckBox",//34
  "dijit/form/VerticalSlider",//35
  "dijit/form/VerticalRuleLabels",//36
  "dijit/form/VerticalRule",//37
  "dojo/dom-construct",//38
  "dojo/aspect",//39
  "dojo/on",//40
  "dojo/_base/array",//41
  "dijit/form/TextBox",//42
  "dijit/form/MultiSelect",//43
  "dojo/_base/declare",//44
  "dgrid/OnDemandGrid",//45
  "dgrid/Selection",//46
  "dgrid/Selector",//47
  "dgrid/Grid",//48
  "dstore/RequestMemory",//49
  "dstore/Memory",//50
  "dgrid/extensions/ColumnHider",//51
  "dojo/number",//52
  "dojox/charting/Chart",//53
  "dojox/charting/themes/Julie",//54
  "dojox/charting/plot2d/Pie",//55
  "dstore/charting/StoreSeries",//56
  "dojox/charting/action2d/Tooltip",//57
  "dojox/charting/widget/Legend", //58
  "dojox/charting/action2d/Magnify", //59
  "dojox/charting/plot2d/ClusteredColumns",//60
  "dojox/charting/action2d/Highlight",//61
  "dijit/form/HorizontalSlider",//62
  "esri/dijit/Legend",//63
  "dijit/layout/TabContainer",//64
  "dojo/dom-style",//65
  "dijit/registry",//66
  "dojox/charting/plot2d/Markers",
  "dojox/charting/axis2d/Default",
  "dojo/domReady!"


        


], function (
  Map,//1
  BasemapGallery,//2
  arcgisUtils,//3
  parser,//4
  Search,//5
  InfoTemplate,//7
  SpatialReference,//8
  Extent,//9
  FeatureLayer,//10
  Query,//11
  Circle,//12
  Graphic,//13
  SimpleMarkerSymbol,//14
  SimpleLineSymbol,//15
  SimpleFillSymbol,//16
  SimpleRenderer,//17
  config,//18
  Color,//19
  dom,//20
  GeometryService,//21
  ArcGISDynamicMapServiceLayer,//22
  BorderContainer,//23
  ContentPane,//24
  TitlePane,//25
  lang,//26
  Select,//27
  Point,//28
  Draw,//29
  Button,//30
  ImageParameters,//31
  QueryTask,//32
  StatisticDefinition,//33
  CheckBox,//34
  VerticalSlider,//35
  VerticalRuleLabels,//36 
  VerticalRule,//37
  domConstruct,//38
  aspect,//39
  on,//40
  array,//41
  TextBox,//42
  MultiSelect,//43
  declare,//44
  OnDemandGrid,//45
  Selection,//46
  Selector,//47
  Grid,//48
  RequestMemory,//49
  Memory,//50
  ColumnHider,//51
  number,//52
  Chart,//53
  theme, //54
  PiePlot ,//55
  StoreSeries,//56
  Tooltip,//57
  Legend, //58
  Magnify, //59
  ColumnsPlot, //60
  Highlight,//61
  HorizontalSlider,//62
  esri_Legend,//63
  TabContainer,//64
  domStyle,//65
  registry//66
) {


    var _metroView = {
        _map: null,
        _basemapGallery: null,
        _featureLayer: null,
        _filterPane:{},
        _toolbar: null,
        _queryTask: {},
        _parcelWhereClause:"",
        _verticalSlider:{},
        _selectionTypeDropdown: {},
        _parcelDynamicMapServiceLayer: {},
        _filterGraphics:[],
        _filterGraphicsCount:0,
        _colors:[
            [249, 255, 96],//yellow
            [255, 56, 82],//red
            [12, 255, 45],//greenish
            [114, 0, 255],//purples
        ],
        _colors_Alpha:[
            [249, 255, 96,.25],//yellow
            [255, 56, 82,.25],//red
            [12, 255, 45,.25],//greenish
            [114, 0, 255,.25],//purples
        ],
        _filterWhereClauses: {},
        _parcelPropertyTypesGrid:{},
        _resultsGrid:[],
        _resultsdStore:[],
        _parcelFilters: [
            {
                "fieldName": "VMP_P1_V12",
                "filterType": "choices",
                "filterOptions": [
                    {"propertyType":"Single Family","id":"0"},
                    {"propertyType":"Vacant","id":"1"},
                    {"propertyType":"Rural","id":"2"},
                    {"propertyType":"SFLL","id":"3"},
                    {"propertyType":"Other","id":"4"},
                    {"propertyType":"Public or Semi Public","id":"5"},
                    {"propertyType":"Business","id":"6"},
                    {"propertyType":"Multi Family","id":"7"},
                    {"propertyType":"Industrial","id":"8"},
                    {"propertyType":"Water","id":"9"},
                    {"propertyType":"Other Residential","id":"10"}
                ],
                "filterRangeTop": "",
                "filterRangeBottom": "",
                "filterIncrement": "",
                "filterDescription": "-New Land Use. The 22 land uses were broken down into 11.",
                "filterDisplayName": "Land Use - New",
                "filterGroup":"parcelPropertyType"
            },
            {
                "fieldName": "VMP_P1_V3",
                "filterType": "range",
                "filterOptions": [],
                "filterRangeTop": "",
                "filterRangeBottom": "",
                "filterIncrement": "",
                "filterDescription": "-Construction Year",
                "filterDisplayName": "Construction Year",
                "filterGroup":"parcelAttributeChoices"
            },
            {
                "fieldName": "VMP_P1_V4",
                "filterType": "range",
                "filterOptions": [],
                "filterRangeTop": "",
                "filterRangeBottom": "",
                "filterIncrement": "",
                "filterDescription": "-Land Value",
                "filterDisplayName": "Land Value",
                "renderCellFunctionReference":"_addComma",
                "filterGroup":"parcelAttributeChoices"
            },
            {
                "fieldName": "VMP_P1_V5",
                "filterType": "range",
                "filterOptions": [],
                "filterRangeTop": "",
                "filterRangeBottom": "",
                "filterIncrement": "",
                "filterDescription": "-Building/Improvements Value",
                "filterDisplayName": "Building/Improvements Value",
                "renderCellFunctionReference":"_addComma",
                "filterGroup":"parcelAttributeChoices"
            },
            {
                "fieldName": "VMP_P1_V6",
                "filterType": "range",
                "filterOptions": [],
                "filterRangeTop": "",
                "filterRangeBottom": "",
                "filterIncrement": "",
                "filterDescription": "-Parcel Sq. Ft",
                "filterDisplayName": "Parcel Sq. Ft",
                "renderCellFunctionReference":"_addComma",
                "filterGroup":"parcelAttributeChoices"
            },
            {
                "fieldName": "VMP_P1_V7",
                "filterType": "range",
                "filterOptions": [],
                "filterRangeTop": "",
                "filterRangeBottom": "",
                "filterIncrement": "",
                "filterDescription": "Parcel Acreage",
                "filterDisplayName": "Parcel Acreage",
                "renderCellFunctionReference":"_addComma",
                "filterGroup":"parcelAttributeChoices"
            }
        ],
        _parcelFilterKeys:{},
        _parcelStatisticsDefinition:[],
        _parcelGroupByFields:[],
        _parcelDataGridColumns:{},
        _resultsTabContainer:{},
        _resultTabs:{},
        _parcelStatTypes:["sum","min","max","avg","stddev","var"],
        _parcelStatTypesColumn_Hidden:{"sum":true,"min":true,"max":true,"avg":false,"stddev":true,"var":true},
        _filtersNodeID : "filterContainer",
        _filterTitlePanes:{},
        _bufferToolDistance:2,
        _polygonDrawButton:{},
        _bufferDistanceContainer:{},
        _bufferTextBox:{},
        _activeResultsSection:1,
        _resultsTabToGraphicCountHash:{},
        _tearDownReferences:{},
        _activeColor:"",
        _init: function () {
            console.log("Starting Init");
            this._createParcelStatisticsDefinition();
            this._createUIElements();
            this._createMapElements();
            //maybe this should wait on map load?
            this._createSearch();
        },

        /*Create things*/


        _createParcelStatisticsDefinition:function(){
            console.log("_createParcelStatisticsDefinition");
            var that = this;
/*            var statTypes = ["count","sum","min","max","avg","stddev","var"];
            var statTypes_hidden = {"count":true,"sum":true,"min":true,"max":true,"avg":false,"stddev":true,"var":true};*/

            var statTypes = this._parcelStatTypes;
            var statTypes_hidden = this._parcelStatTypesColumn_Hidden;

            that._parcelDataGridColumns["VMP_P1_V12"] = {"label":"Land Use"};
            array.forEach( this._parcelFilters, function (itemFilters, iFilters) {
                //just adding some flexibility with addressing...
                that._parcelFilterKeys[itemFilters.fieldName] = iFilters;
                //while we are here let's make the columns for our data grid...
                switch (itemFilters.filterType) {
                    case "range":
                        array.forEach( statTypes, function (itemTypes, iType) {

                            var statisticDefinition = new StatisticDefinition();
                            statisticDefinition.onStatisticField = itemFilters.fieldName;
                            statisticDefinition.outStatisticFieldName = itemFilters.fieldName+"_"+itemTypes;
                            that._parcelDataGridColumns[itemFilters.fieldName+"_"+itemTypes] = {"label":itemFilters.filterDisplayName+" : "+itemTypes};
                            that._parcelDataGridColumns[itemFilters.fieldName+"_"+itemTypes]["hidden"] = statTypes_hidden[itemTypes];
                            if (itemFilters.hasOwnProperty("renderCellFunctionReference")) {
                                that._parcelDataGridColumns[itemFilters.fieldName+"_"+itemTypes]["renderCell"] = that[itemFilters.renderCellFunctionReference];
                            };
                            statisticDefinition.statisticType = itemTypes;
                            that._parcelStatisticsDefinition.push(statisticDefinition)
                        });
                        break;
                    case "choices":
                        //we will group by choice types
                        that._parcelGroupByFields.push(itemFilters.fieldName);
                        //we will also count on the choice fields.
                        var statisticDefinition = new StatisticDefinition();
                        statisticDefinition.onStatisticField = itemFilters.fieldName;
                        statisticDefinition.outStatisticFieldName = itemFilters.fieldName+"_count";
                        that._parcelDataGridColumns[itemFilters.fieldName+"_count"] = {"label":itemFilters.filterDisplayName+" : Count"};
                        statisticDefinition.statisticType = "count";
                        that._parcelStatisticsDefinition.push(statisticDefinition)
                        break;
                    default:

                };
            });



        },
        _createUIElements: function () {
            console.log("_createUIElements");
            var that = this;



            // create a BorderContainer as the top widget in the hierarchy
            var bc = new BorderContainer({
                /*style: "height: 500px;width:100%;"*/
                "class":"mapBorderContainer"

            });

            // create a ContentPane as the center pane in the BorderContainer
            var cp2 = new ContentPane({
                region: "center",
                content: "<div id=\"map\"></div><br /><div><div>Parcel Transparency</div></div><div id=\"transparencySlider\"></div></div>"
            });
            bc.addChild(cp2);

            // put the top level widget into the document, and then call startup()
            bc.placeAt("mapTitlePane");
            bc.startup();


            this._createFilterElements();
            this._createResultsTabContainer();






        },
        _createFilterElements:function(){

            var filterNode = dom.byId(this._filtersNodeID);
            //create the filters and put them in the left nav section as designated by this._filterNodeID

            var tpselectOptions = new TitlePane({title:"Map Selection Tools", content: "<div id=\"selectOptions\">Define Selection tool by</div><br /><div id=\"polyDraw\"></div><div id=\"bufferDistance\"></div>"});
            filterNode.appendChild(tpselectOptions.domNode);
            tpselectOptions.startup();

            //create the map selection tools
            this._createMapSelectionTools();

            //create the range filter options
            this._createFilters(filterNode);

        },
        _createResultsTabContainer: function(){
            console.log("_createResultsTabContainer");
            this._resultsTabContainer = new TabContainer({
                style: "height: 500px; width: 100%;"
            }, "resultsTabContainer");
            this._resultsTabContainer.startup();
        },
        _createTransparencySlider:function(){
            console.log("_createTransparencySlider");
            var that = this;
            var slider = new HorizontalSlider({
                name: "slider",
                value: 3,
                minimum: 0,
                maximum: 10,
                intermediateChanges: true,
                discreteValues: 11,
                showButtons: true,
                style: "width:300px;",
                onChange: function(value){
                    that._parcelDynamicMapServiceLayer.setOpacity(value / 10);
                    console.log(value);
                }
            }, "transparencySlider").startup();
        },
        _createFilters: function (filterNode) {
            console.log("_createFilters");
            var that = this;
            array.forEach( this._parcelFilters, function (item, i) {
                switch (item.filterType) {
                    case "range":
                        that._createTextBoxRanges(item,filterNode);
                        break;
                    case "choices":
                        that._createMultiSelect_Grid(item,filterNode);
                        break;
                    default:

                }
            });
        },
        _createMultiSelect_Grid: function (filterObject,filterNode) {
            console.log("_createMultiSelect_Grid");

            if(!this._filterTitlePanes["parcelPropertyType"]) {
            this._filterTitlePanes["parcelPropertyType"] = new TitlePane({title:"Property Types", content: "<div id=\"parcelPropertyType\"></div>"});
            filterNode.appendChild(this._filterTitlePanes["parcelPropertyType"].domNode);
            };


            var node = domConstruct.create("div",{ id:filterObject.fieldName+"_div","class":"filterChoices" },dom.byId(filterObject.filterGroup),"last");
            var propertyTypeStore = new Memory({data:filterObject.filterOptions, idProperty: 'id'});
            this._parcelPropertyTypesGrid = new (declare([ OnDemandGrid, Selector ]))({
                collection: propertyTypeStore ,
                selectionMode: 'multiple',
                allowSelectAll:true,
                columns: {
                    propertyType: 'Property Type',
                    col1: { label: 'Select', selector: 'checkbox' }
                }
            }, node);
            this._parcelPropertyTypesGrid.startup();
            //this._parcelPropertyTypesGrid.selectAll();
            this._parcelPropertyTypesGrid.on("dgrid-select", lang.hitch(this, function (event) {
                this._handleGridSelection(event,filterObject);
            }));
            this._parcelPropertyTypesGrid.on("dgrid-deselect", lang.hitch(this, function (event) {
                this._handleGridSelection(event,filterObject);
            }));

            if(!this._filterTitlePanes["parcelPropertyType"]) {
                this._filterTitlePanes["parcelPropertyType"].startup();
            };
        },
        _createMultiSelect_dojox: function (filterObject) {
            console.log("_createMultiSelect_dojox");
            var node = domConstruct.create("div",{ id:filterObject.fieldName+"_div","class":"filterChoices" },dom.byId(filterObject.filterGroup),"last");


             var mySelect = domConstruct.create("select", { id: filterObject.fieldName}, node);


             var option3 = domConstruct.create("option", { innerHTML: "No Preference", value: "00" }, mySelect);
             var option1 = domConstruct.create("option", { innerHTML: "InnerHTML1", value: "value1" }, mySelect);
             var option2 = domConstruct.create("option", { innerHTML: "InnerHTML2", value: "value2" }, mySelect);
             var option3 = domConstruct.create("option", { innerHTML: "InnerHTML3", value: "value3" }, mySelect);


             array.forEach(filterObject.filterOptions, function (item, i) {
             domConstruct.create("option", { innerHTML: item, value: item }, mySelect);
             });


             var myMultiSelect = new MultiSelect({ name: 'dynamic' }, mySelect);

             myMultiSelect.startup();
             //don't know why I have to do this....
             myMultiSelect.set("value", [00]);




        },
        _createTextBoxRanges: function (filterObject,filterNode) {
            console.log("_createTextBoxRanges");

            if (!this._filterTitlePanes["parcelAttributeChoices"]) {
            this._filterTitlePanes["parcelAttributeChoices"] = new TitlePane({
                title: "Parcel Attributes",
                "class":"filterTextBoxRanges"
            });
            filterNode.appendChild(this._filterTitlePanes["parcelAttributeChoices"].domNode);
        };


            //create a div to hold a specific range
            var node = domConstruct.create("div",{ id:filterObject.fieldName+"_div","class":"filterRanges" });
            this._filterTitlePanes["parcelAttributeChoices"].containerNode.appendChild(node)

            //filterDisplayName
            var nameNode = domConstruct.create("div",{ "innerHTML":filterObject.filterDisplayName,"class":"filterRangesName"  },node,"last");

            //create a simple text box for bottom part of the attribute ..
            var newTextboxBottom = new TextBox({
                name: filterObject.fieldName,
                value: "" /* no or empty value! */,
                "class":"filterBottom",
                placeHolder: "From"
            });
            newTextboxBottom.placeAt(node);

            on(newTextboxBottom, "change", lang.hitch(this, function () {
                this._handleFilterChange(filterObject.fieldName, newTextboxBottom.get("value"), "bottom");
            }));

            var toNode = domConstruct.create("div",{ "innerHTML":" to " },node,"last");

            //create a simple text box for top part of the attribute ..
            var newTextboxTop = new TextBox({
                name: filterObject.fieldName,
                value: "" /* no or empty value! */,
                "class":"filterTop",
                placeHolder: "To"
            });
            //domConstruct.place(newTextboxTop, dom.byId("filterOptions"), "last");
            newTextboxTop.placeAt(node);

            on(newTextboxTop, "change", lang.hitch(this, function () {
                this._handleFilterChange(filterObject.fieldName, newTextboxTop.get("value"), "top");
            }));

            if (!this._filterTitlePanes["parcelAttributeChoices"]) {
                this._filterTitlePanes["parcelAttributeChoices"].startup();
            };


            },
        _createSliders:function(){
            console.log("_createSliders");

            //create the parcel filter options
            // Create the rules
            var rulesNode = domConstruct.create("div", {}, dom.byId("parcelFilters"), "first");
            var sliderRules = new VerticalRule({
                container: "leftDecoration",
                count: 11,
                style: "width: 5px;"
            }, rulesNode);

            // Create the labels
            var labelsNode = domConstruct.create("div", {}, dom.byId("parcelFilters"), "first");
            var sliderLabels = new VerticalRuleLabels({
                container: "rightDecoration",
                labelStyle: "font-style: italic; font-size: 0.75em"
            }, labelsNode);

            // Create the vertical slider programmatically
            this._verticalSlider = new VerticalSlider({
                minimum: 0,
                maximum: 100,
                pageIncrement: 20,
                value: 20,
                intermediateChanges: false,
                style: "height: 200px;"
            }, "parcelFilters");

            // Start up the widgets
            this._verticalSlider.startup();
            sliderRules.startup();
            sliderLabels.startup();

            aspect.after(this._verticalSlider, "onChange", lang.hitch(this, function () {
                this._handleSliderChange();
            }));
        },
        _createMapSelectionTools:function(){
            console.log("_createMapSelectionTools");
            var that=this;

            //create the selection method dropdown.
            this._selectionTypeDropdown = new Select({
                name: "select2",
                options: [
                    { label: "Draw Polygon", value: "polygon" },
                    { label: "By Buffer", value: "buffer", selected: true },
                    { label: "By Region", value: "region" },
                    { label: "By Individual Agg Group", value: "individual" }                ],
                onChange: lang.hitch(that, function(event){that._handleMapSelectionDropDownChange(event);})
            });
            this._selectionTypeDropdown.placeAt("selectOptions");
            this._selectionTypeDropdown.startup();

            //create button to start poly draw
            this._polygonDrawButton = new Button({
                label: "Click to Start Drawing",
                onClick: lang.hitch(that, function () {
                    // Do something:
                    this._toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
                    this._map.hideZoomSlider();
                })
            }, "polyDraw");
            this._polygonDrawButton.startup();
            //and then immediately hide the button for later use.
            domStyle.set(this._polygonDrawButton.domNode, 'display', 'none');

            //create a simple text box for buffer distance  ..
            this._bufferDistanceContainer = domConstruct.create("div",{ id:"bufferDistanceContainer","class":"bufferDistanceContainer" },"bufferDistance","last");
            var bufferDistanceTextBoxContainer = domConstruct.create("div",{ id:"bufferDistanceTextBoxContainer","class":"bufferDistanceTextBoxContainer" },this._bufferDistanceContainer,"last");
            domConstruct.create("span",{ "class":"bufferDistanceLabel","innerHTML":"Distance (in miles)" },this._bufferDistanceContainer,"last");
            this._bufferTextBox = new TextBox({
                name: "bufferDistanceTextBox",
                value: "2" ,
                "class":"bufferDistanceInput",
                placeHolder: "Buffer Distance",
                onChange:function(){
                                    that._bufferToolDistance=this.value;
                }
            },bufferDistanceTextBoxContainer);

        },
        _createMapElements: function () {
            console.log("_createMapElements");
            var that = this;
            //create the map object , we will add data to it later. for now it just has a basemap.
            esriConfig.defaults.io.proxyUrl = "/proxy/";
            this._map = new Map("map", {
                basemap: "topo",
                center: [-77.455, 37.469],
                zoom: 13
            });


            //add the legend
            this._map.on("layer-add-result", function (evt) {
                var legendDijit = new esri_Legend({
                    map: that._map//,
                    // layerInfos: evt.layer.layerInfos[1]
                }, "legendDiv");
                legendDijit.startup();

            });




            //add a dynamicmap service layer...
            var imageParameters = new ImageParameters();
            imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.
            this._parcelDynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://magi.vcu.edu/arcgis/rest/services/MetroView/Parcels/MapServer", {
                "opacity": 0.5,
                "imageParameters": imageParameters
            });

            this._map.addLayer(this._parcelDynamicMapServiceLayer);


            this._queryTask = new QueryTask("http://magi.vcu.edu/arcgis/rest/services/MetroView/Parcels/MapServer/0");


            //when the map is clicked create a buffer around the click point of the specified distance.
            this._map.on("click", function (evt) {

                if (that._selectionTypeDropdown.value == "buffer") {
                    that._bufferPoint(evt.mapPoint,that._bufferToolDistance);
                } else if (that._selectionTypeDropdown.value == "individual") {
                    var markerSymbol = new SimpleMarkerSymbol({
                        "color": [255, 255, 255, 64],
                        "size": 12,
                        "angle": -30,
                        "xoffset": 0,
                        "yoffset": 0,
                        "type": "esriSMS",
                        "style": "esriSMSCircle",
                        "outline": {
                            "color": that._colors[that._filterGraphicsCount],
                            "width": 1,
                            "type": "esriSLS",
                            "style": "esriSLSSolid"
                        }
                    });
                    var point;
                    point = new Point(evt.mapPoint);
                    var graphic = new Graphic(point, markerSymbol);
                    that._map.graphics.add(graphic);
                    that._performQueryTasks(evt.mapPoint, "point");
                } else {
                    console.log("End of else block...");
                };
 /*               if(that._filterGraphicsCount < that._colors.length-1){
                    that._filterGraphicsCount++;
                } else {
                    that._filterGraphicsCount=0;
                };*/
                //that._filterGraphicsCount++;
            });
            //create the basemap gallery object. this will allow the users to change the basemaps. ESRI defaults here.
            this._basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: this._map
            }, "basemapGallery")
            this._basemapGallery.startup();
            this._basemapGallery.on("error", function (msg) {
                console.log("basemap gallery error:  ", msg);
            });

            this._map.on("load", lang.hitch(this,this._initTools));


        },
        _createParcelPieChart:function(variableName){
            console.log("_createParcelPieChart");

            //_createParcelPieChart:function(chartingNode,chartingLegendNode){

            var chartingPieNode = domConstruct.create("div",{ id:"chartsDivSelection_"+this._filterGraphicsCount,"class":"filterCharts" },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");
            var chartingPieLegendNode = domConstruct.create("div",{ id:"chartsLegendDivSelection_"+this._filterGraphicsCount,"class":"filterLegendCharts" },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");


            //Charting the results...

            // Create the chart within it's "holding" node
            var pieChart = new Chart(chartingPieNode);

            // Set the theme
            pieChart.setTheme(theme);

            // Add the only/default plot
            pieChart.addPlot("default", {
                type: PiePlot, // our plot2d/Pie module reference as type value
                radius: 100,
                fontColor: "black",
                labels: false,
                ticks: true,
                fixed: false,
                precision: 1,
                labelOffset: 20,
                labelStyle: "columns",      // default/columns/rows/auto
                htmlLabels: true            // use HTML to draw labels
            });

            // Add the series of data
            //var storeSeries_VMP_P1_V3_count = new StoreSeries(this._resultsdStore, 'VMP_P1_V3_count');
            var pieStoreSeries = new StoreSeries(this._resultsdStore[this._filterGraphicsCount], function(parcelStuff){
                return {"y":parcelStuff[variableName+"_count"],"text":parcelStuff[variableName]+ " " + parcelStuff[variableName+"_count"]};
            });

            pieChart.addSeries("Property Types",pieStoreSeries);

            var tip = new Tooltip(pieChart, "default");
            // Create the magnifier
            var mag = new Magnify(pieChart,"default");


            // Render the chart!
            pieChart.render();

            var legend = new Legend({ chart: pieChart }, chartingPieLegendNode);

        },
        _createParcelBarChart:function(variableName,filterGraphicsCount){
            console.log("_createParcelBarChart");
            var that= this;
            var variableNameSplit = variableName.split("_");
            //o.k. so I messed up and used the _ character to append the stat type to the variable....now I need to extract it...so it'll get messy here for a second....
            var bareVariableName = variableName.substring(0,variableName.indexOf("_"+variableNameSplit[variableNameSplit.length-1]));

            var title = this._parcelFilters[this._parcelFilterKeys[bareVariableName]].filterDescription + " : " + variableNameSplit[variableNameSplit.length-1];
            var chartingTitleBarNode = domConstruct.create("div",{ id:"parcelChartsTitleBarDivSelection_"+filterGraphicsCount+variableName,"class":"parcelTitleBarCharts","innerHTML":title },this._resultTabs["result_"+filterGraphicsCount].domNode,"last");
            var chartingBarNode = domConstruct.create("div",{ id:"parcelChartsBarDivSelection_"+filterGraphicsCount+variableName,"class":"parcelBarCharts" },this._resultTabs["result_"+filterGraphicsCount].domNode,"last");
            var chartingBarLegendNode = domConstruct.create("div",{ id:"parcelChartsBarLegendDivSelection_"+filterGraphicsCount+variableName,"class":"parcelBarLegendCharts" },this._resultTabs["result_"+filterGraphicsCount].domNode,"last");
            var chartingBarDividerNode = domConstruct.create("div",{ id:"parcelChartsBarDividerDivSelection_"+filterGraphicsCount+variableName,"class":"parcelBarDivider",innerHTML:"<hr>" },this._resultTabs["result_"+filterGraphicsCount].domNode,"last");
            var barChart = new Chart(chartingBarNode);

            // Set the theme
            barChart.setTheme(theme);

            // Add the only/default plot
            barChart.addPlot("default", {
                type: ColumnsPlot,
                markers: true,
                gap: 5,
                labels:true,
                labelStyle: "outside",
                labelOffset: 25,
                styleFunc: function(item){
                    if(item.fieldName == "Single Family"){
                        return { fill : "red" };
                    }else if(item.fieldName == "Vacant"){
                        return { fill: "green" };
                    }
                    return {};
                }
            });

            // Add axes
/*            barChart.addAxis("x",{ labels: [{value: 1, text: "Vacant"}, {value: 2, text: "Single Family"},
                {value: 3, text: "Industrial"}, {value: 4, text: "Multi-Family"},
                {value: 5, text: "Business"}, {value: 6, text: "Rural"},
                {value: 7, text: "Jul"}, {value: 8, text: "Aug"},
                {value: 9, text: "Sep"}, {value: 10, text: "Oct"},
                {value: 11, text: "Nov"}, {value: 12, text: "Dec"}]});*/

            barChart.addAxis("x");
            barChart.addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major" });

            var groupBy_Field = this._parcelGroupByFields[0];

/*            //tryuing it out with the styleFunc...
            var storeSeries = new StoreSeries(that._resultsdStore[that._filterGraphicsCount], function(parcelStuff){
                return {"y":parcelStuff[variableName],"text":parcelStuff[groupBy_Field] + " " + parcelStuff[variableName],"fieldName":parcelStuff[groupBy_Field]};
            });
            // Add the series of data
            barChart.addSeries("Property Type",storeSeries);*/


            //a note here...let's unpack this thing for a second...
            //this is hardcoded to use only one groupby...I really haven't written the app to use more than one, though I guess it could..ArcGIS server
            //accepts an array of groupbys so the tech is there.
            //anyway.
            //this._parcelFilters[].filterOptions - the top level list of filter options
            //this._parcelFilterKeys[] - the key object I made to get to the parcelFilter items
            //this._parcelGroupByFields[0] - the hardcoded name of the groupby field.

            var groupBy_parcelFilterKey = this._parcelFilterKeys[groupBy_Field];
            var groupBy_parcelFilter = this._parcelFilters[groupBy_parcelFilterKey];
            //enjoy



            //we are going to create a series for each one. so we can have different colors.

            array.forEach(groupBy_parcelFilter.filterOptions, function (item, i) {
                var filterObject={};
                filterObject[groupBy_Field] = item.propertyType;
                //console.log(filterObject);
                var storeSeries = new StoreSeries(that._resultsdStore[that._filterGraphicsCount].filter(filterObject), function(parcelStuff){
                    return {"y":parcelStuff[variableName],"text":parcelStuff[groupBy_Field] + " " + parcelStuff[variableName]};
                });
                // Add the series of data

                barChart.addSeries(item.propertyType,storeSeries);
            });



            var tip = new Tooltip(barChart, "default");
            // Create the highlighter...but it didn't work...
            //new Highlight(barChart,"default");


            // Render the chart!
            barChart.render();

            var legend = new Legend({ chart: barChart }, chartingBarLegendNode);

            //keep track of all the elements that go into a bar chart so we can tear them down when they are removed from the grid
            this._tearDownReferences[variableName+"_"+filterGraphicsCount] = [chartingTitleBarNode,chartingBarNode,chartingBarLegendNode,chartingBarDividerNode,barChart,legend];

        },
        _createSearch: function () {
            console.log("_createSearch");
            var s = new Search({
                enableButtonMode: false, //this enables the search widget to display as a single button
                enableLabel: false,
                enableInfoWindow: true,
                showInfoWindowOnSelect: false,
                enableHighlight: true,
                enableSourcesMenu: true,
                expanded: false,
                map: this._map
            }, "search");

            var sources = s.get("sources");

            //Push the sources used to search, by default the ArcGIS Online World geocoder is included. In addition there is a feature layer of US congressional districts. The districts search is set up to find the "DISTRICTID". Also, a feature layer of senator information is set up to find based on the senator name.

            sources.push({
                featureLayer: new FeatureLayer("http://magi.vcu.edu/arcgis/rest/services/MetroView/Localities/FeatureServer/0"),
                searchFields: ["NAMELSAD_1"],
                displayField: "NAMELSAD_1",
                exactMatch: false,
                outFields: ["*"],
                name: "MetroView Counties",
                placeholder: "Metroview Locality",
                maxResults: 6,
                maxSuggestions: 6,

                //Create an InfoTemplate and include three fields
                //infoTemplate: new InfoTemplate("Metroview Counties", "County FIPS: ${GEOID_1}</br>Name: ${NAME}</br>"),
                infoTemplate: new InfoTemplate("Metroview Counties", "${NAMELSAD_1}"),
                enableSuggestions: true,
                minCharacters: 0
            });



            //Set the sources above to the search widget
            s.set("sources", sources);

            s.startup();

            s.on("select-result",lang.hitch(this,function(evt){

                var addressPoint = evt.result.feature.geometry;
                this._bufferPoint(addressPoint,this._bufferToolDistance);
            }));

        },
        _createResultsTabs: function(){
            var localCount = this._filterGraphicsCount;

            this._resultTabs["result_"+this._filterGraphicsCount] = new ContentPane({
                title: "Geography "+this._filterGraphicsCount
            });
            //relates the tab back to the filter count.


            this._resultsTabToGraphicCountHash[this._resultTabs["result_"+this._filterGraphicsCount].id ] = localCount;

            var resultsLocalTabReference = this._resultTabs["result_"+this._filterGraphicsCount];


            console.log("resultsLocalTabReferenceresultsLocalTabReferenceresultsLocalTabReferenceresultsLocalTabReference");

            this._resultsTabContainer.addChild(this._resultTabs["result_"+this._filterGraphicsCount]);
            //show the tab right after it is created. Make the charts fill out the space correctly.
            this._resultsTabContainer.selectChild(this._resultTabs["result_"+this._filterGraphicsCount]);



            resultsLocalTabReference.startup();
            console.log(resultsLocalTabReference.controlButton.domNode);
            console.log(this._activeColor);
            var thisDomNode = resultsLocalTabReference.controlButton.domNode;
            domStyle.set(thisDomNode,"background-color",this._activeColor);
            return resultsLocalTabReference;
        },
        _createResultsGrids: function(data){
            var gridNode = domConstruct.create("div",{ id:"resultsDivSelection_"+this._filterGraphicsCount,"class":"filterResults" },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");

            this._resultsdStore[this._filterGraphicsCount] = new Memory({data:data, idProperty: 'id'});
            console.log("this._parcelDataGridColumns");
            console.log(this._parcelDataGridColumns);
            var localParcelDataGridColumns = lang.clone(this._parcelDataGridColumns);

            this._resultsGrid[this._filterGraphicsCount] = new (declare([ OnDemandGrid, Selector, ColumnHider ]))({
                collection: this._resultsdStore[this._filterGraphicsCount] ,
                selectionMode: 'multiple',
                allowSelectAll:true,
                columns:  localParcelDataGridColumns
            }, gridNode);
            this._resultsGrid[this._filterGraphicsCount].startup();


            this._resultsGrid[this._filterGraphicsCount].on("dgrid-columnstatechange", lang.hitch(this, function (event) {
                console.log("dgrid column change");
                console.log(event.column.field);
                console.log(event.hidden);
                console.log(this._activeResultsSection);
                if(event.hidden) {
                    this._destroyParcelBarChart(event.column.field, this._activeResultsSection);
                }else {
                    this._createParcelBarChart(event.column.field, this._activeResultsSection);
                }
            }));
            var resultsGridLocalReference = this._resultsGrid[this._filterGraphicsCount];
            return resultsGridLocalReference;
        },
        _destroyParcelBarChart:function(variableName,filterGraphicsCount){

            console.log("TO DO...tear down a bar chart....");
            array.forEach(this._tearDownReferences[variableName+"_"+filterGraphicsCount], function (item, i) {
                console.log(item.id);
                domConstruct.destroy(item.id);

            });

        },
        _createInitialCharts:function(){
            var that = this;
            //make charts for all of the variables....we will sort this out later..
            array.forEach( this._parcelFilters, function (itemFilters, iFilters) {

                switch (itemFilters.filterType) {
                    case "range":
                        array.forEach( that._parcelStatTypes, function (itemTypes, iType) {
                            if(!that._parcelStatTypesColumn_Hidden[itemTypes]) {
                                var varName = itemFilters.fieldName + "_" + itemTypes;
                                that._createParcelBarChart(varName,that._filterGraphicsCount);
                            };
                        });
                        break;
                    case "choices":
                        that._createParcelPieChart(itemFilters.fieldName);
                        break;
                    default:

                };
            });
        },
        /*Destroy methods*/


        /*Handle things*/

        _handleSliderChange: function () {
            console.log("_handleSliderChange");
            var valueOnSlider = this._verticalSlider.get("value") * 1000;
            this._handleFilterChange("VMP_P1_V4",valueOnSlider, "bottom");
        },
        _handleFilterChange: function (variableName, value, operator) {
            console.log("_handleFilterChange");
            var that = this;
            var operatorValue = {"top":"<=","bottom":">=","equals":"=","IN":"IN"};
            if(value.length >0) {
                this._filterWhereClauses[variableName + "_" + operator] = variableName + " " + operatorValue[operator] + " " + value;
            } else {
                this._filterWhereClauses[variableName + "_" + operator] = "";
            }

            //assemble all the clauses together into one grand string.
            var whereClause = ""
            for (var property in this._filterWhereClauses) {
                if (that._filterWhereClauses.hasOwnProperty(property)) {
                    //check to see if that variable is being used. If 'value' is empty skip.

                    if(that._filterWhereClauses[property].length > 0) {
                        whereClause += " AND " + that._filterWhereClauses[property];
                    };

                }
            };
            this._parcelWhereClause = whereClause.substring(4);
            var layerDefinitions = [];
            layerDefinitions[0] = this._parcelWhereClause;
            this._parcelDynamicMapServiceLayer.setLayerDefinitions(layerDefinitions);

        },
        _handleGridSelection:function(event,filterObject){
            console.log("_handleGridSelection");
            // Iterate through all currently-selected items
            var queryString = "";
            var submitqueryString = "";
            for(var id in this._parcelPropertyTypesGrid.selection){
                if(this._parcelPropertyTypesGrid.selection[id]){
                    queryString += ",\'"+this._parcelFilters[0].filterOptions[id].propertyType+"\'"
                };
            };
            if(queryString.length > 0) {
                submitqueryString = "(" + queryString.substring(1) + ")";
            };
            this._handleFilterChange(filterObject.fieldName,submitqueryString,"IN");
        },
        _handleMapSelectionDropDownChange: function(selectionType) {
            console.log(selectionType);
            switch(selectionType) {
                case "polygon":
                    domStyle.set(this._polygonDrawButton.domNode, 'display', 'inline');
                    domStyle.set(this._bufferDistanceContainer, 'display', 'none');
                    break;
                case "buffer":
                    domStyle.set(this._polygonDrawButton.domNode, 'display', 'none');
                    domStyle.set(this._bufferDistanceContainer, 'display', 'inline');
                    break;
                case "region":
                    console.log("need to zoom out to regions?");
                    domStyle.set(this._polygonDrawButton.domNode, 'display', 'none');
                    domStyle.set(this._bufferDistanceContainer, 'display', 'none');
                    break;
                default:
                    console.log("Nothing selected the default behavour is to buffer a point.");
                    domStyle.set(this._polygonDrawButton.domNode, 'display', 'none');
                    domStyle.set(this._bufferDistanceContainer, 'display', 'none');
            }
        },
        _handleResultsTabShow:function(resultsLocalTabReference,resultsGridLocalReference){

            on(resultsLocalTabReference , "show", lang.hitch(this,function (event) {
                this._activeResultsSection = this._resultsTabToGraphicCountHash[resultsLocalTabReference.id];
                resultsGridLocalReference.resize();
            }));
        },


        /*Worker Functions*/

        _addComma:function(object, data, td, options) {
            var formatted = number.format(data, {
                places: 0,
                locale: "en-us"
            });
            var div = document.createElement("div");
            div.className = "renderedCell";
            div.innerHTML = formatted;
            return div;

        },
        _bufferPoint:function(point,distance){

            var newRandomColors = this._generateColor();

            console.log(newRandomColors);

            //buffer symbol.
            var circleSymb = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
                    //new Color(this._colors[this._filterGraphicsCount]),
                    new Color(newRandomColors[0]),
                    3
                ), //new Color(this._colors_Alpha[this._filterGraphicsCount])
                new Color(newRandomColors[1])
            );
            var circle;
            circle = new Circle({
                center: point,
                geodesic: true,
                radius: distance,
                radiusUnit: "esriMiles"
            });

            //that._map.graphics.clear();
            this._map.infoWindow.hide();
            var graphic = new Graphic(circle, circleSymb);
            this._map.graphics.add(graphic);
            //this._performParcelQueryTasks(circle.getExtent(),"polygon");
            this._performParcelQueryTasks(circle,"polygon");

        },
        _initTools: function (evtObj) {
            console.log("_initTools");
            this._toolbar = toolbar = new Draw(evtObj.map);
            toolbar.on("draw-end", lang.hitch(this,this._handlePolygonDrawEnd));
            this._createTransparencySlider();
        },
        _performParcelQueryTasks: function (geometry, geometryType) {
            console.log("_performParcelQueryTasks");
            var that = this;
            var query = new Query();
            this._filterGraphicsCount++;
            query.geometry = geometry;
            query.returnGeometry = false;
            query.outStatistics = that._parcelStatisticsDefinition;
            query.groupByFieldsForStatistics = that._parcelGroupByFields;
            query.where = that._parcelWhereClause;
            that._queryTask.execute(query, lang.hitch(that, "_selectFromService"));

            this._map.setExtent(geometry.getExtent(),true);
        },
        _handlePolygonDrawEnd: function (evtObj) {
            console.log("_handlePolygonDrawEnd");
            var geometry = evtObj.geometry;
            var newRandomColors = this._generateColor();
            /*After user draws shape on map using the draw toolbar compute the zonal*/
            this._map.showZoomSlider();
            //this._map.graphics.clear();

            var symbol = new SimpleFillSymbol("none", new SimpleLineSymbol("dashdot", new Color(newRandomColors[0]), 2), new Color(newRandomColors[1]));
            var graphic = new Graphic(geometry, symbol);

            this._map.graphics.add(graphic);
            this._toolbar.deactivate();

            //var query = new Query();
            //query.geometry = geometry;

            this._performParcelQueryTasks(geometry,"polygon");
        },
        _selectFromService: function (response) {
            console.log("_selectFromService");
            var LandValueAverageArray = array.map(response.features, function(item,index){
                return item.attributes;
            });
            this._updateResults(LandValueAverageArray);
        },
        _updateResults:function(data){
            console.log("_updateResults");
            this._activeResultsSection = this._filterGraphicsCount;
            var resultsLocalTabReference = this._createResultsTabs();
            var resultsGridLocalReference = this._createResultsGrids(data);
            this._handleResultsTabShow(resultsLocalTabReference,resultsGridLocalReference);
            this._createInitialCharts();

        },
        _getSelectorIDs: function (features) {
            console.log("_getSelectorIDs");
            var selectorIDs = "";
            for (var x = 0; x < features.length; x++) {
                selectorIDs = selectorIDs + " , " + features[x].attributes["OBJECTID"];
            }
            return selectorIDs;
        },
        _generateColor: function(){
            function c() {
                //return Math.floor(Math.random()*256).toString(16)
                return Math.floor(Math.random()*256);
            }
            //return "#"+c()+c()+c();


            var luma = 10000;
            while (luma > 70) {
                var r = c();
                var g = c();
                var b = c();
                luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
            }

            this._activeColor = "rgb("+r+","+g+","+b+")";
            var colors = [[r,g,b],[r,g,b,.25]];
            return colors;
        }


    };
    _metroView._init();




});