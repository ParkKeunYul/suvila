/**
 * Inserts an extra row in the end of the exported table
 * with a message in the trial version of the Exporter 
 */
Ext.define('Ext.overrides.exporter.excel.XmlTrial', {
    override: 'Ext.exporter.excel.Xml',
    
    addTitle: function(config, colMerge) {
        this.table.addRow({
            autoFitHeight: 1,
            height: this.titleRowHeight,
            styleId: this.workbook.addStyle(Ext.applyIf({
                // we need an unique style for the trial otherwise the file will have style conflicts
                // with the one from the title
                id: 'trial-title',
                name: 'Trial Title'
            }, config.titleStyle)).getId()
        }).addCell({
            mergeAcross: colMerge - 1,
            value: 'Produced by Ext JS Trial'
        });
        
        this.callParent([config, colMerge]);
    }
});

Ext.define('Ext.overrides.exporter.excel.XlsxTrial', {
    override: 'Ext.exporter.excel.Xlsx',

    addTitle: function(config, colMerge) {
        this.worksheet.renderRow({
            height: this.titleRowHeight,
            cells: [{
                mergeAcross: colMerge - 1,
                value: 'Produced by Ext JS Trial',
                styleId: this.excel.addCellStyle(config.titleStyle)
            }]
        });

        this.callParent([config, colMerge]);
    }
});

Ext.define('Ext.overrides.exporter.text.HtmlTrial', {
    override: 'Ext.exporter.text.Html',

    applyTitle: function(title){
        return title ? 'Produced by Ext JS Trial - ' + title : title;
    }
});
