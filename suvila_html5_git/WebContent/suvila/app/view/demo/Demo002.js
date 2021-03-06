Ext.define('ExFrm.view.demo.Demo002',{
    extend:'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.demo002',
    requires:['ExFrm.view.demo.Demo002Controller',
    'ExFrm.view.demo.Demo002Model'],
    controller:'demo002',
    viewModel:{
        type:'demo002'
    },
    name:'Demo002',
    title:'그리드 데이터',
    closable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',
        layout:{
            type:'vbox',
            align:'stretch'
        },
        dockedItems:[
        {
            border:1,
            xtype:'toolbar',
            cls:'title_panel',
            xtype:'container',
            layout:{
                type:'hbox',
                align:'middle'
            }
            ,
            items:[{
                xtype:'tbspacer',
                width:10,
            }
            ,
            {
                html:'<h3>User Management</h3>',
                flex:1
            }
            ,
            {
                xtype:'button',
                text:'화면갱신',
                iconCls:'fa fa-refresh',
                listeners:[
                {
                    click:'onSearchItems'
                }
                ]
            }
            ,
            {
                xtype:'tbspacer',
                width:10,
            }
            ]
        }
        ],
        width:300,
        border:1,
        items:[{
            items:[{
                cls:'title_panel',
                xtype:'container',
                layout:'hbox',
                items:[{
                    html:'제목'
                },{
                    xtype:'tbspacer',
                    flex:1
                }]
            },{
                xtype:'tbspacer',
                height:10
            },{
                exGroupRef:true,
                reference:'searchItems',
                xtype:'exfieldsetbox',
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                items:[{
                    layout:'hbox',
                    items:[{
                        xtype:'extextfield',
                        fieldLabel:'고객명',
                        reference:'custNameSrch',
                        name:'custNameSrch',
                        labelAlign:'right',
                        exLabel:'고객명'
                    },{
                        xtype:'exdatefield',
                        fieldLabel:'생년월일',
                        reference:'birthSrch',
                        labelAlign:'right',
                        exLabel:'생년월일',
                        name:'birthSrch'
                    },{
                        xtype:'tbspacer',
                        flex:1
                    },{
                        xtype:'exbutton',
                        text:'조회',
                        listeners:[
                        {
                            click:'onSearchItems'
                        }
                        ]
                    }]
                }]
            },{
                xtype:'tbspacer',
                height:10
            }]
        },{
            height:300,
            layout:{
                type:'hbox',
                align:'stretch'
            },
            flex:1,
            items:[{
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                width:300,
                items:[{
                    exGroupRef:true,
                    xtype:'extreepanel',
                    reference:'mainTree',
                    width:200,
                    bind:{
                        store:'{mainInfo}'
                    },
                    displayField:'custName',
                    listeners:[
                    {
                        itemclick:'onMainGridClick'
                    }
                    ]
                }]
            },{
                xtype:'tbspacer',
                width:10
            },{
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                flex:1,
                items:[{
                    html:'그리드의 그룹처리'
                },{
                    exGroupRef:true,
                    xtype:'exgrid',
                    cls:'grid-group',
                    reference:'detailGrid',
                    width:'100%',
                    exGroupFields:['custNo','custName'],
                    plugins:[{
                        ptype:'cellediting'
                    }],
                    viewConfig: {
                        getRowClass: function(record, rowIndex, rowParams, store) {
                            return 'exrowwhite';
                        }
                    },                     
                    bind:{
                        store:'{detailInfo}'
                    }, 
                    columns:[
                    {                       
                        text:'고객번호',
                        dataIndex:'custNo',
                        width:100,
                        xtype:'excolumn',
                        exAlign:'center'
                    },{

                        xtype:'excolumn',
                        text:'고객명',
                        dataIndex:'custName',
                        width:100
                    },{
                        text:'생년월일',
                        dataIndex:'birth',
                        width:100,
                        xtype:'excolumn',
                        exType:'date'
                    },{
                        text:'포인트',
                        dataIndex:'point',
                        width:100,
                        xtype:'excolumn',
                        exType:'number'
                    },{
                        text:'주소',
                        dataIndex:'addr',
                        xtype:'excolumn',
                        width:100,
                    },{
                        text:'조합',
                        dataIndex:'addr',
                        width:200,
                        xtype:'excolumn',
                        exType:'user',
                        exUserString:'{0}의 주소는 {1}',
                        exUserRecords:['custName',
                        'addr']
                    },{
                        text:'텍스트에디터(editor)',
                        dataIndex:'addr',
                        xtype:'excolumn',
                        width:200,
                        editor:{
                            xtype:'extextfield'
                        }
                    },{
                        text:'콤보에디터(editor)',
                        dataIndex:'addr',
                        width:200,
                        xtype:'excolumn',
                        editor:{
                            xtype:'excombobox',
                            valueField:'value',
                            displayField:'display',
                            bind:{
                                store:'{comboInfo}'
                            }
                        },
                        onRenderer:function(orgValue,value){
                            var store = this.up('[isRootView=true]').getViewModel().getStore('comboInfo');
                            var index = store.find('value',
                            value)
                            if(index != -1){
                                return store.getAt(index).get('display');
                            }
                            else {
                                return value;
                            }
                        }
                    }],
                    flex:1
                },{
                    xtype:'tbspacer',
                    height:10
                },{
                    xtype:'exgridpagearrows',
                    reference:'detailGridArrows',
                    storeName:'detailInfo',
                    limit:40,
                    pageNumberCount:5
                }]
            }]
        }/*,{
            xtype:'extreepanelajax',
            displayField:'display',
            height:200,
            width:200,
            border:1,
            exFieldData:['display',
            'value'],
            reference:'extreepanelajax'
        }*/,{
            xtype:'container',
            height:10
        },{
            layout:{
                type:'vbox',
                align:'stretch'
            },
            height:300,
            items:[{
                html:'그리드 위젯컬럼 - 데이터가 적을 경우 사용, 많을 경우 에디터를 사용할것.)'
            },{
                exGroupRef:true,
                xtype:'exgrid',
                reference:'widgetGrid',
                width:'100%',
                plugins:[{
                    ptype:'cellediting'
                }],                    
                bind:{
                    store:'{detailInfo}'
                }, 
                columns:[
                {                       
                    text:'고객번호',
                    dataIndex:'custNo',
                    width:100,
                    xtype:'excolumn',
                    exAlign:'center'
                },{

                    xtype:'excolumn',
                    text:'고객명',
                    dataIndex:'custName',
                    width:100
                }
                ,
                {
                    text:'생년월일',
                    dataIndex:'birth',
                    width:100,
                    xtype:'excolumn',
                    exType:'date'
                }
                ,
                {
                    text:'포인트',
                    dataIndex:'point',
                    width:100,
                    xtype:'excolumn',
                    exType:'number'
                }
                ,
                {
                    text:'주소',
                    dataIndex:'addr',
                    xtype:'excolumn',
                    width:100,
                }
                ,
                {
                    text:'조합',
                    dataIndex:'addr',
                    width:200,
                    xtype:'excolumn',
                    exType:'user',
                    exUserString:'{0}의 주소는 {1}',
                    exUserRecords:['custName',
                    'addr']
                }
                ,
                {
                    text:'텍스트에디터(editor)',
                    dataIndex:'addr',
                    xtype:'excolumn',
                    width:200,
                    editor:{
                        xtype:'extextfield'
                    }
                }
                ,
                {
                    text:'콤보에디터(editor)',
                    dataIndex:'addr',
                    width:200,
                    xtype:'excolumn',
                    editor:{
                        xtype:'excombobox',
                        valueField:'value',
                        displayField:'display',
                        bind:{
                            store:'{comboInfo}'
                        }
                    }
                    ,
                    onRenderer:function(orgValue,value){
                        var store = this.up('[isRootView=true]').getViewModel().getStore('comboInfo');
                        var index = store.find('value',
                        value)
                        if(index != -1){
                            return store.getAt(index).get('display');
                        }
                        else {
                            return value;
                        }
                    }
                }
                ,
                {
                    text:'체크박스(checkcolumn)',
                    dataIndex:'bool1',
                    width:200,
                    xtype:'excheckcolumn',
                    cls:'exspanline'
                }
                ,
                {
                    text:'체크박스그룹(editor)',
                    dataIndex:'check1',
                    xtype:'excolumn',
                    width:200,
                    editor:{
                        xtype:'excheckboxgroup',
                        margin:'0 0 0 0',
                        padding:'0 0 0 0',
                        items:[
                        {
                            xtype:'checkboxfield',
                            boxLabel:'check1',
                            name:'check1',
                            inputValue:'1' ,
                        },{
                            xtype:'checkboxfield',
                            boxLabel:'check2',
                            name:'check1',
                            inputValue:'2' ,
                        },{
                            xtype:'checkboxfield',
                            boxLabel:'check3',
                            name:'check1',
                            inputValue:'3' ,
                        }]
                    },
                    onRenderer:function(orgValue,value){
                        return value;
                    }
                },{
                    text:'콤보에디터(위젯)',
                    dataIndex:'addr',
                    width:200,
                    xtype: 'excolumnwidgetcombo',
                    exValueField:'value',
                    exDisplayField:'display',
                    exBindStore:'comboInfo'
                },{
                    xtype:'exwidgetcolumn',
                    text:'체크박스그룹(위젯)',
                    dataIndex:'check1',
                    height:25,
                    width:200,
                    widget:{
                        margin:'0 0 0 0',
                        bodyPadding:'0 0 0 0',
                        padding:'0 0 0 0',
                        defaults:{
                            margin:'0 0 0 0',
                            bodyPadding:'0 0 0 0',
                            padding:'0 0 0 0'
                        },
                        xtype:'excheckboxgroup',
                        items:[
                        {
                            xtype:'checkboxfield',
                            boxLabel:'check1',
                            name:'check1',
                            inputValue:'1' ,
                        },{
                            xtype:'checkboxfield',
                            boxLabel:'check2',
                            name:'check1',
                            inputValue:'2' ,
                        },{
                            xtype:'checkboxfield',
                            boxLabel:'check3',
                            name:'check1',
                            inputValue:'3' ,
                        }]
                    },
                    onWidgetAttach:function(col, widget, rec, row){
                        widget.setExValue(rec.get('check1'));
                    }
                },{
                    text: '색상',
                    dataIndex: 'custName',
                    xtype: 'excolumn',
                    exColor: 'blue',
                    exFontColor: 'white',
                    onRenderer:function (orgValue, value, meta, record, rowIndex, colIndex, store, view){
                        if(rowIndex==1){
                            meta.style = 'background-color:' + 'red' + ';';
                            return '<font color="yellow">' + orgValue + '</font>';
                        }
                        else {
                            return value;
                        }
                    }
                }],
                flex:1
                
            },{
                xtype:'tbspacer',
                height:10
            },{
                xtype:'exgridpagearrows',
                reference:'detailGridArrows',
                storeName:'detailInfo',
                limit:10,
                pageNumberCount:5
            }]
        },{
            xtype:'container',
            height:10
        },{
            layout:'hbox',
            items:[{
                flex:1,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                height:300,
                items:[{
                    layout:'hbox',
                    items:[{
                        html:'그리드의 선택및 조작'
                    },{
                    },{
                        xtype:'button',
                        text:'선택한행 읽기',
                        handler:'onSelectGrid1'
                    },{
                        xtype:'button',
                        text:'선택한행 삭제',
                        handler:'onDeleteGrid1'
                    },{
                        xtype:'button',
                        text:'행 추가',
                        handler:'onAddGrid1'
                    },{
                        xtype:'button',
                        text:'행 삽입',
                        handler:'onInsertGrid1'
                    },{
                        xtype:'button',
                        text:'선택한행 변경',
                        handler:'onUpdateGrid1'
                    }]
                },{
                    exGroupRef:true,
                    xtype:'exgrid',
                    reference:'selectGrid1',
                    width:'100%',
                    plugins:[{
                        ptype:'cellediting'
                    }],                    
                    bind:{
                        store:'{detailInfo}'
                    }, 
                    columns:[
                    {                       
                        text:'고객번호',
                        dataIndex:'custNo',
                        width:100,
                        xtype:'excolumn',
                        exAlign:'center'
                    },{

                        xtype:'excolumn',
                        text:'고객명',
                        dataIndex:'custName',
                        width:100
                    },{
                        text:'생년월일',
                        dataIndex:'birth',
                        width:100,
                        xtype:'excolumn',
                        exType:'date'
                    },{
                        text:'포인트',
                        dataIndex:'point',
                        width:100,
                        xtype:'excolumn',
                        exType:'number'
                    },{
                        text:'주소',
                        dataIndex:'addr',
                        xtype:'excolumn',
                        width:100,
                    }],
                    flex:1
                    
                },{
                    xtype:'tbspacer',
                    height:10
                },{
                    xtype:'exgridpagearrows',
                    reference:'detailGridArrows',
                    storeName:'detailInfo',
                    limit:10,
                    pageNumberCount:5
                }]
            },{
                xtype:'container',
                width:10
            },{
                flex:1,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                height:300,
                items:[{
                    layout:'hbox',
                    items:[{
                        html:'체크박스 선택 그리드의 선택및 조작'
                    },{
                        flex:1,
                    },{
                        xtype:'button',
                        text:'선택한행 읽기',
                        handler:'onSelectGrid2'
                    }]
                },{
                    exGroupRef:true,
                    xtype:'exgrid',
                    reference:'selectGrid2',
                    selType: 'checkboxmodel',
                    width:'100%',
                    plugins:[{
                        ptype:'cellediting'
                    }],                    
                    bind:{
                        store:'{detailInfo}'
                    }, 
                    columns:[
                    {                       
                        text:'고객번호',
                        dataIndex:'custNo',
                        width:100,
                        xtype:'excolumn',
                        exAlign:'center'
                    },{

                        xtype:'excolumn',
                        text:'고객명',
                        dataIndex:'custName',
                        width:100
                    },{
                        text:'생년월일',
                        dataIndex:'birth',
                        width:100,
                        xtype:'excolumn',
                        exType:'date'
                    },{
                        text:'포인트',
                        dataIndex:'point',
                        width:100,
                        xtype:'excolumn',
                        exType:'number'
                    },{
                        text:'주소',
                        dataIndex:'addr',
                        xtype:'excolumn',
                        width:100,
                    }],
                    flex:1
                    
                },{
                    xtype:'tbspacer',
                    height:10
                },{
                    xtype:'exgridpagearrows',
                    reference:'detailGridArrows',
                    storeName:'detailInfo',
                    limit:10,
                    pageNumberCount:5
                }]
            }]
        }]
    }]
})