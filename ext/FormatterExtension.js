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
        
        CardExtension.prototype.getFormatters = function() {
            return {
                deliveryStatus: this.deliveryStatus,
                billingStatus: this.billingStatus
            }
        };
    
        return CardExtension;
    }
); 