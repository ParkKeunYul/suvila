Ext.define('ExFrm.view.demo.Demo007Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo007',
    onInit:function(){
        this.getViewModel().getStore('pivotInfo').load();

    },
    onExcel:function(){
        var grid = this.lookupReference('pivotGrid');
        grid.saveDocumentAs({
            title:      'Pivot grid export demo',
            fileName:   'excelExport.xlsx',
            onlyExpandedNodes : false,
            showSummary : true,
            type : 'excel'
        });        
    }

})