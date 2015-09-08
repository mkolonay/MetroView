require(["dijit/layout/BorderContainer",//10
  "dijit/layout/ContentPane",//11
  "dijit/TitlePane",//12
  "dojo/domReady!"//13
], function (
   BorderContainer,//10
  ContentPane,//11
  TitlePane//12
) {


    var _metroView = {
        _init: function () {
            console.log("Starting Init");
            this._createUIElements();         
        },
        _createUIElements: function () {
            // create a BorderContainer as the top widget in the hierarchy
            var bc = new BorderContainer({
                style: "height: 300px;width:1000px;"
            });

            // create a ContentPane as the left pane in the BorderContainer
            var cp1 = new ContentPane({
                region: "left",
                style: "width: 300px",
                content: "hello world, I'm here. I really am."
            });
            bc.addChild(cp1);

            // create a ContentPane as the center pane in the BorderContainer
            var cp2 = new ContentPane({
                region: "center",
                content: "What is left if we have no humanity? Nothing Human."
            });
            bc.addChild(cp2);

            // put the top level widget into the document, and then call startup()
            bc.placeAt("mapTitlePane");
            bc.startup();
        }
      
    };

    _metroView._init();




});