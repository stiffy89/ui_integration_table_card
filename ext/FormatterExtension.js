sap.ui.define([
    "sap/ui/integration/Extension"
], 
    function (Extension) {
        "use strict";
        var CardExtension = Extension.extend("ns.ui_table_card.ext.FormatterExtension");
        
        CardExtension.prototype.deliveryStatus = function (val) {
            if (val === "D"){
                return "Success"
            } else {
                return "None"
            }
        };

        CardExtension.prototype.billingStatus = function (val) {
            if (val === "P") {
                return "Success"
            } else {
                return "None"
            }
        };

        CardExtension.prototype.overallStatus = function (val) {
            if (val === "C"){
                return "Success";
            } else {
                return "Error";
            }
        }

        CardExtension.prototype.getData = function (arg) {
            console.log(arg);
            var oCard = this.getCard();

            
            return oCard.request({
                "url" : "{{destinations.ES5}}/sap/opu/odata/iwbep/GWSAMPLE_BASIC/SalesOrderSet?$top=10",
                "withCredentials": true,
                "parameters" : {
                    "$orderby" : "CreatedAt desc",
                    "$skip": arg,
                    "$top" : "10"
                }
            }).then(function(oData){
                let aDataBody = oData.d.results;
                aDataBody.forEach((element, index, array) => {
                    if (element.BillingStatus == "P" && element.DeliveryStatus == "D"){
                        element.OverallStatus = "C";
                        element.OverallStatusText = "Completed";
                    } else {
                        element.OverallStatus = "I";
                        element.OverallStatusText = "Incomplete";
                    }
                });

                return oData;
            })
        };
        
        CardExtension.prototype.getFormatters = function() {
            return {
                deliveryStatus: this.deliveryStatus,
                billingStatus: this.billingStatus,
                overallStatus: this.overallStatus,
                getData: this.getData
            }
        };
    
        return CardExtension;
    }
); 