/**
 * @private
 */
Ext.define('Ext.exporter.file.ooxml.excel.Worksheet', {
    extend: 'Ext.exporter.file.ooxml.excel.Sheet',

    requires: [
        'Ext.exporter.file.ooxml.excel.Column',
        'Ext.exporter.file.ooxml.excel.Row'
    ],

    isWorksheet: true,

    config: {
        columns: null,
        rows: [],
        drawings: null,
        tables: null,
        mergeCells: null,
        mergedCellsNo: 0,
        /**
         * The reference of the top-left cell in this worksheet
         * @readOnly
         */
        topLeftRef: null,
        /**
         * The reference of the bottom-right cell in this worksheet
         * @readOnly
         */
        bottomRightRef: null,
        cachedRows: '',
        cachedMergeCells: ''

        //comments: null,
        //pivotTables: null,
        //tableSingleCell: null
    },

    folder: 'worksheets',
    fileName: 'sheet',

    contentType: {
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml'
    },

    relationship: {
        schema: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet'
    },

    tpl: [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ',
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">',
        '<tpl if="columns">',
            '<cols>',
            '<tpl for="columns.items">{[values.render()]}</tpl>',
            '</cols>',
        '</tpl>',
        '<tpl if="cachedRows">',
            '<sheetData>{cachedRows}</sheetData>',
            '<tpl if="cachedMergeCells"><mergeCells>{cachedMergeCells}</mergeCells></tpl>',
        '<tpl elseif="rows">',
            '<sheetData><tpl for="rows.items">{[values.render()]}</tpl></sheetData>',
            //'{% debugger; %}',
            '<tpl if="values.self.getMergedCellsNo() &gt; 0">',
                '<mergeCells>',
                '<tpl for="rows.items">',
                    '<tpl for="_cells.items">',
                        '<tpl if="isMergedCell"><mergeCell ref="{[values.getMergedCellRef()]}"/></tpl>',
                    '</tpl>',
                '</tpl>',
                '</mergeCells>',
            '</tpl>',
        '<tpl else>',
            '</sheetData>',
        '</tpl>',
        '</worksheet>'
    ],

    lastRowIndex: 1,

    destroy: function(){
        var me = this;

        Ext.destroy(me.cachedRow);
        me.cachedRow = me.cachedRowConfig = null;
        me.callParent();
    },

    getRenderData: function(){
        this.setMergedCellsNo(0);
        return this.callParent();
    },

    applyColumns: function(data, dataCollection){
        return this.checkCollection(data, dataCollection, 'Ext.exporter.file.ooxml.excel.Column');
    },

    applyRows: function(data, dataCollection){
        return this.checkCollection(data, dataCollection, 'Ext.exporter.file.ooxml.excel.Row');
    },

    updateRows: function(collection, oldCollection){
        var me = this;

        if(oldCollection){
            oldCollection.un({
                add: me.onRowAdd,
                remove: me.onRowRemove,
                scope: me
            });
        }
        if(collection){
            collection.on({
                add: me.onRowAdd,
                remove: me.onRowRemove,
                scope: me
            });
            me.onRowAdd(collection, {items: collection.getRange()});
        }
    },

    onRowAdd: function(collection, details){
        var items = details.items,
            length = items.length,
            i, item, index;

        for(i = 0; i < length; i++) {
            item = items[i];
            item.setWorksheet(this);
            index = item._index;

            if(!index){
                item.setIndex(this.lastRowIndex++);
            }else{
                this.lastRowIndex = Math.max(collection.length, index) + 1;
            }
        }
    },

    onRowRemove: function(collection, details){
        Ext.destroy(details.items);
    },

    updateDrawings: function(data){
        var rels = this.getRelationships();

        if(oldData && rels){
            rels.removeRelationship(oldData.getRelationship());
        }
        if(data && rels){
            rels.addRelationship(data.getRelationship());
        }
    },

    updateTables: function(data){
        var rels = this.getRelationships();

        if(oldData && rels){
            rels.removeRelationship(oldData.getRelationship());
        }
        if(data && rels){
            rels.addRelationship(data.getRelationship());
        }
    },

    /**
     * Convenience method to add column infos.
     * @param {Object/Array} config
     * @return {Ext.exporter.file.ooxml.excel.Column/Ext.exporter.file.ooxml.excel.Column[]}
     */
    addColumn: function(config){
        if(!this._columns){
            this.setColumns([]);
        }
        return this._columns.add(config || {});
    },

    /**
     * Convenience method to add rows.
     * @param {Object/Array} config
     * @return {Ext.exporter.file.ooxml.excel.Row/Ext.exporter.file.ooxml.excel.Row[]}
     */
    addRow: function(config){
        if(!this._rows){
            this.setRows([]);
        }
        return this._rows.add(config || {});
    },

    /**
     * Convenience method to fetch a row by its id.
     * @param id
     * @return {Ext.exporter.file.ooxml.excel.Row}
     */
    getRow: function(id){
        return this._rows ? this._rows.get(id) : null;
    },

    beginRowRendering: function(){
        var me = this;

        me.tempRows = [];
        me.tempMergeCells = [];
        me.startCaching = true;
        me.setMergedCellsNo(0);
        me.lastRowIndex = 1;
        me.cachedIndex = 0;

        if(!me.cachedRow) {
            me.cachedRow = new Ext.exporter.file.ooxml.excel.Row({
                worksheet: me
            });
            me.cachedRowConfig = me.cachedRow.getConfig();
            me.cachedRowConfig.id = me.cachedRowConfig.cells = null;
        }
    },

    endRowRendering: function(){
        var me = this;

        me.setCachedRows(me.tempRows.join(''));
        me.setCachedMergeCells(me.tempMergeCells.join(''));
        me.tempRows = me.tempMergeCells = null;
        me.startCaching = false;
        me.lastRowIndex = 1;
    },

    /**
     * Use this method when you don't want to create Row/Cell objects and just render data.
     * Before frequently calling this method you need to call `beginRowRendering` and after that call `endRowRendering`.
     * At the end you can call worksheet.render() and all cached rows will go into the spreadsheet document.
     *
     * @param rows
     * @private
     */
    renderRows: function(rows){
        var items = Ext.Array.from(rows),
            len = items.length, i;

        for(i = 0; i < len; i++){
            this.renderRow(items[i]);
        }
    },

    renderRow: function(row){
        var me = this,
            config, len, i, cache,
            index, cells, ret;

        if(!me.startCaching){
            me.beginRowRendering();
        }

        cache = me.cachedRow;

        if(Ext.isArray(row)){
            cells = row;
            config = {};
        }else{
            config = row;
            cells = Ext.Array.from(config.cells || []);
        }
        delete(config.cells);
        Ext.applyIf(config, me.cachedRowConfig);

        //cache.setConfig(config); setConfig is expensive
        cache.setCollapsed(config.collapsed);
        cache.setHidden(config.hidden);
        cache.setHeight(config.height);
        cache.setOutlineLevel(config.outlineLevel);
        cache.setShowPhonetic(config.showPhonetic);
        cache.setStyleId(config.styleId);
        cache.setIndex(config.index);

        index = cache.getIndex();
        if(!index) {
            cache.setIndex(me.lastRowIndex++);
        }else{
            me.lastRowIndex = Math.max(me.lastRowIndex, index) + 1;
        }

        ret = cache.renderCells(cells);
        me.tempRows.push(ret.row);

        if(me.cachedIndex === 0){
            me._topLeftRef = ret.first;
        }
        me._bottomRightRef = ret.last;

        me.tempMergeCells.push(ret.merged);

        me.cachedIndex++;
    }


});