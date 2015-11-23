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
  "esri/dijit/OverviewMap",//19.1
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
  "dojox/charting/action2d/MoveSlice",//59.1
  "dojox/charting/plot2d/ClusteredColumns",//60
  "dojox/charting/action2d/Highlight",//61
  "dijit/form/HorizontalSlider",//62
  "esri/dijit/Legend",//63
  "dijit/layout/TabContainer",//64
  "dojo/dom-style",//65
  "dijit/registry",//66
  "dojo/DeferredList",//67
  "dijit/Dialog",//68
  "esri/geometry/geometryEngine",//69
  "dijit/TooltipDialog",//70
  "dijit/popup",//71
  "dojo/html",//72
  "dojox/charting/plot2d/Bubble",//73
  "dojo/window",//74
  "dojo/query",//75
  "dojo/fx",//76
  "dojo/dom-geometry",//77
  "dojo/io-query",//78
    "dijit/form/RadioButton",//79
  "dojox/charting/plot2d/Markers",
  "dojox/charting/axis2d/Default",
  "dojo/domReady!"
  //"dojo/ready"


        


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
    OverviewMap,//19.1
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
    MoveSlice,//59.1
    ColumnsPlot, //60
    Highlight,//61
    HorizontalSlider,//62
    esri_Legend,//63
    TabContainer,//64
    domStyle,//65
    registry,//66
    DeferredList,//67
    Dialog,//68
    geometryEngine,//69
    TooltipDialog,//70
    popup,//71
    html,//72
    Bubble,//73
    win,//74
    query,//75
    coreFx,//76
    domGeom,//77
    dojo_ioquery,//78
    RadioButton//79

) {


        var _metroView = {
            _map: null,
            _basemapGallery: null,
            _featureLayer: null,
            _filterPane:{},
            _toolbar: null,
            _queryTask: {},
            _queryTaskHHIncome:{},
            _queryTaskEmployment:{},
            _parcelWhereClause:"",
            _verticalSlider:{},
            _selectionType: "",
            _parcelDynamicMapServiceLayer: {},
            _localityFeatureLayer:{},
            _filterGraphics:[],
            _localitiesPreCommitIDs:[],
            _localitiesPreCommitGraphics:{},
            _filterGraphicsCount:0,
            _colors:[
                [249, 255, 96],//yellow
                [255, 56, 82],//red
                [12, 255, 45],//greenish
                [114, 0, 255]//purples
            ],
            _colors_Alpha:[
                [249, 255, 96,.25],//yellow
                [255, 56, 82,.25],//red
                [12, 255, 45,.25],//greenish
                [114, 0, 255,.25]//purples
            ],
            _filterWhereClauses: {},
            _parcelPropertyTypesGrid:{},
            _resultsParcelGrid:[],
            _resultsHHIncomeGrid:[],
            _resultsEmploymentGrid:[],
            _resultsParceldStore:[],
            _resultsHHIncomedStore:[],
            _resultsEmploymentdStore:[],
            _parcelFilters: [
                {
                    "fieldName": "VMP_P1_V12",
                    "shortFieldName":"VMP_P1_V12",
                    "filterType": "choices",
                    "filterOptions": [
                        {"propertyType":"Single Family","id":"0"},
                        {"propertyType":"Vacant","id":"1"},
                        {"propertyType":"Rural","id":"2"},
                        //{"propertyType":"SFLL","id":"3"},
                        {"propertyType":"Single Family Large Lot","id":"3"},
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
                    "filterGroup":"parcelPropertyType",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":false
                },
                {
                    "fieldName": "VMP_P1_V3",
                    "shortFieldName": "VMP_P1_V3",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "-Construction Year",
                    "filterDisplayName": "Construction Year",
                    "renderCellFunctionReference":"_constructionYearCalc",
                    "filterGroup":"parcelAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":false
                },
                {
                    "fieldName": "VMP_P1_V4",
                    "shortFieldName": "VMP_P1_V4",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "-Land Value",
                    "filterDisplayName": "Land Value",
                    "renderCellFunctionReference":"_landValueCalc",
                    "filterGroup":"parcelAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":true
                },
                {
                    "fieldName": "VMP_P1_V5",
                    "shortFieldName": "VMP_P1_V5",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "-Building/Improvements Value",
                    "filterDisplayName": "Building/Improvements Value",
                    "renderCellFunctionReference":"_buildingImprovementsValueCalc",
                    "filterGroup":"parcelAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":true
                },
                {
                    "fieldName": "VMP_P1_V3_NotNull",
                    "shortFieldName": "VMP_P1_V3_NotNull",
                    "filterType": "",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "-Construction Year",
                    "filterDisplayName": "Construction Year",
                    "renderCellFunctionReference":"",
                    "filterGroup":"parcelAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":true,
                    "calculated":false
                },
                {
                    "fieldName": "VMP_P1_V4_NotNull",
                    "shortFieldName": "VMP_P1_V4_NotNull",
                    "filterType": "",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "-Land Value",
                    "filterDisplayName": "Land Value",
                    "renderCellFunctionReference":"",
                    "filterGroup":"parcelAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":true,
                    "calculated":false
                },
                {
                    "fieldName": "VMP_P1_V5_NotNull",
                    "shortFieldName": "VMP_P1_V5_NotNull",
                    "filterType": "",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "-Building/Improvements Value",
                    "filterDisplayName": "Building/Improvements Value",
                    "renderCellFunctionReference":"",
                    "filterGroup":"parcelAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":true,
                    "calculated":false
                },
                {
                    "fieldName": "VMP_P1_V6",
                    "shortFieldName": "VMP_P1_V6",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "-Parcel Sq. Ft",
                    "filterDisplayName": "Parcel Sq. Ft",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"parcelAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":false
                },
                {
                    "fieldName": "VMP_P1_V7",
                    "shortFieldName": "VMP_P1_V7",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Parcel Acreage",
                    "filterDisplayName": "Parcel Acreage",
                    "renderCellFunctionReference":"_addComma2",
                    "filterGroup":"parcelAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":false
                }
            ],
            _hHIncomeFilters: [
                {
                    "fieldName": "Population_Estimate_Total",
                    "shortFieldName": "Population_Estimate_Total",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Population_Estimate_Total ",
                    "filterDisplayName": "Population Estimate",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"hHIncomeAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":false
                },
                {
                    "fieldName": "Households_Estimate_Total",
                    "shortFieldName":"Households_Estimate_Total",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Households_Estimate_Total ",
                    "filterDisplayName": "Households Estimate",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"hHIncomeAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":false
                },
                {
                    "fieldName": "Median_HHI_Weight",
                    "shortFieldName":"Median_HHI_Weight",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Median_HHI_Weight",
                    "filterDisplayName": "Median_HHI_Weight",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"hHIncomeAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":true,
                    "calculated":false
                },
                {
                    "fieldName": "Households_BelowPovertyLevel",
                    "shortFieldName": "HouseholdsBelowPoverty",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Households_BelowPovertyLevel  ",
                    "filterDisplayName": "Households Below Poverty Level",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"hHIncomeAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":false
                },
                {
                    "fieldName": "Households_PercentBelowPoverty",
                    "shortFieldName": "Households_PercentBelowPoverty",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Households_PercentBelowPoverty",
                    "filterDisplayName": "Percent Households Below Poverty Level",
                    "renderCellFunctionReference":"_calculatePercentHHBelowPoverty",
                    "filterGroup":"hHIncomeAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":true
                },
                {
                    "fieldName": "Households_MedianIncome",
                    "shortFieldName": "Households_MedianIncome",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Households_MedianIncome  ",
                    "filterDisplayName": "Households Median Income  ",
                    "renderCellFunctionReference":"_calculateMedianHHIncome",
                    "filterGroup":"hHIncomeAttributeChoices",
                    "hidden":false,
                    "doNotDisplayAtAll":false,
                    "calculated":true
                }

            ],
            _employmentFilters: [
                /* {
                 "fieldName": "Count_Establishments_AllSectors",
                 "shortFieldName": "CountAllSectors",
                 "filterType": "range",
                 "filterOptions": [],
                 "filterRangeTop": "",
                 "filterRangeBottom": "",
                 "filterIncrement": "",
                 "filterDescription": "Establishments AllSectors",
                 "filterDisplayName": "All Sectors",
                 "renderCellFunctionReference":"_addComma",
                 "filterGroup":"employmentAttributeChoices",
                 "hidden":false,
                 "doNotDisplayAtAll":false,
                 "calculated":false,
                 "type":"establishments"
                 },
                 {
                 "fieldName": "avgemp_AllSectors",
                 "shortFieldName": "avgemp_AllSectors",
                 "filterType": "range",
                 "filterOptions": [],
                 "filterRangeTop": "",
                 "filterRangeBottom": "",
                 "filterIncrement": "",
                 "filterDescription": "Employees: All Sectors",
                 "filterDisplayName": "All Sectors",
                 "renderCellFunctionReference":"_addComma",
                 "filterGroup":"employmentAttributeChoices",
                 "hidden":false,
                 "doNotDisplayAtAll":false,
                 "calculated":false,
                 "type":"Employees"
                 },*/
                {
                    "fieldName": "Count_Establishments_Sector11",
                    "shortFieldName": "CountSector11",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector11",
                    "filterDisplayName": "Agriculture, Forestry, Fishing and Hunting",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector11",
                    "shortFieldName": "Sum_avgemp_Sector11",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector11",
                    "filterDisplayName": "Agriculture, Forestry, Fishing and Hunting1",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector21",
                    "shortFieldName": "CountSector21",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector21",
                    "filterDisplayName": "Mining, Quarrying, and Oil and Gas Extraction",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector21",
                    "shortFieldName": "Sum_avgemp_Sector21",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector21",
                    "filterDisplayName": "Mining, Quarrying, and Oil and Gas Extraction",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector23",
                    "shortFieldName": "CountSector23",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector23",
                    "filterDisplayName": "Construction",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector23",
                    "shortFieldName": "Sum_avgemp_Sector23",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector23",
                    "filterDisplayName": "Construction",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector31_3",
                    "shortFieldName": "CountSector31_3",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector31_3",
                    "filterDisplayName": "Manufacturing",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector31_33",
                    "shortFieldName": "Sum_avgemp_Sector31_33",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector31_33",
                    "filterDisplayName": "Manufacturing",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector42_4",
                    "shortFieldName": "CountSector42_4",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector42_4",
                    "filterDisplayName": "Wholesale Trade and Retail Trade",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector42_44_45",
                    "shortFieldName": "Sum_avgemp_Sector42_44_45",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector42_44_45",
                    "filterDisplayName": "Wholesale Trade and Retail Trade",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector22_4",
                    "shortFieldName": "CountSector22_4",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector22_4",
                    "filterDisplayName": "Transportation, Warehousing, and Utilities",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector22_48_49",
                    "shortFieldName": "Sum_avgemp_Sector22_48_49",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector22_48_49",
                    "filterDisplayName": "Transportation, Warehousing, and Utilities",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector51_5",
                    "shortFieldName": "CountSector51_5",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector51_5",
                    "filterDisplayName": "Information, Finance and Insurance, Real Estate, and Professional, Scientific, and Technical Services",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector51_52_53",
                    "shortFieldName": "Sum_avgemp_Sector51_52_53",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector51_52_53",
                    "filterDisplayName": "Information, Finance and Insurance, Real Estate, and Professional, Scientific, and Technical Services",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector55_5",
                    "shortFieldName": "CountSector55_5",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector55_5",
                    "filterDisplayName": "Management of Companies and Enterprises, and Administrative Support, and Waste Management and Remediation Services",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector55_56",
                    "shortFieldName": "Sum_avgemp_Sector55_56",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector55_56",
                    "filterDisplayName": "Management of Companies and Enterprises, and Administrative Support, and Waste Management and Remediation Services",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector61",
                    "shortFieldName": "CountSector61",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector61",
                    "filterDisplayName": "Educational Services",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector61",
                    "shortFieldName": "Sum_avgemp_Sector61",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector61",
                    "filterDisplayName": "Educational Services",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector62",
                    "shortFieldName": "CountSector62",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector62",
                    "filterDisplayName": "Health Care and Social Assistance",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector62",
                    "shortFieldName": "Sum_avgemp_Sector62",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector62",
                    "filterDisplayName": "Health Care and Social Assistance",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector71",
                    "shortFieldName": "CountSector71",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector71",
                    "filterDisplayName": "Arts, Entertainment, and Recreation",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector71",
                    "shortFieldName": "Sum_avgemp_Sector71",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector71",
                    "filterDisplayName": "Arts, Entertainment, and Recreation",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector72",
                    "shortFieldName": "CountSector72",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector72",
                    "filterDisplayName": "Accommodation and Food Services",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector72",
                    "shortFieldName": "Sum_avgemp_Sector72",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector72",
                    "filterDisplayName": "Accommodation and Food Services",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector81",
                    "shortFieldName": "CountSector81",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector81",
                    "filterDisplayName": "Other Services except Public Administration",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector81",
                    "shortFieldName": "Sum_avgemp_Sector81",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector81",
                    "filterDisplayName": "Other Services except Public Administration1",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                },
                {
                    "fieldName": "Count_Establishments_Sector92",
                    "shortFieldName": "CountSector92",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Sector92",
                    "filterDisplayName": "Public Administration",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"establishments"
                },
                {
                    "fieldName": "Sum_avgemp_Sector92",
                    "shortFieldName": "Sum_avgemp_Sector92",
                    "filterType": "range",
                    "filterOptions": [],
                    "filterRangeTop": "",
                    "filterRangeBottom": "",
                    "filterIncrement": "",
                    "filterDescription": "Employees: Sector92",
                    "filterDisplayName": "Public Administration2",
                    "renderCellFunctionReference":"_addComma",
                    "filterGroup":"employmentAttributeChoices",
                    "hidden":true,
                    "doNotDisplayAtAll":false,
                    "calculated":false,
                    "type":"Employees"
                }
            ],
            _parcelFilterKeys:{},
            _hHIncomeFilterKeys:{},
            _employmentFilterKeys:{},
            _parcelStatisticsDefinition:[],
            _hHIncomeStatisticsDefinition:[],
            _employmentStatisticsDefinition:[],
            _parcelGroupByFields:[],
            _hHIncomeGroupByFields:[],
            _employmentGroupByFields:[],
            _parcelDataGridColumns:{},
            _hHIncomeDataGridColumns:{},
            _hHIncomeExtraData:[{
                "HouseholdsBelowPoverty_sum": 3202,
                "Households_Estimate_Total_sum": 57586,
                "Households_MedianIncome_sum": 6064433,
                "Location": "Hanover",
                "Median_HHI_Weight_sum": 4495354716,
                "Population_Estimate_Total_sum": 155052
            },
                {
                    "HouseholdsBelowPoverty_sum": 22231,
                    "Households_Estimate_Total_sum": 109916,
                    "Households_MedianIncome_sum": 10105088,
                    "Location": "Richmond",
                    "Median_HHI_Weight_sum": 5493784336,
                    "Population_Estimate_Total_sum": 270596
                },
                {
                    "HouseholdsBelowPoverty_sum": 1182,
                    "Households_Estimate_Total_sum": 20705,
                    "Households_MedianIncome_sum": 2712234,
                    "Location": "Powhatan",
                    "Median_HHI_Weight_sum": 1953953789,
                    "Population_Estimate_Total_sum": 62652
                },
                {
                    "HouseholdsBelowPoverty_sum": 1477,
                    "Households_Estimate_Total_sum": 22555,
                    "Households_MedianIncome_sum": 3099597,
                    "Location": "Goochland",
                    "Median_HHI_Weight_sum": 2037125691,
                    "Population_Estimate_Total_sum": 61706
                },
                {
                    "HouseholdsBelowPoverty_sum": 1017,
                    "Households_Estimate_Total_sum": 15441,
                    "Households_MedianIncome_sum": 1507250,
                    "Location": "King William",
                    "Median_HHI_Weight_sum": 988096814,
                    "Population_Estimate_Total_sum": 41889
                },
                {
                    "HouseholdsBelowPoverty_sum": 15530,
                    "Households_Estimate_Total_sum": 154434,
                    "Households_MedianIncome_sum": 15336787,
                    "Location": "Henrico",
                    "Median_HHI_Weight_sum": 10822158005,
                    "Population_Estimate_Total_sum": 390364
                },
                {
                    "HouseholdsBelowPoverty_sum": 948,
                    "Households_Estimate_Total_sum": 15137,
                    "Households_MedianIncome_sum": 1525889,
                    "Location": "New Kent0",
                    "Median_HHI_Weight_sum": 1030288734,
                    "Population_Estimate_Total_sum": 39616
                },
                {
                    "HouseholdsBelowPoverty_sum": 828,
                    "Households_Estimate_Total_sum": 9210,
                    "Households_MedianIncome_sum": 1110278,
                    "Location": "Charles City",
                    "Median_HHI_Weight_sum": 637944503,
                    "Population_Estimate_Total_sum": 24172
                },
                {
                    "HouseholdsBelowPoverty_sum": 1053,
                    "Households_Estimate_Total_sum": 8183,
                    "Households_MedianIncome_sum": 834806,
                    "Location": "Sussex",
                    "Median_HHI_Weight_sum": 380633121,
                    "Population_Estimate_Total_sum": 24741
                },
                {
                    "HouseholdsBelowPoverty_sum": 1880,
                    "Households_Estimate_Total_sum": 12767,
                    "Households_MedianIncome_sum": 1044281,
                    "Location": "Hopewell",
                    "Median_HHI_Weight_sum": 621819108,
                    "Population_Estimate_Total_sum": 37504
                },
                {
                    "HouseholdsBelowPoverty_sum": 1922,
                    "Households_Estimate_Total_sum": 17084,
                    "Households_MedianIncome_sum": 1599927,
                    "Location": "Dinwiddie",
                    "Median_HHI_Weight_sum": 939508680,
                    "Population_Estimate_Total_sum": 47297
                },
                {
                    "HouseholdsBelowPoverty_sum": 3187,
                    "Households_Estimate_Total_sum": 18738,
                    "Households_MedianIncome_sum": 1655688,
                    "Location": "Petersburg",
                    "Median_HHI_Weight_sum": 825132974,
                    "Population_Estimate_Total_sum": 50777
                },
                {
                    "HouseholdsBelowPoverty_sum": 10509,
                    "Households_Estimate_Total_sum": 142938,
                    "Households_MedianIncome_sum": 15343615,
                    "Location": "Chesterfield",
                    "Median_HHI_Weight_sum": 10509340647,
                    "Population_Estimate_Total_sum": 397630
                },
                {
                    "HouseholdsBelowPoverty_sum": 3326,
                    "Households_Estimate_Total_sum": 26638,
                    "Households_MedianIncome_sum": 2535374,
                    "Location": "Prince George",
                    "Median_HHI_Weight_sum": 1470378513,
                    "Population_Estimate_Total_sum": 79391
                },
                {
                    "HouseholdsBelowPoverty_sum": 1618,
                    "Households_Estimate_Total_sum": 15780,
                    "Households_MedianIncome_sum": 1540743,
                    "Location": "Caroline",
                    "Median_HHI_Weight_sum": 970426181,
                    "Population_Estimate_Total_sum": 4260
                },
                {
                    "HouseholdsBelowPoverty_sum": 1169,
                    "Households_Estimate_Total_sum": 12740,
                    "Households_MedianIncome_sum": 1058400,
                    "Location": "Colonial Heights",
                    "Median_HHI_Weight_sum": 714981669,
                    "Population_Estimate_Total_sum": 36090
                },
                {
                    "HouseholdsBelowPoverty_sum": 364,
                    "Households_Estimate_Total_sum": 4865,
                    "Households_MedianIncome_sum": 530084,
                    "Location": "Ashland",
                    "Median_HHI_Weight_sum": 292697179,
                    "Population_Estimate_Total_sum": 13293
                }],
            _employmentDataGridColumns:{},
            _resultsTabContainer:{},
            _resultTabs:{},
            //_parcelStatTypes:["sum","min","max","avg"],
            _parcelStatTypes:["avg","sum"],
            _hHIncomeStatTypes:["sum"],
            _employmentStatTypes:["sum"],
            _parcelStatTypesColumn_Hidden:{"sum":true,"avg":false},
            //_parcelStatTypesColumn_Hidden:{"avg":false},
            _hHIncomeStatTypesColumn_Hidden:{"sum":false},
            _employmentStatTypesColumn_Hidden:{"sum":false},
            _filtersNodeID : "filterContainer",
            _filterTitlePanes:{},
            _bufferToolDistance:2,
            _polygonDrawButton:{},
            _bufferDistanceContainer:{},
            _bufferTextBox:{},
            _commitLocalitySelectionButton:{},
            _cancelLocalitySelectionButton:{},
            _activeResultsSection:1,
            _resultsTabToGraphicCountHash:{},
            _tearDownReferences:{},
            _activeColor:"",
            _activeColors:[],
            _helpDialog:null,
            _aboutDialog:null,
            _tutorialCount:0,
            _employmentColors:{
                "Agriculture, Forestry, Fishing and Hunting":{
                    "fill1":"rgb(73, 124, 145)",
                    "fill2":"rgb(89, 160, 189)",
                    "stroke":"rgb(34, 98, 125)"
                },
                "Mining, Quarrying, and Oil and Gas Extraction":{
                    "fill1":"rgb(108, 109, 142)",
                    "fill2":"rgb(141, 136, 199)",
                    "stroke":"rgb(138, 132, 197)"
                },
                "Construction":{
                    "fill1":"rgb(118, 139, 78)",
                    "fill2":"rgb(133, 165, 74)",
                    "stroke":"rgb(91, 109, 31)"
                },
                "Manufacturing":{
                    "fill1":"rgb(198, 195, 97)",
                    "fill2":"rgb(232, 230, 103)",
                    "stroke":"rgb(145, 142, 56)"
                },
                "Wholesale Trade and Retail Trade":{
                    "fill1":"rgb(199, 162, 35)",
                    "fill2":"rgb(233, 199, 86)",
                    "stroke":"rgb(148, 123, 48)"
                },
                "Transportation, Warehousing, and Utilities":{
                    "fill1":"rgb(129, 84, 84)",
                    "fill2":"rgb(160, 90, 90)",
                    "stroke":"rgb(87, 40, 40)"
                },
                "Information, Finance and Insurance, Real Estate, and Professional, Scientific, and Technical Services":{
                    "fill1":"rgb(114, 84, 62)",
                    "fill2":"rgb(177, 112, 68)",
                    "stroke":"rgb(116, 72, 46)"
                },
                "Management of Companies and Enterprises, and Administrative Support, and Waste Management and Remediation Services":{
                    "fill1":"rgb(114, 114, 114)",
                    "fill2":"rgb(165, 165, 165)",
                    "stroke":"rgb(83, 83, 83)"
                },
                "Educational Services":{
                    "fill1":"rgb(89, 160, 189)",
                    "fill2":"rgb(157, 199, 217)",
                    "stroke":"rgb(34, 98, 125)"
                },
                "Health Care and Social Assistance":{
                    "fill1":"rgb(134, 129, 179)",
                    "fill2":"rgb(183, 179, 218)",
                    "stroke":"rgb(138, 132, 197)"
                },
                "Arts, Entertainment, and Recreation":{
                    "fill1":"rgb(133, 165, 74)",
                    "fill2":"rgb(168, 193, 121)",
                    "stroke":"rgb(91, 109, 31)"
                },
                "Accommodation and Food Services":{
                    "fill1":"rgb(214, 212, 86)",
                    "fill2":"rgb(238, 234, 153)",
                    "stroke":"rgb(145, 142, 56)"
                },
                "Other Services except Public Administration":{
                    "fill1":"rgb(233, 199, 86)",
                    "fill2":"rgb(235, 207, 129)",
                    "stroke":"rgb(148, 123, 48)"
                },
                "Public Administration":{
                    "fill1":"rgb(160, 90, 90)",
                    "fill2":"rgb(201, 153, 153)",
                    "stroke":"rgb(87, 40, 40)"
                }
            },
            _MSAIndicators:{
                "Households_MedianIncome":57286,
                "Households_PercentBelowPoverty":11.38
            },
            _USIndicators:{
                "Households_MedianIncome":52250,
                "Households_PercentBelowPoverty":14.8
            },
            //Source: U.S. Census Bureau, 2009-2013 5-Year American Community Survey
            _filterPanelShowing:true,
            _filterLocation:"top",//choices are top, side
            _customToolTip:{},
            _customToolTipState: "none",
            _initialWindowHeight:0,
            _initialWindowWidth:0,
            _isSelectingCounties:false,
            _selectingCountiesDoubleClick:false,
            _studyAreaMaps:{},
            _filterGraphic:{},
            _init: function () {

                var query = document.URL.substring(document.URL.indexOf("?") + 1, document.URL.length);
                var queryObject = dojo_ioquery.queryToObject(query);

                ///Filter Location Section
                //START
                if (queryObject.hasOwnProperty('filterLocation')) {
                    this._filterLocation = queryObject.filterLocation;
                }
                if (this._filterLocation == "") {
                    this._filterLocation = "side";
                }
                ///Filter Location Section
                //END


                var vs = win.getBox();
                this._initialWindowHeight =vs.h;
                this._initialWindowWidth= vs.w;

                this._parcelDataGridColumns["VMP_P1_V12"] = {"label":"Land Use"};
                this._hHIncomeDataGridColumns["Location"] = {"label":"Location"};
                this._createStatisticsDefinition(this._parcelStatTypes,this._parcelStatTypesColumn_Hidden,this._parcelFilters,this._parcelFilterKeys,this._parcelDataGridColumns,this._parcelStatisticsDefinition,this._parcelGroupByFields);
                this._createStatisticsDefinition(this._hHIncomeStatTypes,this._hHIncomeStatTypesColumn_Hidden,this._hHIncomeFilters,this._hHIncomeFilterKeys,this._hHIncomeDataGridColumns,this._hHIncomeStatisticsDefinition,this._hHIncomeGroupByFields);
                this._createStatisticsDefinition(this._employmentStatTypes,this._employmentStatTypesColumn_Hidden,this._employmentFilters,this._employmentFilterKeys,this._employmentDataGridColumns,this._employmentStatisticsDefinition,this._employmentGroupByFields);
                this._createUIElements();
                this._createMapElements();
                //maybe this should wait on map load?
                this._createSearch();
                //this._startUpTutorial();


                if(this._filterLocation == "top") {

                    on(dom.byId("closeFilterPanel"), "click", lang.hitch(this, function () {
                        this._moveFilters();
                    }));

                } else {

                    domStyle.set(dom.byId("navTopPanelContainer"), "display", "none");
                }

            },

            /*Create things*/



            _createStatisticsDefinition:function(StatTypes,StatTypesColumn_Hidden,Filters,FilterKeys,DataGridColumns,StatisticsDefinition,GroupByFields){


                var that = this;
                var statTypes = StatTypes;

                var statTypes_hidden = StatTypesColumn_Hidden;
                array.forEach( Filters, function (itemFilters, iFilters) {
                    //just adding some flexibility with addressing...
                    FilterKeys[itemFilters.fieldName] = iFilters;

                    switch (itemFilters.filterType) {
                        case "range":
                            array.forEach( statTypes, function (itemTypes, iType) {
                                var localSsatisticDefinition = new StatisticDefinition();
                                localSsatisticDefinition.onStatisticField = itemFilters.fieldName;
                                localSsatisticDefinition.outStatisticFieldName = itemFilters.shortFieldName+"_"+itemTypes;
                                localSsatisticDefinition.statisticType = itemTypes;

                                StatisticsDefinition.push(localSsatisticDefinition);
                                //while we are here let's make the columns for our data grid...
                                if(!itemFilters.doNotDisplayAtAll && !statTypes_hidden[itemTypes]) {
                                    DataGridColumns[itemFilters.shortFieldName + "_" + itemTypes] = {"label": itemFilters.filterDisplayName + " : " +(statTypes.length > 1 ? itemTypes : "")};
                                    // DataGridColumns[itemFilters.shortFieldName + "_" + itemTypes]["hidden"] = (statTypes_hidden[itemTypes] || itemFilters.hidden);
                                    if (itemFilters.hasOwnProperty("renderCellFunctionReference")) {
                                        DataGridColumns[itemFilters.shortFieldName + "_" + itemTypes]["renderCell"] = that[itemFilters.renderCellFunctionReference];
                                    }

                                }
                            });
                            break;
                        case "choices":
                            //we will group by choice types
                            GroupByFields.push(itemFilters.fieldName);
                            //we will also count on the choice fields.
                            var localSsatisticDefinition = new StatisticDefinition();
                            localSsatisticDefinition.onStatisticField = itemFilters.fieldName;
                            localSsatisticDefinition.outStatisticFieldName = itemFilters.fieldName+"_count";
                            DataGridColumns[itemFilters.fieldName+"_count"] = {"label":itemFilters.filterDisplayName+" : Count"};
                            localSsatisticDefinition.statisticType = "count";
                            StatisticsDefinition.push(localSsatisticDefinition);
                            break;
                        default:

                    }
                });






            },
            _createUIElements: function () {

                var that = this;


                //create tab container for map and results

                this._resultsTabContainer  = new TabContainer({
                    style: "height: 100%; width: 100%;",
                    doLayout:false
                }, "mainContainer");

                var mapTab = new ContentPane({
                    title:"Map Selection",
                    style: "height:"+(this._initialWindowHeight - 150) +"px;width:100%;",
                    content: "   <div id=\"map\">" +
                    "<div id=\"ovWin\" class=\"shadow\" style=\"position:absolute; right:35px; bottom:125px; z-Index:998; width:175px;height:150px; \">"+
                    "<div id=\"overviewDiv\" style=\"width:100%;height:100%;\"></div>"+
                    "</div>"+
                    "<div id=\"mapToolsWin\" class=\"shadow\" style=\"position:absolute; right:35px; top:5px; z-Index:998; width:175px;height:150px; \">"+
                    "<div id=\"filterContainerParcels\" style=\"width:100%;height:100%;\"></div>"+
                    "</div>" +
                    "           </div>" +
                    "   <div class='mapBottom'>"+
                    "       <div class=\"logoInMap\"><img src=\"images/CURASmall.png\"></div>" +
                    "       <div class='addressSearch'><div id=\"search\"></div></div>"  +
                    "       <div class=\"transparencySlider\">" +
                    "           <div>Parcel Transparency</div>" +
                    "           <div id=\"transparencySlider\"></div>" +
                    "           </div>"+
                    "   </div>"/*+
                    " <div style=\"position:absolute; right:45px; top:107px; z-Index:999;\">"+
                    "                        <div data-dojo-type=\"dijit/TitlePane\" data-dojo-props=\"title:'Switch Basemap', closable:false, open:false\">"+
                    "                            <div id=\"basmapGalleryContentPane\" data-dojo-type=\"dijit/layout/ContentPane\" style=\"width:380px; height:280px; overflow:auto;\">"+
                    "                                <div id=\"basemapGallery\"></div>"+
                    "                            </div>"+
                    "                        </div>"+
                    "                        <div data-dojo-type=\"dijit/TitlePane\" data-dojo-props=\"title:'Map Legend', closable:false, open:false\">"+
                    "                            <div id=\"legendDivContentPane\" data-dojo-type=\"dijit/layout/ContentPane\" style=\"width:380px; height:280px; overflow:auto;\">"+
                    "                                <div id=\"legendDiv\"></div>"+
                    "                            </div>"+
                    "                        </div>"+
                    "                        <div data-dojo-type=\"dijit/TitlePane\" data-dojo-props=\"title:'Map Features', closable:false, open:false\">"+
                    "                            <div id=\"featuresDivContentPane\" data-dojo-type=\"dijit/layout/ContentPane\" style=\"width:380px; height:280px; overflow:auto;\">"+
                    "                                <div id=\"featuresDiv\"></div>"+
                    "                            </div>"+
                    "                        </div>"+
                    "</div>"*/
                });
                this._resultsTabContainer.addChild(mapTab);

                this._resultsTabContainer.startup();


                 if(this._filterLocation == "top"){
                    this._createFilterElementsTopNav();
                } else {
                    this._createFilterElementsSideNav();
                }
                this._createResultsTabContainer();

                var clickLink =  dom.byId("helpClick");
                on(clickLink,"click", function(){that._handleHelpClick();});

                var aboutLink =  dom.byId("aboutClick");
                on(aboutLink,"click", function(){that._handleAboutClick();});



            },
            _createFilterElementsTopNav:function(){

                var filterNode = dom.byId(this._filtersNodeID+"MapTools");
                //create the filters and put them in the left nav section as designated by this._filterNodeID
                var mapNodeInnerHTML = "<div id=\"selectOptions\" >" +
                    "<div class=\"mapSelectorText\">Select an area to study by: </div>" +
                    "</div>";// +
                    /*"<br />" +
                    "<div class=\"selectToolButtons\">" +
                    "<div id=\"polyDraw\"></div>" +
                    "<div id=\"bufferDistance\"></div>" +
                    "<div id=\"localitiesTools\">" +
                    "<div id=\"localCancel\"></div>" +
                    "<div id=\"localCommit\"></div>" +
                    "</div>" +
                    "</div>"*/;
                var mapSelectionToolsNode = domConstruct.create("div", {"innerHTML":mapNodeInnerHTML}, filterNode, "first");

                //var tpselectOptions = new TitlePane({title:"Map Selection Tools", content: "<div id=\"selectOptions\" ><div class=\"mapSelectorText\">Select an area to study by: </div></div><br /><div class=\"selectToolButtons\"><div id=\"polyDraw\"></div><div id=\"bufferDistance\"></div><div id=\"localitiesTools\"><div id=\"localCancel\"></div><div id=\"localCommit\"></div></div></div>"});
                //filterNode.appendChild(tpselectOptions.domNode);
                //tpselectOptions.startup();

                //create the map selection tools
                this._createMapSelectionTools();

                //create the range filter options
                var filterNodeParcels = dom.byId(this._filtersNodeID+"Parcels");
                this._createFilters(filterNodeParcels);

            },
            _createFilterElementsSideNav:function(){

                var filterNode = dom.byId(this._filtersNodeID+"Side");
                //create the filters and put them in the left nav section as designated by this._filterNodeID

                var tpselectOptions = new TitlePane({title:"Map Selection Tools", content: "<div id=\"selectOptions\" ><div class=\"mapSelectorText\">Select an area to study by: </div></div><br /><div class=\"selectToolButtons\"><div id=\"polyDraw\"></div><div id=\"bufferDistance\"></div><div id=\"localitiesTools\"><div id=\"localCancel\"></div><div id=\"localCommit\"></div></div></div>"});
                filterNode.appendChild(tpselectOptions.domNode);
                tpselectOptions.startup();

                //create the map selection tools
                this._createMapSelectionTools();

                //create the range filter options
                this._createFilters(filterNode);

            },
            _createResultsTabContainer: function(){

                console.log("this._resultsTabContainerthis._resultsTabContainerthis._resultsTabContainerthis._resultsTabContainer");
                console.log(this._resultsTabContainer);
            },
            _createTransparencySlider:function(){

                var that = this;
                var slider = new HorizontalSlider({
                    name: "slider",
                    value: 3,
                    minimum: 0,
                    maximum: 10,
                    intermediateChanges: true,
                    discreteValues: 11,
                    showButtons: true,
                    style: "width:200px;",
                    onChange: function(value){
                        that._parcelDynamicMapServiceLayer.setOpacity(value / 10);

                    }
                }, "transparencySlider").startup();
            },
            _createFilters: function (filterNode) {

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
                var that = this;

                if(!this._filterTitlePanes["parcelPropertyType"]) {
                    this._filterTitlePanes["parcelPropertyType"] = new TitlePane({title:"Parcel Property Types", open:false, content: "<div id=\"parcelPropertyType\"></div>"});
                    filterNode.appendChild(this._filterTitlePanes["parcelPropertyType"].domNode);
                }


                var node = domConstruct.create("div",{ id:filterObject.fieldName+"_div","class":"filterChoices" },dom.byId(filterObject.filterGroup),"last");
                var propertyTypeStore = new Memory({data:filterObject.filterOptions, idProperty: 'id'});
                this._parcelPropertyTypesGrid = new (declare([ OnDemandGrid, Selector ]))({
                    collection: propertyTypeStore ,
                    selectionMode: 'multi ',
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

                if(this._filterTitlePanes["parcelPropertyType"]) {
                    this._filterTitlePanes["parcelPropertyType"].startup();
                    console.log("this._filterTitlePanes[parcelPropertyType]");
                    console.log(this._filterTitlePanes["parcelPropertyType"]);
                }


                this._filterTitlePanes["parcelPropertyType"].watch("open", function(param, oldValue, newValue) {
                    console.log("Watching filtertitle pane....");
                    that._parcelPropertyTypesGrid.resize();
                });
            },
            _createMultiSelect_dojox: function (filterObject) {

                var node = domConstruct.create("div",{ id:filterObject.fieldName+"_div","class":"filterChoices" },dom.byId(filterObject.filterGroup),"last");


                var mySelect = domConstruct.create("select", { id: filterObject.fieldName}, node);


                var option3 = domConstruct.create("option", { innerHTML: "No Preference", value: "00" }, mySelect);
                var option1 = domConstruct.create("option", { innerHTML: "InnerHTML1", value: "value1" }, mySelect);
                var option2 = domConstruct.create("option", { innerHTML: "InnerHTML2", value: "value2" }, mySelect);
                var option4 = domConstruct.create("option", { innerHTML: "InnerHTML3", value: "value3" }, mySelect);


                array.forEach(filterObject.filterOptions, function (item, i) {
                    domConstruct.create("option", { innerHTML: item, value: item }, mySelect);
                });


                var myMultiSelect = new MultiSelect({ name: 'dynamic' }, mySelect);

                myMultiSelect.startup();
                //don't know why I have to do this....
                myMultiSelect.set("value", [00]);




            },
            _createTextBoxRanges: function (filterObject,filterNode) {


                if (!this._filterTitlePanes["parcelAttributeChoices"]) {
                    this._filterTitlePanes["parcelAttributeChoices"] = new TitlePane({
                        title: "Parcel Attributes",
                        "class":"filterTextBoxRanges",
                        open:false
                    });
                    filterNode.appendChild(this._filterTitlePanes["parcelAttributeChoices"].domNode);
                }


                //create a div to hold a specific range
                var node = domConstruct.create("div",{ id:filterObject.fieldName+"_div","class":"filterRanges" });
                this._filterTitlePanes["parcelAttributeChoices"].containerNode.appendChild(node);

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
                }
            },
            _createSliders:function(){


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

                var that=this;

                //create the selection method dropdown.
               /* this._selectionType = new Select({
                    name: "select2",
                    "class":"mapSelector",
                    options: [
                        { label: "Drawing a Polygon", value: "polygon" },
                        { label: "Buffering a point", value: "buffer", selected: true },
                        { label: "By County", value: "county" }//,
                        //   { label: "By Individual Agg Group", value: "individual" }
                    ],
                    onChange: lang.hitch(that, function(event){that._handleMapSelectionDropDownChange(event);})
                });

                this._selectionType.placeAt("selectOptions");
                this._selectionType.startup();*/


                var checkboxesNode = domConstruct.create("div", {}, dom.byId("selectOptions"), "first");


                var DrawPolygonNode = domConstruct.create("div", {class:"selectToolOverallContainer"}, dom.byId("selectOptions"), "last");
                var CreateBufferNode = domConstruct.create("div", {class:"selectToolOverallContainer"}, dom.byId("selectOptions"), "last");
                var SelectCountiesNode = domConstruct.create("div", {class:"selectToolOverallContainer"}, dom.byId("selectOptions"), "last");


                var DrawPolygonCheckbox = domConstruct.create("div", {class:"selectToolContainer"}, DrawPolygonNode, "last");
                var DrawPolygonText = domConstruct.create("div", {class:"selectToolContainer selectToolText",innerHTML:"Drawing a Freehand Polygon"}, DrawPolygonNode, "last");
                var DrawPolygonImage = domConstruct.create("img", {class:"selectToolContainer selectToolImage",src:"./images/freehandDrawExample.PNG"}, DrawPolygonNode, "last");
                var DrawPolygonHelper = domConstruct.create("div", {class:"selectToolContainer selectToolHelper"}, DrawPolygonNode, "last");

                var CreateBufferCheckbox = domConstruct.create("div", {class:"selectToolContainer"}, CreateBufferNode, "last");
                var CreateBufferText = domConstruct.create("div", {class:"selectToolContainer selectToolText",innerHTML:"Buffering a Point"}, CreateBufferNode, "last");
                var CreateBufferImage = domConstruct.create("img", {class:"selectToolContainer selectToolImage", src:"./images/bufferExample.PNG"}, CreateBufferNode, "last");
                var CreateBufferHelper = domConstruct.create("div", {class:"selectToolContainer selectToolHelper"}, CreateBufferNode, "last");

                var SelectCountiesCheckbox = domConstruct.create("div", {class:"selectToolContainer"}, SelectCountiesNode, "last");
                var SelectCountiesText = domConstruct.create("div", {class:"selectToolContainer selectToolText",innerHTML:"Selecting Counties"}, SelectCountiesNode, "last");
                var SelectCountiesImage = domConstruct.create("img", {class:"selectToolContainer selectToolImage",src:"./images/CountySelectExample.PNG"}, SelectCountiesNode, "last");
                var SelectCountiesHelper = domConstruct.create("div", {class:"selectToolContainer selectToolHelper"}, SelectCountiesNode, "last");

                var checkBoxDrawPolygon = new RadioButton({
                    name: "selectionTools",
                    value: "agreed",
                    checked: false,
                    class:"selectToolContainer",
                    onChange: lang.hitch(that,function(b){
                        if(b) {
                            that._selectionType = "polygon";
                            that._handleMapSelectionDropDownChange("polygon");
                        } ;
                    })
                }, DrawPolygonCheckbox).startup();


                var checkBoxCreateBuffer = new RadioButton({
                    name: "selectionTools",
                    value: "agreed",
                    checked: false,
                    class:"selectToolContainer",
                    onChange: lang.hitch(that,function(b){
                        if(b) {
                            that._selectionType = "buffer";
                            that._handleMapSelectionDropDownChange("buffer");
                        } ;
                    })
                }, CreateBufferCheckbox).startup();


                var checkBoxSelectCounties = new RadioButton({
                    name: "selectionTools",
                    value: "agreed",
                    checked: false,
                    class:"selectToolContainer",
                    onChange: lang.hitch(that,function(b){
                        if(b) {
                            that._selectionType = "county";
                            that._handleMapSelectionDropDownChange("county");
                        } ;
                    })
                }, SelectCountiesCheckbox).startup();



                //create button to start poly draw
                this._polygonDrawButton = new Button({
                    label: "Click to Start Drawing",
                    class:"selectToolHelper",
                    onClick: lang.hitch(that, function () {
                        // Do something:

                        this._toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
                        this._map.hideZoomSlider();
                        this._moveFilters();
                    })
                }, DrawPolygonHelper);
                this._polygonDrawButton.startup();
                //and then immediately hide the button for later use.
                domStyle.set(this._polygonDrawButton.domNode, 'display', 'none');



                //create a simple text box for buffer distance  ..
                this._bufferDistanceContainer = domConstruct.create("div",{ id:"bufferDistanceContainer","class":"bufferDistanceContainer" },CreateBufferHelper,"last");
                var bufferDistanceTextBoxContainer = domConstruct.create("div",{ id:"bufferDistanceTextBoxContainer","class":"bufferDistanceTextBoxContainer" },this._bufferDistanceContainer,"last");
                domConstruct.create("span",{ "class":"bufferDistanceLabel","innerHTML":" Distance (in miles)" },this._bufferDistanceContainer,"last");
                this._bufferTextBox = new TextBox({
                    name: "bufferDistanceTextBox",
                    value: "2" ,
                    "class":"bufferDistanceInput",
                    placeHolder: "Buffer Distance",
                    onChange:function(){
                        that._bufferToolDistance=this.value;
                        that._toggleCustomToolTip(true,"Click on the map to create a "+that._bufferToolDistance+" mile buffer study area.");
                    }
                },bufferDistanceTextBoxContainer);

                domStyle.set(this._bufferDistanceContainer, 'display', 'none');

               /* //create locality options
                //localitiesTools
                //create button to commit locality selection
                this._commitLocalitySelectionButton = new Button({
                    label: "Create New Result Set",
                    onClick: lang.hitch(that, function () {
                        // Do something:
                        this._handleCountyCommit();
                    }),
                    "class":"LocalitySelectionButton"
                }, "localCommit");
                this._commitLocalitySelectionButton.startup();
                //and then immediately hide the button for later use.
                domStyle.set(this._commitLocalitySelectionButton.domNode, 'display', 'none');


                //create button to cancel locality selection
                this._cancelLocalitySelectionButton = new Button({
                    label: "Clear Current Selection",
                    onClick: lang.hitch(that, function () {
                        this._handleCountySelectionClear();
                    }),
                    "class":"LocalitySelectionButton"
                }, "localCancel");
                this._cancelLocalitySelectionButton.startup();
                //and then immediately hide the button for later use.
                domStyle.set(this._cancelLocalitySelectionButton.domNode, 'display', 'none');*/





            },

            _createMapElements: function () {

                var that = this;
                //create the map object , we will add data to it later. for now it just has a basemap.
                esriConfig.defaults.io.proxyUrl = "/proxy/";
                this._map = new Map("map", {
                    basemap: "topo",
//                    center: [-77.455, 37.469],
//                    zoom: 11,
                    autoResize:true,
                    fadeOnZoom:true,
                    fitExtent:true,
                    logo:false
                });

                var overviewMapDijit = new OverviewMap({
                    map: this._map,
                    visible: true,
                    expandFactor:3
                },dojo.byId("overviewDiv"));
                overviewMapDijit.startup();

                console.log("overviewMapDijitoverviewMapDijitoverviewMapDijit");
                console.log(overviewMapDijit);

                //add the legend
                this._map.on("layer-add-result", function (evt) {
                    var legendDijit = new esri_Legend({
                        map: that._map//,
                        // layerInfos: evt.layer.layerInfos[1]
                    }, "legendDiv");
                    legendDijit.startup();

                });
                this._map.on("load", lang.hitch(this,this._initTools));



                //add a dynamicmap service layer...
                var imageParameters = new ImageParameters();
                imageParameters.format = "PNG24"; //set the image type to PNG24, note default is PNG8.
                this._parcelDynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("http://magi.vcu.edu/arcgis/rest/services/MetroView/Parcels/MapServer", {
                    "opacity": 0.5,
                    "imageParameters": imageParameters
                });


                var fieldsSelectionSymbol =
                    new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                            new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.5]));

                // var content = "<b>NAME</b>: ${NAME}" ;
                // var infoTemplate = new InfoTemplate("${FIELD_NAME}", content);


                this._localityFeatureLayer = new FeatureLayer("http://magi.vcu.edu/arcgis/rest/services/MetroView/Localities/MapServer/0",
                    {
                        mode: FeatureLayer.MODE_ONDEMAND,
                        // infoTemplate: infoTemplate,
                        outFields: ["*"]
                    });


                this._localityFeatureLayer.setSelectionSymbol(fieldsSelectionSymbol);
                this._localityFeatureLayer.on("click", lang.hitch(this,function(e){

                }));
                this._localityFeatureLayer.on("selection-clear", function () {
                    console.log("No Selected Fields");
                });
                this._map.addLayer(this._localityFeatureLayer );
                //hide the locality feature layer right away.
                this._localityFeatureLayer.hide();
                this._map.addLayer(this._parcelDynamicMapServiceLayer);

                console.log("this._parcelDynamicMapServiceLayerthis._parcelDynamicMapServiceLayerthis._parcelDynamicMapServiceLayerthis._parcelDynamicMapServiceLayer");
                console.log(this._parcelDynamicMapServiceLayer);


                this._queryTask = new QueryTask("http://magi.vcu.edu/arcgis/rest/services/MetroView/Parcels/MapServer/0");
                this._queryTaskHHIncome = new QueryTask("http://magi.vcu.edu/arcgis/rest/services/MetroView/HHIncome_ByBlockGroups/MapServer/0");
                this._queryTaskEmployment = new QueryTask("http://magi.vcu.edu/arcgis/rest/services/MetroView/Employmentby_ByCensusTract/MapServer/0");

                //when the map is clicked create a buffer around the click point of the specified distance.
                this._map.on("click", function (evt) {

                    if (that._selectionType == "buffer") {
                        that._bufferPoint(evt.mapPoint,that._bufferToolDistance);
                    } else if (that._selectionType == "individual") {
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
                    }else if(that._selectionType == "county"){
                        lang.hitch(that,that._handleCountySelection(evt.graphic.attributes.OBJECTID));
                    } else {
                        console.log("End of else block...");
                    }
                    /*               if(that._filterGraphicsCount < that._colors.length-1){
                     that._filterGraphicsCount++;
                     } else {
                     that._filterGraphicsCount=0;
                     };*/
                    //that._filterGraphicsCount++;
                });


                this._map.on("dbl-click", function (evt) {
                    if(that._selectionType == "county"){
                        lang.hitch(that,that._handleCountySelection(evt.graphic.attributes.OBJECTID));
                        // that._handleCountyCommit();
                        that._selectingCountiesDoubleClick = true;
                        that._map.enableDoubleClickZoom();

                    }
                });
                //create the basemap gallery object. this will allow the users to change the basemaps. ESRI defaults here.
                this._basemapGallery = new BasemapGallery({
                    showArcGISBasemaps: true,
                    map: this._map
                }, "basemapGallery");
                this._basemapGallery.startup();
                this._basemapGallery.on("error", function (msg) {
                    console.log("basemap gallery error:  ", msg);
                });




            },
            _createParcelPieChart:function(variableName){


                //_createParcelPieChart:function(chartingNode,chartingLegendNode){
                var chartingParcelChartsContainer = domConstruct.create("div",{ },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");
                var chartingPieNodeParcelsTitle = domConstruct.create("div",{ "innerHTML":"Land Use Counts","class":"pieChartTitle" },chartingParcelChartsContainer,"last");

                var chartingPieNode = domConstruct.create("div",{ id:"chartsDivSelection_"+this._filterGraphicsCount,"class":"parcelCharts" },chartingParcelChartsContainer,"last");
                var chartingPieLegendContainer = domConstruct.create("div",{"innerHTML":"<br /><br />" ,"class":"parcelLegendCharts" },chartingParcelChartsContainer,"last");
                var chartingPieLegendNode = domConstruct.create("div",{ id:"chartsLegendDivSelection_"+this._filterGraphicsCount, },chartingPieLegendContainer,"last");
                var chartingPieNodeParcelsClear = domConstruct.create("div",{ "class":"parcelChartsClear" },chartingParcelChartsContainer,"last");

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
                //var storeSeries_VMP_P1_V3_count = new StoreSeries(this._resultsParceldStore, 'VMP_P1_V3_count');
                var pieStoreSeries = new StoreSeries(this._resultsParceldStore[this._filterGraphicsCount], function(parcelStuff){
                    return {"y":parcelStuff[variableName+"_count"],"text":parcelStuff[variableName]+ " " + parcelStuff[variableName+"_count"]};
                });

                pieChart.addSeries("Property Types",pieStoreSeries);

                var tip = new Tooltip(pieChart, "default");
                // Create the magnifier
                var mag = new MoveSlice(pieChart,"default");


                // Render the chart!
                pieChart.render();

                var legend = new Legend({ chart: pieChart,horizontal:false }, chartingPieLegendNode);

            },
            _createParcelBarChart:function(variableName,filterGraphicsCount){

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
                 var storeSeries = new StoreSeries(that._resultsParceldStore[that._filterGraphicsCount], function(parcelStuff){
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
                    var storeSeries = new StoreSeries(that._resultsParceldStore[that._filterGraphicsCount].filter(filterObject), function(parcelStuff){
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
            _createEmploymentPieChart:function(employmentContainer){

//Establishments
//Employees

                var chartingContainer = domConstruct.create("div",{ id:"chartsDivSelectionSpan_"+this._filterGraphicsCount,"class":"filterCharts","innerHTML":"" },employmentContainer,"last");

                var chartingPieNodeEmployeesContainer = domConstruct.create("div",{"class":"employmentPieChartContainer" },chartingContainer,"last");
                var chartingPieNodeEmployeesTitle = domConstruct.create("div",{ "innerHTML":"Employees","class":"pieChartTitle" },chartingPieNodeEmployeesContainer,"last");
                var chartingPieNodeEmployees = domConstruct.create("div",{ id:"chartsDivSelectionEmployment_"+this._filterGraphicsCount,"class":"filterCharts" },chartingPieNodeEmployeesContainer,"last");

                var chartingPieNodeEstablishementsContainer = domConstruct.create("div",{"class":"employmentPieChartContainer" },chartingContainer,"last");
                var chartingPieNodeEstablishementsTitle = domConstruct.create("div",{ "innerHTML":"Establishments","class":"pieChartTitle" },chartingPieNodeEstablishementsContainer,"last");
                var chartingPieNode = domConstruct.create("div",{ id:"chartsDivSelectionEstablishments_"+this._filterGraphicsCount,"class":"filterCharts" },chartingPieNodeEstablishementsContainer,"last");

                var chartingPieLegendNodeContainer = domConstruct.create("div",{"class":"employmentPieLegend"},chartingContainer,"last");
                var chartingPieLegendNode = domConstruct.create("div",{ id:"chartsLegendDivSelectionEmployment_"+this._filterGraphicsCount },chartingPieLegendNodeContainer,"last");

                var chartingBubbleNodeEstablishementsTitle = domConstruct.create("div",{ "innerHTML":"Employment Bubble Graph","class":"pieChartTitle" },chartingContainer,"last");
                var chartingBubbleNodeEstablishementsSubTitle = domConstruct.create("div",{ "innerHTML":"Size corresponds to Percent Employees","class":"pieChartSubTitle" },chartingContainer,"last");


                var chartingBubbleNode = domConstruct.create("div",{ id:"chartsDivSelectionBubble_"+this._filterGraphicsCount,"class":"filterBubbleCharts" },chartingContainer,"last");


                //Charting the results...

                // Create the chart within it's "holding" node
                var pieChart = new Chart(chartingPieNode);
                var pieChartEmployees = new Chart(chartingPieNodeEmployees);
                var bubbleChartEmployment  = new Chart(chartingBubbleNode);

                // Set the theme
                pieChart.setTheme(theme);
                pieChartEmployees.setTheme(theme);
                bubbleChartEmployment.setTheme(theme);

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
                pieChartEmployees.addPlot("default", {
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
                bubbleChartEmployment.addPlot("default", {
                    type:"Bubble", styleFunc: lang.hitch(this,function(item){

                        return { fill : this._employmentColors[item.textID].fill2,stroke : this._employmentColors[item.textID].stroke };
                    })
                });

                // Add the series of data
                //var storeSeries_VMP_P1_V3_count = new StoreSeries(this._resultsParceldStore, 'VMP_P1_V3_count');

                var pieStoreSeries = new StoreSeries(this._resultsEmploymentdStore[this._filterGraphicsCount], function(employmentStuff){
                    // console.log(employmentStuff);
                    // console.log(employmentStuff["Employment Indicator"]);
                    // if(parcelStuff["Employment Indicator"] != "All Sectors") {
                    return {"y": employmentStuff["Establishments"], "text": employmentStuff["Employment Indicator"]};
                    // };
                });

                var pieStoreSeriesEmployee = new StoreSeries(this._resultsEmploymentdStore[this._filterGraphicsCount], function(employeeStuff){
                    // console.log(employeeStuff);
                    //  console.log(employeeStuff["Employment Indicator"]);
                    // if(parcelStuff["Employment Indicator"] != "All Sectors") {
                    return {"y": employeeStuff["Employees"], "text": employeeStuff["Employment Indicator"]};
                    // };
                });


                var bubbleStoreSeriesEmployee = new StoreSeries(this._resultsEmploymentdStore[this._filterGraphicsCount].sort("Percent Employees",true), function(employeeStuff){

                    var Text = "<b>"+employeeStuff["Employment Indicator"] +"</b><br /> \
                <table> \
                <tr><td>Establishments</td><td>&nbsp;&nbsp;"+ employeeStuff["Percent Establishments"] +"%&nbsp;&nbsp;&nbsp;</td></tr>\
                <tr><td>Employees</td><td>&nbsp;&nbsp;"+ employeeStuff["Percent Employees"] +"%&nbsp;&nbsp;&nbsp;</td></tr>\
                </table>";

                    //var Text = ": <br /><br />Establishments "+employeeStuff["Percent Establishments"]+ "% <br /> "+" Employees "+employeeStuff["Percent Employees"]+ "%  ";
                    return {"size": employeeStuff["Percent Employees"],"y": employeeStuff["Percent Employees"],"x": employeeStuff["Percent Establishments"], "text": Text, "textID": employeeStuff["Employment Indicator"]};

                });

                pieChart.addSeries("Industry Sectors",pieStoreSeries);
                pieChartEmployees.addSeries("Industry Sectors",pieStoreSeriesEmployee);

                bubbleChartEmployment.addAxis("x",{"title":"Percent Establishments","titleOrientation":"away"});
                bubbleChartEmployment.addAxis("y", {vertical: true, fixLower: "major", fixUpper: "major","title":"Percent Employees","titleOrientation":"away"});

                bubbleChartEmployment.addSeries("Industry Sectors",bubbleStoreSeriesEmployee);

                var tip = new Tooltip(pieChart, "default");
                var tip2 = new Tooltip(pieChartEmployees, "default");
                var tip3 = new Tooltip(bubbleChartEmployment, "default");
                // Create the magnifier
                var mag = new MoveSlice(pieChart,"default");
                var mag2 = new MoveSlice(pieChartEmployees,"default");


                // Render the chart!
                pieChart.render();
                pieChartEmployees.render();
                var legend = new Legend({ chart: pieChart,horizontal:2 }, chartingPieLegendNode);
                bubbleChartEmployment.render();

            },
            _createHHIncomePieChart:function(HHIncome_Grid_MainRight){


//Establishments
//Employees
                //create main charting div
                var HHIncome_Charts_Main = domConstruct.create("div",{"class":"chartsMain" },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");
                var hHBelowPovertyLevel = this._resultsHHIncomedStore[this._filterGraphicsCount].data[0].HouseholdsBelowPoverty_sum;
                var totalHH = this._resultsHHIncomedStore[this._filterGraphicsCount].data[0].Households_Estimate_Total_sum;
                var percentBelowPoverty = 100*(hHBelowPovertyLevel/totalHH);
                var percentAbovePoverty = 100*((totalHH-hHBelowPovertyLevel)/totalHH);

                //create divs for each of the different charts.
                var HHIncome_PercentPovertyPie = domConstruct.create("div",{"class":"chartsSubHHIncomePercentPoverty" },HHIncome_Grid_MainRight,"last");
                var chartingPieNodeTitle = domConstruct.create("div",{ "innerHTML":"Households below the poverty level.","class":"pieChartTitle_Poverty" },HHIncome_PercentPovertyPie,"last");
                var chartingPieNode = domConstruct.create("div",{ id:"chartsDivSelectionHHIncome_"+this._filterGraphicsCount,"class":"filterCharts_HHIncomePoverty" },HHIncome_PercentPovertyPie,"last");
                var chartingPieLegendNodeContainer = domConstruct.create("div",{ id:"chartsLegendDivSelectionHHIncome_"+this._filterGraphicsCount,"class":"filterLegendCharts_HHIncomePovertyContainer" },HHIncome_PercentPovertyPie,"last");
                var chartingPieLegendNode = domConstruct.create("div",{ id:"chartsLegendDivSelectionHHIncome_"+this._filterGraphicsCount,"class":"filterLegendCharts_HHIncomePoverty" },chartingPieLegendNodeContainer,"last");

                //Charting the results...

                // Create the chart within it's "holding" node
                var pieChart = new Chart(chartingPieNode);

                // Set the theme
                pieChart.setTheme(theme);

                // Add the only/default plot
                pieChart.addPlot("default", {
                    type: PiePlot, // our plot2d/Pie module reference as type value
                    radius: 65,
                    fontColor: "black",
                    labels: false,
                    ticks: true,
                    fixed: false,
                    precision: 1,
                    labelOffset: 0,
                    labelStyle: "columns",      // default/columns/rows/auto
                    htmlLabels: true,            // use HTML to draw labels
                    stroke: {color: "black", width: 1}
                });


                var chartData = [
                    { x: "1", y: percentBelowPoverty, text:"Below poverty.",fill:"#FF7F50" },
                    { x: "1", y: percentAbovePoverty,text:"Above poverty.",fill:"#6B8E23" }
                ];

                pieChart.addSeries("Poverty Level",chartData);
                var tip = new Tooltip(pieChart, "default");

                // Create the magnifier
                var mag = new MoveSlice(pieChart,"default");
                // Render the chart!
                pieChart.render();
                var legend = new Legend({ chart: pieChart,horizontal:true }, chartingPieLegendNode);



//add bar charts
                var medianHHIncome = this._createGoodIntegerFormat(this._resultsHHIncomedStore[this._filterGraphicsCount].data[0].Median_HHI_Weight_sum/this._resultsHHIncomedStore[this._filterGraphicsCount].data[0].Households_Estimate_Total_sum);

                var HHIncome_PercentPovertyBar = domConstruct.create("div",{"class":"chartsSubHHIncomePercentPovertyBar" },HHIncome_Charts_Main,"last");
                var chartingPieNodeTitle = domConstruct.create("div",{ "innerHTML":"<br />Percent Poverty by Region.","class":"pieChartTitle_Poverty" },HHIncome_PercentPovertyBar,"last");
                var chartingBarNodePoverty = domConstruct.create("div",{ id:"barChartsPovertyDivSelectionHHIncome_"+this._filterGraphicsCount,"class":"filterChartsHHIncomeBar" },chartingPieNodeTitle,"last");
                this._createHHIncomeBarChart(chartingBarNodePoverty,this._createGoodPercentFormat(percentBelowPoverty),this._MSAIndicators.Households_PercentBelowPoverty,this._USIndicators.Households_PercentBelowPoverty);

                var HHIncome_MedianHHIBar = domConstruct.create("div",{"class":"chartsSubHHIncomePercentPovertyBar" },HHIncome_Charts_Main,"last");
                var chartingPieNodeTitle = domConstruct.create("div",{ "innerHTML":"<br />Median Household Income by Region.","class":"pieChartTitle_Poverty" },HHIncome_MedianHHIBar,"last");
                var chartingBarNodeIncome = domConstruct.create("div",{ id:"barChartsIncomeDivSelectionHHIncome_"+this._filterGraphicsCount,"class":"filterChartsHHIncomeBar" },HHIncome_MedianHHIBar,"last");
                this._createHHIncomeBarChart(chartingBarNodeIncome,medianHHIncome,this._MSAIndicators.Households_MedianIncome,this._USIndicators.Households_MedianIncome);









            },
            _createHHIncomeBarChart:function(node,studyAreaValue,MSAValue,USValue){

                //bar chart stuff ***************************************************
                //var c = new dojox.charting.Chart2D(chartingBarNodePoverty);
                var c = new Chart(node);
                c.addPlot("default", {
                    type: "Columns",
                    tension: 3,
                    gap: 10
                });
                c.addAxis("x", {
                    labels: [{
                        value: 1,
                        text: "Study Area"
                    }, {
                        value: 2,
                        text: "Richmond MSA"
                    }, {
                        value: 3,
                        text: "US"
                    }],
                    fixLower: "major",
                    fixUpper: "major"
                });
                c.addAxis("y", {
                    vertical: true,
                    fixLower: "major",
                    fixUpper: "major",
                    min: 0
                });
                c.setTheme(theme);

                c.addSeries("Study Area", [{
                    y: studyAreaValue,
                    x: 1,
                    tooltip: studyAreaValue,
                    text: "Study Area",
                    stroke: {
                        color: "black",
                        width: 2
                    },
                    fill: "#FFA500"
                }, ]);

                c.addSeries("MSA", [{
                    y: MSAValue,//this._MSAIndicators.Households_PercentBelowPoverty,
                    x: 2,
                    tooltip: MSAValue,//this._MSAIndicators.Households_PercentBelowPoverty,
                    text: "Richmond MSA",
                    stroke: {
                        color: "black",
                        width: 2
                    },
                    fill: "#BDB76B"
                }, ]);


                c.addSeries("US", [{
                    y: USValue,//this._USIndicators.Households_PercentBelowPoverty,
                    x: 3,
                    tooltip: USValue,//this._USIndicators.Households_PercentBelowPoverty,
                    text: "US",
                    stroke: {
                        color: "black",
                        width: 2
                    },
                    fill: "#DB7093"
                }, ]);


                var a1 = new Tooltip(c, "default");
                var a2 = new Highlight(c, "default");
                c.render();
            },
            _createSearch: function () {

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

                // var sources = s.get("sources");

                //Push the sources used to search, by default the ArcGIS Online World geocoder is included. In addition there is a feature layer of US congressional districts. The districts search is set up to find the "DISTRICTID". Also, a feature layer of senator information is set up to find based on the senator name.

                /*  sources.push({
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
                 });*/



                //Set the sources above to the search widget
                //s.set("sources", sources);

                s.startup();

                s.on("select-result",lang.hitch(this,function(evt){

                    var addressPoint = evt.result.feature.geometry;
                    this._bufferPoint(addressPoint,this._bufferToolDistance);
                }));

            },
            _createResultsTabs: function(){
                var that = this;
                var dialogContainerNode = domConstruct.toDom("<div></div>");
                var dialogTextNode = domConstruct.toDom("<div>Set the name of your Study Area in the Results Tab.</div>");
                var dialogGoBackTextNode = domConstruct.toDom("<div><br/>To add another area go back to the Map Tab.</div>");
                var dialogButtonsNode = domConstruct.toDom("<div></div>");
                var dialogInputNode = domConstruct.toDom("<input id=\"titleInput\" value=\""+"Geography "+this._filterGraphicsCount+"\"></input>");

                dialogContainerNode.appendChild(dialogTextNode);
                dialogContainerNode.appendChild(dialogInputNode);
                dialogContainerNode.appendChild(dialogButtonsNode);
                dialogContainerNode.appendChild(dialogGoBackTextNode);


                var myDialog = new Dialog({
                    title:"Study Area Name",
                    content:dialogContainerNode,
                    closable:true
                });

                var closeMyDialog = function(){

                    that._resultTabs["result_"+that._filterGraphicsCount].set("title", dialogInputNode.value);
                    myDialog.hide();
                };

                var OKButton = new Button({
                    label: "OK",
                    onClick: closeMyDialog
                });
                dialogButtonsNode.appendChild(OKButton.domNode);
                OKButton.startup();

                myDialog.show();

                var localCount = this._filterGraphicsCount;

                this._resultTabs["result_"+this._filterGraphicsCount] = new ContentPane({
                    //title: "Geography "+this._filterGraphicsCount
                    title: dialogInputNode.innerHTML,
                    class:"resultTab"
                });
                //relates the tab back to the filter count.


                this._resultsTabToGraphicCountHash[this._resultTabs["result_"+this._filterGraphicsCount].id ] = localCount;

                var resultsLocalTabReference = this._resultTabs["result_"+this._filterGraphicsCount];


                this._resultsTabContainer.addChild(this._resultTabs["result_"+this._filterGraphicsCount]);
                //show the tab right after it is created. Make the charts fill out the space correctly.
                this._resultsTabContainer.selectChild(this._resultTabs["result_"+this._filterGraphicsCount]);



                resultsLocalTabReference.startup();
                var thisDomNode = resultsLocalTabReference.controlButton.domNode;
                console.log(thisDomNode);
                domStyle.set(thisDomNode,{
                    "background":that._activeColor,
                    "color":"white"
            });
                //domStyle.set(thisDomNode,"background","none");





                return resultsLocalTabReference;
            },
            _scrollIntoView:function(){
                win.scrollIntoView("button1");
            },
            _createResultsGrids: function(data){

                var that = this;


                //***************************
                //Study Area Map Data...
                //***************************
                var studyAreaMapContainer = domConstruct.create("div",{"id":"studyAreaMap"+this._filterGraphicsCount,"class":"studyAreaMap" },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");
                this._studyAreaMaps[this._filterGraphicsCount] = new Map("studyAreaMap"+this._filterGraphicsCount, {
                    basemap: "topo",
                    center: [-77.455, 37.469],
                    zoom: 11,
                    autoResize:true,
                    fadeOnZoom:true,
                    fitExtent:true,
                    logo:false
                });



                var newSymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
                        new Color(this._activeColors[0]),
                        3
                    ), //new Color(this._colors_Alpha[this._filterGraphicsCount])
                    new Color(this._activeColors[1])
                );

                //var newGraphic =  new Graphic(this._filterGraphic, newSymbol)

                this._studyAreaMaps[this._filterGraphicsCount].on("load",function(){
                    that._studyAreaMaps[that._filterGraphicsCount].graphics.add(new Graphic(that._filterGraphic, newSymbol));
                    that._studyAreaMaps[that._filterGraphicsCount].setExtent(that._filterGraphic.getExtent(),true);
                });

                //this._studyAreaMaps[this._filterGraphicsCount].graphics.add(new Graphic(this._filterGraphic, newSymbol));


                //***************************
                //Household Income
                //***************************
                var HHIncome_Grid_Main = domConstruct.create("div",{"id":"HHIncomeMainContainer"+this._filterGraphicsCount,"class":"HHIncomeGridDiv" },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");
                // var resultsInternalNav = domConstruct.create("div",{"class":"internalNav","innerHTML":"<span><b>Quick Navigation:</b> </span><span class=\"internalNavItem\">Household Income - </span><span class=\"internalNavItem\">Employment - </span><span class=\"internalNavItem\">Parcel Data</span>" },HHIncome_Grid_Main,"last");
                // query(".internalNavItem").on("click", this._scrollIntoView);
                var HHIncome_Grid_MainLeft = domConstruct.create("div",{"class":"HHIncomeGridLeftDiv" },HHIncome_Grid_Main,"last");
                var HHIncome_Grid_MainRight = domConstruct.create("div",{"class":"HHIncomeGridRightDiv" },HHIncome_Grid_Main,"last");
                var gridParcelNodeTitle = domConstruct.create("div",{"innerHTML":"<div class=\"filterTableHeader\">Household Income Data</div>" },HHIncome_Grid_MainLeft,"last");
                var gridHHIncomeNode = domConstruct.create("div",{id:"resultsHHIncomeDivSelection_"+this._filterGraphicsCount,"class":"filterHHIncomResults" },HHIncome_Grid_MainLeft,"last");




                data[1][0]["Location"] = "Geography "+ this._filterGraphicsCount;
                // var newhHIncomeData = data[1].concat(this._hHIncomeExtraData);
                this._resultsHHIncomedStore[this._filterGraphicsCount] = new Memory({data:data[1], idProperty: 'id'});

                var localHHIncomeDataGridColumns = lang.clone(this._hHIncomeDataGridColumns);
                this._resultsHHIncomeGrid[this._filterGraphicsCount] = new (declare([ OnDemandGrid]))({
                    collection: this._resultsHHIncomedStore[this._filterGraphicsCount] ,
                    selectionMode: 'multiple',
                    allowSelectAll:true,
                    columns:  localHHIncomeDataGridColumns
                }, gridHHIncomeNode);
                this._resultsHHIncomeGrid[this._filterGraphicsCount].startup();
                var resultsHHIncomeGridLocalReference = this._resultsHHIncomeGrid[this._filterGraphicsCount];

                this._createHHIncomePieChart(HHIncome_Grid_MainRight);

                resultsHHIncomeGridLocalReference.resize();

                //***************************
                //Employment
                //***************************
                var employmentContainer = domConstruct.create("div",{"id":"employmentMainContainer"+this._filterGraphicsCount,"class":"employmentContainer"},this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");
                var gridParcelNodeTitle = domConstruct.create("div",{"innerHTML":"Employment Data","class":"filterTableHeader" },employmentContainer,"last");
                var gridEmploymentNode = domConstruct.create("div",{ id:"resultsEmploymentDivSelection_"+this._filterGraphicsCount,"class":"filterEmploymentResults" },employmentContainer,"last");




                var newDataForEmployment = [];
                var totalEstablishments = 0;
                var totalEmployees = 0;
                array.forEach(this._employmentFilters, function(item,index){
                    if(item.type == "establishments") {
                        totalEstablishments += data[2][0][item.shortFieldName + "_sum"];
                        totalEmployees += data[2][0][that._employmentFilters[index + 1].shortFieldName + "_sum"];
                    }
                });


                array.forEach(this._employmentFilters, function(item,index){
                    if(item.type == "establishments") {
                        var newObject = {
                            "Employment Indicator": item.filterDisplayName,
                            "Establishments": data[2][0][item.shortFieldName + "_sum"],
                            "Percent Establishments": parseFloat(number.format(100*(data[2][0][item.shortFieldName + "_sum"] /totalEstablishments), {places: 2,locale: "en-us"})) ,
                            "Employees": data[2][0][that._employmentFilters[index+1].shortFieldName + "_sum"],
                            "Percent Employees": parseFloat(number.format(100*(data[2][0][that._employmentFilters[index+1].shortFieldName + "_sum"] / totalEmployees), {places: 2,locale: "en-us"}))
                        };
                        newDataForEmployment.push(newObject);
                    }
                });




                //this._parcelDataGridColumns["VMP_P1_V12"] = {"label":"Land Use"};
                var newColumnsForEmployment = {"Employment Indicator":{"label":" Industry Sectors"},"Establishments":{"label":"Establishments","renderCell":this._addComma},"Percent Establishments":{"label":"Percent Establishments"},"Employees":{"label":"Employees","renderCell":this._addComma},"Percent Employees":{"label":"Percent Employees"}};

                //this._resultsEmploymentdStore[this._filterGraphicsCount] = new Memory({data:data[2], idProperty: 'id'});
                //var localEmploymentDataGridColumns = lang.clone(this._employmentDataGridColumns);
                this._resultsEmploymentdStore[this._filterGraphicsCount] = new Memory({data:newDataForEmployment, idProperty: 'id'});
                var localEmploymentDataGridColumns = lang.clone(newColumnsForEmployment);
                this._resultsEmploymentGrid[this._filterGraphicsCount] = new (declare([ OnDemandGrid, ColumnHider ]))({
                    collection: this._resultsEmploymentdStore[this._filterGraphicsCount] ,
                    selectionMode: 'multiple',
                    allowSelectAll:true,
                    columns:  localEmploymentDataGridColumns
                }, gridEmploymentNode);
                this._resultsEmploymentGrid[this._filterGraphicsCount].startup();

                var resultsGridLocalReference = this._resultsEmploymentGrid[this._filterGraphicsCount];

                this._createEmploymentPieChart(employmentContainer);

                //***************************
                //Parcel Results
                //***************************


                var gridParcelNodeTitle = domConstruct.create("div",{"id":"parcelMainContainer"+this._filterGraphicsCount,"innerHTML":"<span class=\"filterTableHeader\">Parcel Data</span>" },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");
                var gridParcelNode = domConstruct.create("div",{ id:"resultsParcelDivSelection_"+this._filterGraphicsCount,"class":"filterParcelResults" },this._resultTabs["result_"+this._filterGraphicsCount].domNode,"last");

                this._resultsParceldStore[this._filterGraphicsCount] = new Memory({data:data[0], idProperty: 'id'});
                var localParcelDataGridColumns = lang.clone(this._parcelDataGridColumns);
                this._resultsParcelGrid[this._filterGraphicsCount] = new (declare([ OnDemandGrid, ColumnHider ]))({
                    collection: this._resultsParceldStore[this._filterGraphicsCount] ,
                    selectionMode: 'multiple',
                    allowSelectAll:true,
                    columns:  localParcelDataGridColumns
                }, gridParcelNode);
                this._resultsParcelGrid[this._filterGraphicsCount].startup();

                this._resultsParcelGrid[this._filterGraphicsCount].on("dgrid-columnstatechange", lang.hitch(this, function (event) {
                    if(event.hidden) {
                        this._destroyParcelBarChart(event.column.field, this._activeResultsSection);
                    }else {
                        this._createParcelBarChart(event.column.field, this._activeResultsSection);
                    }
                }));
                var resultsParcelGridLocalReference = this._resultsParcelGrid[this._filterGraphicsCount];



                return [resultsParcelGridLocalReference,resultsHHIncomeGridLocalReference,resultsGridLocalReference];
            },
            _destroyParcelBarChart:function(variableName,filterGraphicsCount){
                array.forEach(this._tearDownReferences[variableName+"_"+filterGraphicsCount], function (item, i) {

                    domConstruct.destroy(item.id);

                });

            },
            _createInitialCharts:function(){
                var that = this;
                //make charts for all of the variables....we will sort this out later..
                array.forEach( this._parcelFilters, function (itemFilters, iFilters) {
                    if(itemFilters.doNotDisplayAtAll == false) {
                        switch (itemFilters.filterType) {
                            case "range":
                                array.forEach(that._parcelStatTypes, function (itemTypes, iType) {

                                    if (!that._parcelStatTypesColumn_Hidden[itemTypes]) {
                                        var varName = itemFilters.fieldName + "_" + itemTypes;
                                        that._createParcelBarChart(varName, that._filterGraphicsCount);
                                    }
                                });
                                break;
                            case "choices":
                                that._createParcelPieChart(itemFilters.fieldName);
                                break;
                            default:

                        }
                    }
                });
            },
            /*Destroy methods*/


            /*Handle things*/



            _handleMapSelectionDropDownChange: function(selectionType) {

                switch(selectionType) {
                    case "polygon":
                        this._map.enableDoubleClickZoom();
                        this._isSelectingCounties = false;
                        //domStyle.set(this._commitLocalitySelectionButton.domNode, 'display', 'none');
                        //domStyle.set(this._cancelLocalitySelectionButton.domNode, 'display', 'none');
                        domStyle.set(this._polygonDrawButton.domNode, 'display', 'inline');
                        domStyle.set(this._bufferDistanceContainer, 'display', 'none');
                        this._localityFeatureLayer.hide();
                        this._toggleCustomToolTip(false,"");

                        this._toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
                        this._map.hideZoomSlider();

                        break;
                    case "buffer":
                        this._map.enableDoubleClickZoom();
                        this._toolbar.deactivate();
                        this._isSelectingCounties = false;
                        domStyle.set(this._polygonDrawButton.domNode, 'display', 'none');
                        //domStyle.set(this._commitLocalitySelectionButton.domNode, 'display', 'none');
                       // domStyle.set(this._cancelLocalitySelectionButton.domNode, 'display', 'none');
                        domStyle.set(this._bufferDistanceContainer, 'display', 'inline');
                        this._localityFeatureLayer.hide();
                        this._toggleCustomToolTip(true,"Click on the map to create a "+this._bufferToolDistance+" mile buffer study area.");
                       // this._moveFilters();
                        break;
                    case "county":
                        this._map.disableDoubleClickZoom();
                        this._toolbar.deactivate();
                        this._isSelectingCounties = true;
                        this._localityFeatureLayer.show();
                        domStyle.set(this._polygonDrawButton.domNode, 'display', 'none');
                        domStyle.set(this._bufferDistanceContainer, 'display', 'none');
                       // domStyle.set(this._commitLocalitySelectionButton.domNode, 'display', 'inline');
                       // domStyle.set(this._cancelLocalitySelectionButton.domNode, 'display', 'inline');
                        this._toggleCustomToolTip(true,"Click on counties to select or deselect. Double click to finish.");
                        this._map.setExtent(this._localityFeatureLayer.fullExtent,true);
                       // this._moveFilters();
                        break;
                    default:
                        this._map.enableDoubleClickZoom();
                        domStyle.set(this._polygonDrawButton.domNode, 'display', 'none');
                        domStyle.set(this._bufferDistanceContainer, 'display', 'none');
                       // domStyle.set(this._commitLocalitySelectionButton.domNode, 'display', 'none');
                       // domStyle.set(this._cancelLocalitySelectionButton.domNode, 'display', 'none');
                        this._localityFeatureLayer.hide();
                }

            },

            _handleCountySelection:function(id){

                if(array.indexOf(this._localitiesPreCommitIDs,id) >= 0 ) {
                    //already exists, remove from selection.

                    this._localitiesPreCommitIDs.splice(array.indexOf(this._localitiesPreCommitIDs,id), 1);
                } else {
                    //add to selection.

                    this._localitiesPreCommitIDs.push(id)
                }
                var localitiesIDString = this._localitiesPreCommitIDs.join();

                if(this._localitiesPreCommitIDs.length == 0){
                    this._handleCountySelectionClear();
                } else {
                    this._selectLocalities(localitiesIDString);


                }
            },
            _handleCountySelectionClear:function(){
                this._localityFeatureLayer.clearSelection();
            },
            _selectLocalities:function(localitiesIDString){
                var that = this;
                var selectQuery = new Query();
                selectQuery.where = "OBJECTID IN ("+localitiesIDString+")";
                this._localityFeatureLayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW,function(results){
                    that._localitiesPreCommitGraphics = results;

                    if(that._selectingCountiesDoubleClick){
                        that._handleCountyCommit();
                    }
                });
            },
            _handleCountyCommit:function(){
                console.log("Starting county commit...");
                console.log(this._localitiesPreCommitGraphics.length);
                if(this._localitiesPreCommitGraphics.length > 0) {
                    var unionArray = array.map(this._localitiesPreCommitGraphics, function (item) {
                        return item.geometry;
                    });
                    var union = geometryEngine.union(unionArray);
                    this._performQueryTasks(union,"polygon");

                } else {
                    alert("You need to select at least on locality to proceed.");
                }
                this._selectingCountiesDoubleClick = false;
                this._handleCountySelectionClear();

            },
            _handleAboutClick:function(){

                if(!this._aboutDialog){

                    this._aboutDialog = new Dialog({
                        title: "About CURA MetroView Website",
                        "class":"helpDialog",
                        //content: "Test content.",
                        style: "width: 500px",
                        href:"about.html"
                    });
                }
                this._aboutDialog.show();
            },
            _handleHelpClick:function(){

                if(!this._helpDialog){

                    this._helpDialog = new Dialog({
                        title: "Using the CURA MetroView Website",
                        "class":"helpDialog",
                        //content: "Test content.",
                        style: "width: 500px",
                        href:"help.html"
                    });
                }
                this._helpDialog.show();
            },
            _handleSliderChange: function () {

                var valueOnSlider = this._verticalSlider.get("value") * 1000;
                this._handleFilterChange("VMP_P1_V4",valueOnSlider, "bottom");
            },
            _handleFilterChange: function (variableName, value, operator) {

                var that = this;
                var operatorValue = {"top":"<=","bottom":">=","equals":"=","IN":"IN"};
                if(value.length >0) {
                    this._filterWhereClauses[variableName + "_" + operator] = variableName + " " + operatorValue[operator] + " " + value;
                } else {
                    this._filterWhereClauses[variableName + "_" + operator] = "";
                }

                //assemble all the clauses together into one grand string.
                var whereClause = "";
                for (var property in this._filterWhereClauses) {
                    if (that._filterWhereClauses.hasOwnProperty(property)) {
                        //check to see if that variable is being used. If 'value' is empty skip.

                        if(that._filterWhereClauses[property].length > 0) {
                            whereClause += " AND " + that._filterWhereClauses[property];
                        }
                    }
                }
                this._parcelWhereClause = whereClause.substring(4);
                var layerDefinitions = [];
                layerDefinitions[0] = this._parcelWhereClause;
                this._parcelDynamicMapServiceLayer.setLayerDefinitions(layerDefinitions);

            },
            _handleGridSelection:function(event,filterObject){

                // Iterate through all currently-selected items
                var queryString = "";
                var submitqueryString = "";
                for(var id in this._parcelPropertyTypesGrid.selection){
                    if(this._parcelPropertyTypesGrid.selection[id]){
                        //Single Family Large Lot
                        if(this._parcelFilters[0].filterOptions[id].propertyType == "Single Family Large Lot"){
                            queryString += ",\'SFLL\'"
                        }else{
                            queryString += ",\'"+this._parcelFilters[0].filterOptions[id].propertyType+"\'"
                        }
                    }
                }
                if(queryString.length > 0) {
                    submitqueryString = "(" + queryString.substring(1) + ")";
                }
                this._handleFilterChange(filterObject.fieldName,submitqueryString,"IN");
            },

            _handleResultsTabShow:function(resultsLocalTabReference,resultsParcelGridLocalReference,resultsHHIncomeGridLocalReference,resultsEmploymentGridLocalReference){

                on(resultsLocalTabReference , "show", lang.hitch(this,function (event) {
                    this._activeResultsSection = this._resultsTabToGraphicCountHash[resultsLocalTabReference.id];
                    resultsParcelGridLocalReference.resize();
                    resultsHHIncomeGridLocalReference.resize();
                    resultsEmploymentGridLocalReference.resize();
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
            _addComma2:function(object, data, td, options) {
                var formatted = number.format(data, {
                    places: 2,
                    locale: "en-us"
                });
                var div = document.createElement("div");
                div.className = "renderedCell";
                div.innerHTML = formatted;
                return div;

            },
            _addGraphicsToMap:function(graphic){
                this._map.graphics.add(graphic);

            },
            _showActiveGraphic:function(){},


            _initTools: function (evtObj) {
                this._toolbar = new Draw(evtObj.map);
                this._toolbar.on("draw-end", lang.hitch(this,this._handlePolygonDrawEnd));
                this._createTransparencySlider();
                this._createCustomMapTooltip();
                // update the tooltip as the mouse moves over the map
                this._map.on("mouse-move", lang.hitch(this, this._handleMapMouseMove));
                this._map.on("mouse-out", lang.hitch(this, this._handleMapMouseOut));


                this._hideLoading();

                //                    center: [-77.455, 37.469],
//                    zoom: 11,
                this._map.centerAndZoom([-77.455, 37.469],11);
            },


            _calculatePercentHHBelowPoverty:function(object, data, td, options){



                /*            {
                 Population_Estimate_Total_sum: 48542,
                 Households_Estimate_Total_sum: 17025,
                 Median_HHI_Weight_sum: 623115723,
                 HouseholdsBelowPoverty_sum: 4312,
                 Households_MedianIncome_sum: 1306444
                 }*/
                var formatted = number.format(100*(object.HouseholdsBelowPoverty_sum/object.Households_Estimate_Total_sum), {
                        places: 2,
                        locale: "en-us"
                    })+"%";
                var div = document.createElement("div");
                div.className = "renderedCell";
                div.innerHTML = formatted;
                return div;
            },
            _calculateMedianHHIncome:function(object, data, td, options){



                /*            {
                 Population_Estimate_Total_sum: 48542,
                 Households_Estimate_Total_sum: 17025,
                 Median_HHI_Weight_sum: 623115723,
                 HouseholdsBelowPoverty_sum: 4312,
                 Households_MedianIncome_sum: 1306444
                 }*/
                var formatted ="$"+ number.format(object.Median_HHI_Weight_sum/object.Households_Estimate_Total_sum, {
                        places: 0,
                        locale: "en-us"
                    });
                var div = document.createElement("div");
                div.className = "renderedCell";
                div.innerHTML = formatted;
                return div;
            },
            _constructionYearCalc:function(object, data, td, options){
                var formatted = number.format((object.VMP_P1_V3_avg), {
                    places: 0,
                    fractional:false,
                    pattern: "0000"

                });
                var div = document.createElement("div");
                div.className = "renderedCell";
                div.innerHTML = formatted;
                return div;
            },
            _landValueCalc:function(object, data, td, options){
                var formatted = number.format((object.VMP_P1_V4_avg), {
                    places: 2,
                    locale: "en-us"
                });
                var div = document.createElement("div");
                div.className = "renderedCell";
                div.innerHTML = formatted;
                return div;
            },
            _buildingImprovementsValueCalc:function(object, data, td, options){
                var formatted = number.format((object.VMP_P1_V5_avg), {
                    places: 2,
                    locale: "en-us"
                });
                var div = document.createElement("div");
                div.className = "renderedCell";
                div.innerHTML = formatted;
                return div;

            },
            _roundCell:function(object, data, td, options   ){

                var formatted = Math.round(data);
                var div = document.createElement("div");
                div.className = "renderedCell";
                div.innerHTML = formatted;
                return div;
            },
            _bufferPoint:function(point,distance){

                var newRandomColors = this._generateColor();



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
                //this._map.graphics.add(graphic);
                this._addGraphicsToMap(graphic);
                //this._performQueryTasks(circle.getExtent(),"polygon");
                this._performQueryTasks(circle,"polygon");

            },

            _performQueryTasks: function (geometry, geometryType) {
                this._showLoading();
                var that = this;
                this._filterGraphicsCount++;

                this._filterGraphic = geometry;


                var query = new Query();
                var query_HHIncome = new Query();
                var query_Employment = new Query();


                //parcel data.
                query.geometry = geometry;

                query.returnGeometry = false;
                query.outStatistics = that._parcelStatisticsDefinition;


                query.groupByFieldsForStatistics = that._parcelGroupByFields;
                query.where = that._parcelWhereClause;
                var parcelDeferred = that._queryTask.execute(query);//, lang.hitch(that, "_selectFromService"));

                //need to set up a set of ordered defers here
                //HHIncome data.
                query_HHIncome.geometry = geometry;
                query_HHIncome.returnGeometry = false;
                query_HHIncome.outStatistics = that._hHIncomeStatisticsDefinition;
                // query_HHIncome.groupByFieldsForStatistics = that._hHIncomeGroupByFields;
                var HHIncomeDeferred = that._queryTaskHHIncome.execute(query_HHIncome);//, lang.hitch(that, "_selectFromServiceTest"));

                //Employment data.
                query_Employment.geometry = geometry;
                query_Employment.returnGeometry = false;
                query_Employment.outStatistics = that._employmentStatisticsDefinition;
                query_Employment.groupByFieldsForStatistics = that._employmentGroupByFields;
                var employmentDeferred = that._queryTaskEmployment.execute(query_Employment);//, lang.hitch(that, "_selectFromServiceTest"));

                var dl = new DeferredList([parcelDeferred, HHIncomeDeferred,employmentDeferred]);

                dl.then(lang.hitch(that,function(result){
                    this._selectFromService(result);
                }));


                this._map.setExtent(geometry.getExtent(),true);
            },
            _handlePolygonDrawEnd: function (evtObj) {

                var geometry = evtObj.geometry;
                var newRandomColors = this._generateColor();
                /*After user draws shape on map using the draw toolbar compute the zonal*/
                this._map.showZoomSlider();
                //this._map.graphics.clear();

                var symbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color(newRandomColors[0]), 2),
                    new Color([0, 0, 255, 0.5]));


                //var symbol = new SimpleFillSymbol("none", new SimpleLineSymbol("dashdot", new Color(newRandomColors[0]), 2), new Color(newRandomColors[1]));
                var graphic = new Graphic(geometry, symbol);

                //this._map.graphics.add(graphic);
                this._addGraphicsToMap(graphic);
                this._toolbar.deactivate();

                //var query = new Query();
                //query.geometry = geometry;

                this._performQueryTasks(geometry,"polygon");
            },
            _selectFromService: function (response) {

                var LandValueAverageArray = array.map(response[0][1].features, function(item,index){


                    item.attributes.VMP_P1_V3_avg = Math.round(item.attributes.VMP_P1_V3_sum / item.attributes.VMP_P1_V3_NotNull_sum);
                    item.attributes.VMP_P1_V4_avg = item.attributes.VMP_P1_V4_sum / item.attributes.VMP_P1_V4_NotNull_sum;
                    item.attributes.VMP_P1_V5_avg = item.attributes.VMP_P1_V5_sum / item.attributes.VMP_P1_V5_NotNull_sum;

                    /*VMP_P1_V3_NotNull_avg
                     VMP_P1_V3_NotNull_sum
                     VMP_P1_V3_avg
                     VMP_P1_V3_sum
                     VMP_P1_V4_NotNull_avg
                     VMP_P1_V4_NotNull_sum
                     VMP_P1_V4_avg
                     VMP_P1_V4_sum
                     VMP_P1_V5_NotNull_avg
                     VMP_P1_V5_NotNull_sum
                     VMP_P1_V5_avg
                     VMP_P1_V5_sum
                     VMP_P1_V6_avg
                     VMP_P1_V6_sum
                     VMP_P1_V7_avg
                     VMP_P1_V7_sum*/


                    return item.attributes;
                });

                var hHIncomeArray = array.map(response[1][1].features, function(item,index){


                    return item.attributes;
                });

                var employmentArray = array.map(response[2][1].features, function(item,index){


                    return item.attributes;
                });

                //need to create the arrays for the other two resonses

                this._updateResults([LandValueAverageArray,hHIncomeArray,employmentArray]);

                this._hideLoading();
            },
            _updateResults:function(data){

                this._activeResultsSection = this._filterGraphicsCount;
                var resultsLocalTabReference = this._createResultsTabs();
                var _createResultsGridsArray = this._createResultsGrids(data);
                var resultsParcelGridLocalReference = _createResultsGridsArray[0];
                var resultsHHIncomeGridLocalReference = _createResultsGridsArray[1];
                var resultsEmploymentGridLocalReference = _createResultsGridsArray[2];
                this._handleResultsTabShow(resultsLocalTabReference,resultsParcelGridLocalReference,resultsHHIncomeGridLocalReference,resultsEmploymentGridLocalReference);
                this._createInitialCharts();

            },
            _getSelectorIDs: function (features) {

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
                this._activeColors = colors;
                return colors;
            },
            _createGoodPercentFormat:function(numberToFormat){
                return parseFloat(number.format(numberToFormat, {places: 2,locale: "en-us"}));
            },
            _createGoodIntegerFormat:function(numberToFormat){


                return parseFloat((number.format(numberToFormat, {places: 2,locale: "en-us"})).replace(",",""));
                //return number.format(numberToFormat, {places: 2,locale: "en-us"});
            },


            //TUtorial Stuff
            _startUpTutorial:function(){
                var that = this;
                var dialogContainerNode = domConstruct.toDom("<div></div>");
                var dialogTextNode = domConstruct.toDom("<div>Some Text for the User. Like Hello User!!</div>");
                var dialogButtonsNode = domConstruct.toDom("<div></div>");
                var nodeList = [this._filtersNodeID,'mapTitlePane','resultsTitlePane','popupLocation3'];
                var textList = ['Tutorial 1','Tutorial 2','Tutorial 3','Tutorial 4'];


                dialogContainerNode.appendChild(dialogTextNode);
                dialogContainerNode.appendChild(dialogButtonsNode);

                var myDialog = new TooltipDialog({
                    content:dialogContainerNode,
                    closable:true
                });


                var dialog = new Dialog({
                    title: "MetroView Tutorial",
                    // Create Dialog content
                    //content: "Would you like to take the tutorial?" + "<br />If not, close this window and you can simply click on the map to get started.<br /><br /><div id=\"startTutorial\"></div>&nbsp;&nbsp;<div id=\"cancelTutorial\"></div>"
                    content:"<h2>Welcome to MetroView.</h2>" +
                    "<p>To get started you can simply click on the map to create a two mile buffer and get the resulting data.</p>" +
                    "<p>The results will be displayed below the map</p>" +
                    "<p>You can add more study areas simply by clicking on the map in different places</p>" +
                    "<p> To customize your study area use the Map Selection Tools in the left pane.</p>" +
                    "<p>Some other options to customize your study are include:" +
                    "<ul>" +
                    "<li>Drawing a freehand polygon - of any area you like.</li>" +
                    "<li>Selecting by Counties.</li>" +
                    "<li>Searching by Address.</li>" +
                    "</ul>" +
                    "<p>You may also filter the Parcel Map and Results data </p>" +
                    "</p><p>Thanks for using MetroView.</p>     "
                });
                var closeTutorial = function(){
                    dialog.hide();
                };



                var tutorialCloseButtonDiv = domConstruct.create("div",{"style":"float:right"},dialog.domNode);
                var closeButton = new Button({
                    label: "O.K. Got It.",
                    onClick: closeTutorial
                });

                dialog.show();

                tutorialCloseButtonDiv.appendChild(closeButton.domNode);
                closeButton.startup();

                //popup.open({
                //    popup: myDialog,
                //    x:300,
                //    y:250,
                //    style:{width: "300px"},
                //    //around: dom.byId('navbar')
                //});




                var nextTutorialPoint = function(){

                    that._tutorialCount++;
                    popup.close(myDialog);
                    html.set(dialogTextNode, textList[that._tutorialCount]);
                    popup.open({
                        popup: myDialog,
                        around: dom.byId(nodeList[that._tutorialCount])
                    });
                };

                var nextButton = new Button({
                    label: "Next",
                    onClick: nextTutorialPoint
                });
                dialogButtonsNode.appendChild(nextButton.domNode);
                nextButton.startup();

                var cancelButton = new Button({
                    label: "Quit",
                    onClick: function(){
                        popup.close(myDialog);
                    }
                });
                dialogButtonsNode.appendChild(cancelButton.domNode);
                cancelButton.startup();

            },

            //loading Overlay
            _showLoading:function(){

                var overlayNode = dom.byId("mainOverlay");
                domStyle.set(overlayNode,'display','inline');


            },
            _hideLoading:function(){

                var overlayNode = dom.byId("mainOverlay");
                domStyle.set(overlayNode,'display','none');
            },

            _moveFilters:function(){
                var amt = 650;
                if(this._filterPanelShowing){
                    amt = -1*amt;
                    this._filterPanelShowing = false;
                    dom.byId("closeFilterPanel").innerHTML = "Show Study Selection Options ";

                } else {
                    this._filterPanelShowing = true;
                    dom.byId("closeFilterPanel").innerHTML = "Close Study Selection Options ";
                }
                coreFx.slideTo({
                    node: "navTopPanelContainer",
                    top: (domGeom.getMarginBox("navTopPanelContainer").t + amt).toString(),
                    /* left: (domGeom.getMarginBox("navTopPanel").l + amt).toString(),*/
                    unit: "px"
                }).play();



                /*           on(dom.byId("slideRightButton"), "click", function(){
                 slideIt(200);
                 });
                 on(dom.byId("slideLeftButton"), "click", function(){
                 slideIt(-200);
                 });*/

            },

            _createCustomMapTooltip: function () {
                // create node for the tooltip
                var tip = "Click on the map to create a "+this._bufferToolDistance+" mile buffer study area.";
                this._customToolTip = domConstruct.create("div", { "class": "tooltip", "innerHTML": tip }, this._map.container);
                domStyle.set(this._customToolTip, "position", "fixed");
                domStyle.set(this._customToolTip, "display", "none");

            },
            _toggleCustomToolTip: function (enable, tooltipText) {
                html.set(this._customToolTip, tooltipText);
                if (enable) {
                    this._customToolTipState = "inline";
                } else {
                    this._customToolTipState = "none";
                }
            },
            _setCustomToolTipText:function(text){

                this._customToolTip.innerHTML = "You have been set sucker.";

            },
            _handleMapMouseOut: function (evt) {
                domStyle.set(this._customToolTip, "display", "none");
            },
            _handleMapMouseMove: function (evt) {

                var px, py;
                if (evt.clientX || evt.pageY) {
                    px = evt.clientX;
                    py = evt.clientY;
                } else {
                    px = evt.clientX + dojo.body().scrollLeft - dojo.body().clientLeft;
                    py = evt.clientY + dojo.body().scrollTop - dojo.body().clientTop;
                }
                domStyle.set(this._customToolTip, "display", "none");
                domStyle.set(this._customToolTip, "left", (px + 15) + "px");
                domStyle.set(this._customToolTip, "top", (py) + "px");
                domStyle.set(this._customToolTip, "display", this._customToolTipState);




            }




        };


            _metroView._init();


















});