/* global expect, Ext */

/**
 * We only define here tests that apply to the Matrix classes which should be
 * common to both toolkits.
 */

describe('Ext.pivot.Grid', function() {
    var data = [],
        items = 500,
        rand = 37,
        companies = ['Google', 'Apple', 'Dell', 'Microsoft', 'Adobe'],
        countries = ['Belgium', 'Netherlands', 'United Kingdom', 'Canada', 'United States', 'Australia'],
        persons = ['John', 'Michael', 'Mary', 'Anne', 'Robert'],
        regions = {
            "Belgium": 'Europe',
            "Netherlands": 'Europe',
            "United Kingdom": 'Europe',
            "Canada": 'North America',
            "United States": 'North America',
            "Australia": 'Australia'
        },
        randomItem = function(data){
            var k = rand % data.length;

            rand = rand * 1664525 + 1013904223;
            rand &= 0x7FFFFFFF;
            return data[k];
        },
        randomDate = function(start, end){
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime() ));
        },
        i, j;

    for (i = 0; i < items; i++){
        j = rand % companies;
        data.push({
            id:         i,
            company:    randomItem(companies),
            country:    randomItem(countries),
            person:     randomItem(persons),
            date:       randomDate(new Date(2012, 0, 1), new Date()),
            value:      Math.random() * 1000 + 1,
            quantity:   Math.floor(Math.random() * 30 + 1)
        });
    }

    Ext.ux.ajax.SimManager.init({
        defaultSimlet: null
    });
    Ext.ux.ajax.SimManager.register({
        '/RemoteMatrix': {
            type: 'pivot',
            data: data
        }
    });


    var store, grid, pivotDone, pivotUpdated, matrix,
        Sale = Ext.define(null, {
            extend: 'Ext.data.Model',

            fields: [
                {name: 'id',        type: 'int'},
                {name: 'company',   type: 'string'},
                {name: 'country',   type: 'string'},
                {name: 'person',    type: 'string'},
                {name: 'date',      type: 'date'},
                {name: 'value',     type: 'float'},
                {name: 'quantity',  type: 'float'},
                {
                    name: 'year',
                    convert: function(v, record){
                        return Ext.Date.format(record.get('date'), "Y");
                    }
                },{
                    name: 'month',
                    convert: function(v, record){
                        return parseInt(Ext.Date.format(record.get('date'), "m"), 10) - 1;
                    }
                },{
                    name: 'continent',
                    convert: function(v, record){
                        return regions[record.get('country')];
                    }
                }
            ]
        });

    function onPivotDone() {
        pivotDone = true;
    }

    function onPivotUpdate() {
        pivotUpdated = true;
    }

    function makeGrid(local, storeData) {
        var cfg = {
            title: 'Outline layout',
            collapsible: true,
            multiSelect: true,
            height: 350,
            width: 750,
            selModel: {
                type: 'rowmodel'
            },
            listeners: {
                pivotDone: onPivotDone
            },

            // Set this to false if multiple dimensions are configured on leftAxis and
            // you want to automatically expand the row groups when calculations are ready.
            startRowGroupsCollapsed: false,

            matrix: {
                // Set layout type to "outline". If this config is missing then the default layout is "outline"
                viewLayoutType: 'outline',

                // Configure the aggregate dimensions. Multiple dimensions are supported.
                aggregate: [{
                    id: 'agg',
                    dataIndex: 'value',
                    header: 'Sum of value',
                    aggregator: 'sum',
                    width: 90
                }],

                // Configure the left axis dimensions that will be used to generate the grid rows
                leftAxis: [{
                    id: 'person',
                    dataIndex: 'person',
                    header: 'Person',
                    width: 80
                }, {
                    id: 'company',
                    dataIndex: 'company',
                    header: 'Company',
                    sortable: false,
                    width: 80
                }],

                /**
                 * Configure the top axis dimensions that will be used to generate the columns.
                 * When columns are generated the aggregate dimensions are also used. If multiple aggregation dimensions
                 * are defined then each top axis result will have in the end a column header with children
                 * columns for each aggregate dimension defined.
                 */
                topAxis: [{
                    id: 'country',
                    dataIndex: 'country',
                    header: 'Country'
                }],

                listeners: {
                    afterUpdate: onPivotUpdate
                }
            },
            renderTo: document.body
        };

        // both store and pivot simlet use the same dataset
        store = new Ext.data.Store({
            model: Sale,
            proxy: {
                type: 'memory',
                limitParam: null,
                data: storeData || data,
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });

        if(local === true){
            cfg = Ext.merge(cfg, {
                matrix: {
                    type: 'local',
                    store: store
                }
            });
        }else{
            cfg = Ext.merge(cfg, {
                matrix: {
                    type: 'remote',
                    url: '/RemoteMatrix'
                }
            });
        }


        // Reset flag that is set when the pivot grid has processed the data and rendered
        pivotDone = pivotUpdated = false;
        grid = new Ext.pivot.Grid(cfg);
        matrix = grid.getMatrix();
    }

    function destroyGrid(){
        Ext.destroy(grid, store);
        store = grid = matrix = null;
        pivotDone = pivotUpdated = false;
    }

    function checkGrandTotal(filters){
        var result;

        if(filters){
            store.clearFilter();
            store.addFilter(filters);
        }
        result = matrix.results.get(matrix.grandTotalKey, matrix.grandTotalKey);
        if(result) {
            expect(result.getValue('agg')).toBe(store.sum('value'));
        }
    }

    function checkAxisResults(item, index, len, additionalFilters){
        var keys = Ext.Object.getKeys(item.data),
            filters = Ext.Array.from(additionalFilters || []),
            i, result;

        store.clearFilter();

        for(i = 0; i < keys.length; i++){
            filters.push({
                property: keys[i],
                operator: '=',
                value: item.data[keys[i]],
                exactMatch: true
            });
        }
        store.addFilter(filters);

        if(item.axis.isLeftAxis) {
            result = matrix.results.get(item.key, matrix.grandTotalKey);
            if(result) {
                expect(result.getValue('agg')).toBe(store.sum('value'));
            }
        }else{
            result = matrix.results.get(matrix.grandTotalKey, item.key);
            if(result) {
                expect(result.getValue('agg')).toBe(store.sum('value'));
            }
        }
    }

    afterEach(destroyGrid);

    describe('Matrix calculations', function(){

        describe('Local matrix', function(){
            beforeEach(function(){
                makeGrid(true);
            });

            it('should apply natural sort correctly', function(){
                waitsFor(function(){
                    return pivotDone;
                });

                runs(function() {
                    expect(matrix.naturalSort(1, 10)).toBe(-1);
                    expect(matrix.naturalSort('z1', 'z10')).toBe(-1);
                    expect(matrix.naturalSort('z11', 'z2')).toBe(1);
                    expect(matrix.naturalSort('z19', 'z2')).toBe(1);
                    expect(matrix.naturalSort('z20', 'z111')).toBe(-1);
                    expect(matrix.naturalSort('0.123', '0.12')).toBe(1);
                    expect(matrix.naturalSort('aaa12', 'aaa12sds')).toBe(-1);
                    expect(matrix.naturalSort('1.1.1.16', '1.1.1.4')).toBe(1);
                    expect(matrix.naturalSort('1.2.1.16', '1.3.1.4')).toBe(-1);
                    expect(matrix.naturalSort(new Date(2015, 0, 1), new Date(2016, 0, 1))).toBe(-1);
                });
            });

            it('should calculate OK when matrix is NOT filtered', function(){
                waitsFor(function(){
                    return pivotDone;
                });

                runs(function(){
                    store.suspendEvents(false);

                    // grand totals check
                    checkGrandTotal();

                    // row grand totals check
                    matrix.leftAxis.items.each(checkAxisResults);

                    // col grand totals check
                    matrix.topAxis.items.each(checkAxisResults);

                    store.resumeEvents();
                });
            });

            it('should calculate OK with Label filters on top axis', function(){
                waitsFor(function(){
                    return pivotDone;
                });

                runs(function() {
                    pivotDone = false;
                    grid.reconfigurePivot({
                        topAxis: [{
                            id:         'country',
                            dataIndex:  'country',
                            header:     'Country',
                            filter: {
                                type: 'label',
                                operator: '=',
                                value: 'Belgium'
                            }
                        }]
                    });
                });

                waitsFor(function(){
                    return pivotDone;
                });

                runs(function(){
                    var filters = [{
                            property: 'country',
                            operator: '=',
                            value: 'Belgium',
                            exactMatch: true
                        }],
                        checkFn = Ext.bind(checkAxisResults, this, filters, true);

                    store.suspendEvents(false);

                    // grand totals check
                    checkGrandTotal(filters);

                    // row grand totals check
                    matrix.leftAxis.items.each(checkFn);

                    // col grand totals check
                    matrix.topAxis.items.each(checkFn);

                    store.resumeEvents();
                });
            });

            it('should calculate OK with Label filters on left axis', function(){
                waitsFor(function(){
                    return pivotDone;
                });

                runs(function() {
                    pivotDone = false;
                    grid.reconfigurePivot({
                        leftAxis: [{
                            id:         'person',
                            dataIndex:  'person',
                            header:     'Person',
                            width:      80,
                            filter: {
                                type: 'label',
                                operator: '=',
                                value: 'John'
                            }
                        },{
                            id:         'company',
                            dataIndex:  'company',
                            header:     'Company',
                            sortable:   false,
                            width:      80
                        }]
                    });
                });

                waitsFor(function(){
                    return pivotDone;
                });

                runs(function(){
                    var filters = [{
                            property: 'person',
                            operator: '=',
                            value: 'John',
                            exactMatch: true
                        }],
                        checkFn = Ext.bind(checkAxisResults, this, filters, true);

                    store.suspendEvents(false);

                    // grand totals check
                    checkGrandTotal(filters);

                    // row grand totals check
                    matrix.leftAxis.items.each(checkFn);

                    // col grand totals check
                    matrix.topAxis.items.each(checkFn);

                    store.resumeEvents();
                });
            });

            it('should calculate OK with Value filters on top axis', function(){
                var limit = 50000;

                waitsFor(function(){
                    return pivotDone;
                });

                runs(function() {
                    pivotDone = false;
                    grid.reconfigurePivot({
                        topAxis: [{
                            id:         'country',
                            dataIndex:  'country',
                            header:     'Country',
                            filter: {
                                type: 'value',
                                operator: '<',
                                dimensionId: 'agg',
                                value: limit
                            }
                        },{
                            id:         'year',
                            dataIndex:  'year',
                            header:     'Year'
                        }]
                    });
                });

                waitsFor(function(){
                    return pivotDone;
                });

                runs(function(){

                    matrix.topAxis.items.each(function(item){
                        var result;

                        if(item.level > 0){
                            return;
                        }
                        result = matrix.results.get(matrix.grandTotalKey, item.key);
                        if(result) {
                            expect(result.getValue('agg')).toBeLessThan(limit);
                        }
                    });

                });
            });

            it('should calculate OK with Value filters on left axis', function(){
                var limit = 50000;

                waitsFor(function(){
                    return pivotDone;
                });

                runs(function() {
                    pivotDone = false;
                    grid.reconfigurePivot({
                        leftAxis: [{
                            id:         'person',
                            dataIndex:  'person',
                            header:     'Person',
                            width:      80,
                            filter: {
                                type: 'value',
                                operator: '<',
                                dimensionId: 'agg',
                                value: limit
                            }
                        },{
                            id:         'company',
                            dataIndex:  'company',
                            header:     'Company',
                            sortable:   false,
                            width:      80
                        }]
                    });
                });

                waitsFor(function(){
                    return pivotDone;
                });

                runs(function(){

                    matrix.leftAxis.items.each(function(item){
                        var result;

                        if(item.level > 0){
                            return;
                        }
                        result = matrix.results.get(item.key, matrix.grandTotalKey);
                        if(result) {
                            expect(result.getValue('agg')).toBeLessThan(limit);
                        }
                    });
                });
            });

            it('should return correct results when adding a Value filter with "=" operator', function(){
                waitsFor(function(){
                    return pivotDone;
                });

                runs(function(){
                    // let's find one pivot result and extract its value
                    var leftItem = matrix.leftAxis.tree[0],
                        value = matrix.results.get(leftItem.key, matrix.grandTotalKey).getValue('agg');

                    pivotDone = false;

                    grid.reconfigurePivot({
                        leftAxis: [{
                            id:         'person',
                            dataIndex:  'person',
                            header:     'Person',
                            width:      80,
                            filter: {
                                type: 'value',
                                operator: '=',
                                dimensionId: 'agg',
                                value: Ext.Number.toFixed(value, 2)
                            }
                        },{
                            id:         'company',
                            dataIndex:  'company',
                            header:     'Company',
                            sortable:   false,
                            width:      80
                        }]
                    });

                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function(){

                        matrix.leftAxis.items.each(function(item){
                            var result;

                            if(item.value === leftItem.value){
                                result = matrix.results.get(item.key, matrix.grandTotalKey);
                                if(result) {
                                    expect(result.getValue('agg')).toBe(value);
                                }
                            }
                        });
                    });
                });
            });

            it('should return correct results when adding a Value filter with ">" operator', function(){
                waitsFor(function(){
                    return pivotDone;
                });

                runs(function(){
                    // let's find one pivot result and extract its value
                    var value = 50000;

                    pivotDone = false;

                    grid.reconfigurePivot({
                        leftAxis: [{
                            id:         'person',
                            dataIndex:  'person',
                            header:     'Person',
                            width:      80,
                            filter: {
                                type: 'value',
                                operator: '>',
                                dimensionId: 'agg',
                                value: value
                            }
                        },{
                            id:         'company',
                            dataIndex:  'company',
                            header:     'Company',
                            sortable:   false,
                            width:      80
                        }]
                    });

                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function(){
                        matrix.leftAxis.items.each(function(item){
                            var result;

                            if(item.level === 0) {
                                result = matrix.results.get(item.key, matrix.grandTotalKey);
                                if(result) {
                                    expect(result.getValue('agg')).toBeGreaterThan(value);
                                }
                            }
                        });
                    });
                });
            });

            describe('Events', function() {

                it('should fire pivotbeforereconfigure', function(){
                    var fired = false;

                    grid.on({
                        pivotbeforereconfigure: function(){
                            fired = true;
                        }
                    });

                    grid.reconfigurePivot({
                        leftAxis: [{
                            dataIndex:  'person'
                        }]
                    });

                    expect(fired).toBe(true);
                });

                it('should fire pivotreconfigure', function(){
                    var fired = false;

                    grid.on({
                        pivotreconfigure: function(){
                            fired = true;
                        }
                    });

                    grid.reconfigurePivot({
                        leftAxis: [{
                            dataIndex:  'person'
                        }]
                    });

                    expect(fired).toBe(true);
                });

                it('should cancel reconfiguration', function(){
                    var fired = false;

                    grid.on({
                        pivotbeforereconfigure: function(){
                            return false;
                        },
                        pivotreconfigure: function(){
                            fired = true;
                        }
                    });

                    grid.reconfigurePivot({
                        leftAxis: [{
                            dataIndex:  'person'
                        }]
                    });

                    expect(fired).toBe(false);
                });

            });

        });

        describe('Local matrix with store changes', function(){
            beforeEach(function(){
                makeGrid(true, [{
                    company: 'Adobe',
                    country: 'Australia',
                    person: 'Adrian',
                    date: new Date(2016, 9, 18),
                    value: 10,
                    quantity: 1
                },{
                    company: 'Google',
                    country: 'United Kingdom',
                    person: 'Nige',
                    date: new Date(2016, 9, 18),
                    value: 20,
                    quantity: 2
                }]);
            });

            describe('Adding records', function(){
                it('should recalculate OK', function(){
                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function() {
                        store.add({
                            company: 'Adobe',
                            country: 'Australia',
                            person: 'Adrian',
                            date: new Date(2016, 9, 18),
                            value: 20,
                            quantity: 2
                        });
                    });

                    waitsFor(function(){
                        return pivotUpdated;
                    });

                    runs(function(){
                        store.suspendEvents(false);

                        // grand totals check
                        checkGrandTotal();

                        // row grand totals check
                        matrix.leftAxis.items.each(checkAxisResults);

                        // col grand totals check
                        matrix.topAxis.items.each(checkAxisResults);

                        store.resumeEvents();
                    });
                });

                it('should recalculate OK if label filter exists', function(){
                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function(){
                        pivotDone = false;
                        grid.reconfigurePivot({
                            leftAxis: [{
                                id:         'person',
                                dataIndex:  'person',
                                header:     'Person',
                                width:      80,
                                filter: {
                                    type: 'label',
                                    operator: '=',
                                    value: 'Adrian'
                                }
                            },{
                                id:         'company',
                                dataIndex:  'company',
                                header:     'Company',
                                sortable:   false,
                                width:      80
                            }]
                        });
                    });

                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function() {
                        store.add({
                            company: 'Adobe',
                            country: 'Australia',
                            person: 'Don',
                            date: new Date(2016, 9, 18),
                            value: 30,
                            quantity: 3
                        });
                    });

                    waitsFor(function(){
                        return pivotUpdated;
                    });

                    runs(function(){
                        var filters = [{
                                property: 'person',
                                operator: '=',
                                value: 'Adrian',
                                exactMatch: true
                            }],
                            checkFn = Ext.bind(checkAxisResults, this, filters, true);

                        store.suspendEvents(false);

                        // grand totals check
                        checkGrandTotal(filters);

                        // row grand totals check
                        matrix.leftAxis.items.each(checkFn);
                        expect(matrix.leftAxis.tree.length).toBe(1);
                        expect(matrix.leftAxis.tree[0].value).toBe('Adrian');

                        // col grand totals check
                        matrix.topAxis.items.each(checkFn);

                        store.resumeEvents();
                    });
                });


            });

            describe('Updating records', function() {

                it('should recalculate when updating records', function () {
                    waitsFor(function () {
                        return pivotDone;
                    });

                    runs(function () {
                        store.getAt(0).set({
                            company: 'Adobe',
                            country: 'Australia',
                            person: 'Nige',
                            value: 15,
                            quantity: 5
                        });
                    });

                    waitsFor(function () {
                        return pivotUpdated;
                    });

                    runs(function () {
                        store.suspendEvents(false);

                        // grand totals check
                        checkGrandTotal();

                        // row grand totals check
                        matrix.leftAxis.items.each(checkAxisResults);

                        // col grand totals check
                        matrix.topAxis.items.each(checkAxisResults);

                        store.resumeEvents();
                    });
                });

                it('should recalculate OK if label filter exists', function(){
                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function(){
                        pivotDone = false;
                        grid.reconfigurePivot({
                            leftAxis: [{
                                id:         'person',
                                dataIndex:  'person',
                                header:     'Person',
                                width:      80,
                                filter: {
                                    type: 'label',
                                    operator: '=',
                                    value: 'Don'
                                }
                            },{
                                id:         'company',
                                dataIndex:  'company',
                                header:     'Company',
                                sortable:   false,
                                width:      80
                            }]
                        });
                    });

                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function() {
                        store.getAt(0).set({
                            company: 'Adobe',
                            country: 'Australia',
                            person: 'Don',
                            value: 15,
                            quantity: 5
                        });
                    });

                    waitsFor(function(){
                        return pivotUpdated;
                    });

                    runs(function(){
                        var filters = [{
                                property: 'person',
                                operator: '=',
                                value: 'Don',
                                exactMatch: true
                            }],
                            checkFn = Ext.bind(checkAxisResults, this, filters, true);

                        store.suspendEvents(false);

                        // grand totals check
                        checkGrandTotal(filters);

                        // row grand totals check
                        matrix.leftAxis.items.each(checkFn);
                        expect(matrix.leftAxis.tree.length).toBe(1);
                        expect(matrix.leftAxis.tree[0].value).toBe('Don');

                        // col grand totals check
                        matrix.topAxis.items.each(checkFn);

                        store.resumeEvents();
                    });
                });
            });

            describe('Removing records', function(){
                it('should recalculate when removing records', function(){
                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function() {
                        store.removeAt(0);
                    });

                    waitsFor(function(){
                        return pivotUpdated;
                    });

                    runs(function(){
                        store.suspendEvents(false);

                        // grand totals check
                        checkGrandTotal();

                        // row grand totals check
                        matrix.leftAxis.items.each(checkAxisResults);

                        // col grand totals check
                        matrix.topAxis.items.each(checkAxisResults);

                        store.resumeEvents();
                    });
                });

                it('should recalculate OK if label filter exists', function(){
                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function(){
                        pivotDone = false;
                        grid.reconfigurePivot({
                            leftAxis: [{
                                id:         'person',
                                dataIndex:  'person',
                                header:     'Person',
                                width:      80,
                                filter: {
                                    type: 'label',
                                    operator: '=',
                                    value: 'Adrian'
                                }
                            },{
                                id:         'company',
                                dataIndex:  'company',
                                header:     'Company',
                                sortable:   false,
                                width:      80
                            }]
                        });
                    });

                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function() {
                        store.removeAt(1);
                    });

                    waitsFor(function(){
                        return pivotUpdated;
                    });

                    runs(function(){
                        var filters = [{
                                property: 'person',
                                operator: '=',
                                value: 'Adrian',
                                exactMatch: true
                            }],
                            checkFn = Ext.bind(checkAxisResults, this, filters, true);

                        store.suspendEvents(false);

                        // grand totals check
                        checkGrandTotal(filters);

                        // row grand totals check
                        matrix.leftAxis.items.each(checkFn);
                        expect(matrix.leftAxis.tree.length).toBe(1);
                        expect(matrix.leftAxis.tree[0].value).toBe('Adrian');

                        // col grand totals check
                        matrix.topAxis.items.each(checkFn);

                        store.resumeEvents();
                    });
                });
            });

            describe('Add/Update/Remove records', function(){
                it('should recalculate OK', function(){
                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function() {
                        store.add([{
                            company: 'Adobe',
                            country: 'Australia',
                            person: 'Don',
                            value: 15,
                            quantity: 5
                        },{
                            company: 'Google',
                            country: 'Belgium',
                            person: 'Adrian',
                            value: 25,
                            quantity: 1
                        }]);
                        store.getAt(1).set({
                            company: 'Adobe',
                            country: 'Australia',
                            person: 'Kevin',
                            value: 15,
                            quantity: 5
                        });
                        store.removeAt(0);
                    });

                    waitsFor(function(){
                        // the event 'afterupdate' is thrown by each update operation on the matrix store
                        // so we need to wait for all of them to happen
                        return pivotUpdated && matrix.recordsToAdd.length === 0 && matrix.recordsToUpdate.length === 0 && matrix.recordsToRemove.length === 0;
                    });

                    runs(function(){
                        store.suspendEvents(false);

                        // grand totals check
                        checkGrandTotal();

                        // row grand totals check
                        matrix.leftAxis.items.each(checkAxisResults);

                        // col grand totals check
                        matrix.topAxis.items.each(checkAxisResults);

                        store.resumeEvents();
                    });
                });

                it('should recalculate OK if label filter exists', function(){
                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function(){
                        pivotDone = false;
                        grid.reconfigurePivot({
                            leftAxis: [{
                                id:         'person',
                                dataIndex:  'person',
                                header:     'Person',
                                width:      80,
                                filter: {
                                    type: 'label',
                                    operator: '=',
                                    value: 'Adrian'
                                }
                            },{
                                id:         'company',
                                dataIndex:  'company',
                                header:     'Company',
                                sortable:   false,
                                width:      80
                            }]
                        });
                    });

                    waitsFor(function(){
                        return pivotDone;
                    });

                    runs(function() {
                        store.add([{
                            company: 'Adobe',
                            country: 'Australia',
                            person: 'Don',
                            value: 15,
                            quantity: 5
                        },{
                            company: 'Google',
                            country: 'Belgium',
                            person: 'Adrian',
                            value: 25,
                            quantity: 1
                        }]);
                        store.getAt(1).set({
                            company: 'Adobe',
                            country: 'Australia',
                            person: 'Kevin',
                            value: 15,
                            quantity: 5
                        });
                        store.removeAt(0);
                    });

                    waitsFor(function(){
                        // the event 'afterupdate' is thrown by each update operation on the matrix store
                        // so we need to wait for all of them to happen
                        return pivotUpdated && matrix.recordsToAdd.length === 0 && matrix.recordsToUpdate.length === 0 && matrix.recordsToRemove.length === 0;
                    });

                    runs(function(){
                        var filters = [{
                                property: 'person',
                                operator: '=',
                                value: 'Adrian',
                                exactMatch: true
                            }],
                            checkFn = Ext.bind(checkAxisResults, this, filters, true);

                        store.suspendEvents(false);

                        // grand totals check
                        checkGrandTotal(filters);

                        // row grand totals check
                        matrix.leftAxis.items.each(checkFn);
                        expect(matrix.leftAxis.tree.length).toBe(1);
                        expect(matrix.leftAxis.tree[0].value).toBe('Adrian');

                        // col grand totals check
                        matrix.topAxis.items.each(checkFn);

                        store.resumeEvents();
                    });
                });
            });
        });

        describe('Remote matrix', function(){
            beforeEach(function(){
                makeGrid(false);
            });

            it('should calculate OK when matrix is NOT filtered', function(){
                waitsFor(function(){
                    return pivotDone;
                });

                runs(function(){
                    store.suspendEvents(false);

                    // grand totals check
                    checkGrandTotal();

                    // row grand totals check
                    matrix.leftAxis.items.each(checkAxisResults);

                    // col grand totals check
                    matrix.topAxis.items.each(checkAxisResults);

                    store.resumeEvents();
                });
            });

            describe('Events', function() {

                it('should fire pivotbeforereconfigure', function(){
                    var fired = false;

                    grid.on({
                        pivotbeforereconfigure: function(){
                            fired = true;
                        }
                    });

                    grid.reconfigurePivot({
                        leftAxis: [{
                            dataIndex:  'person'
                        }]
                    });

                    expect(fired).toBe(true);
                });

                it('should fire pivotreconfigure', function(){
                    var fired = false;

                    grid.on({
                        pivotreconfigure: function(){
                            fired = true;
                        }
                    });

                    grid.reconfigurePivot({
                        leftAxis: [{
                            dataIndex:  'person'
                        }]
                    });

                    expect(fired).toBe(true);
                });

                it('should cancel reconfiguration', function(){
                    var fired = false;

                    grid.on({
                        pivotbeforereconfigure: function(){
                            return false;
                        },
                        pivotreconfigure: function(){
                            fired = true;
                        }
                    });

                    grid.reconfigurePivot({
                        leftAxis: [{
                            dataIndex:  'person'
                        }]
                    });

                    expect(fired).toBe(false);
                });

            });

        });

    });
});
