Ext.define('ExFrm.view.demo.Demo003',{
    extend:'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.demo003',
    requires:['ExFrm.view.demo.Demo003Controller',
    'ExFrm.view.demo.Demo003Model'],
    controller:'demo003',
    viewModel:{
        type:'demo003'
    },
    name:'Demo003',
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
        items:[
        {
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
                        html:'그리드의 멀티선택및 조작'
                    }]
                },{
                    exGroupRef:true,
                    xtype:'exgrid',
                    reference:'selectGrid1',
                    width:'100%',
                    plugins:[{
                        ptype:'cellediting'
                    }],     
                    selModel: {
                        mode: 'MULTI'
                    },        
                    bind:{
                        store:'{sourceInfo}'
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
                width:70,
                layout:{
                    type:'hbox',
                    align:'middle',
                    pack:'center'
                },
                items:[{
                    xtype:'button',
                    text:'>',
                    handler:'onMove'
                }]
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
                        text:'추가된건 읽기',
                        handler:'onAdded'
                    },{
                        xtype:'button',
                        text:'변경된건 읽기',
                        handler:'onUpdated'
                    },{
                        xtype:'button',
                        text:'추가변경된건 읽기',
                        handler:'onModified'
                    },{
                        xtype:'button',
                        text:'삭제된건 읽기',
                        handler:'onRemoved'
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
                        store:'{targetInfo}'
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
                    html:'셀선택'
                },{
                    flex:1,
                },{
                    xtype:'exbutton',
                    text:'선택 셀 읽기',
                    handler:'onSelectedCellList'
                }]
            },{
                xtype:'exgrid',
                reference:'cellSelectGrid',
                width:'100%', 
                selModel: 'cellmodel',
                multiSelect: true, 
                allowDeselect: true,
                bind:{
                    store:'{cellSelectInfo}'
                }, 
                listeners:{
                    cellclick:'onCellClick'
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
            flex:1,
            layout:{
                type:'vbox',
                align:'stretch'
            },
            height:300,
            items:[{
                layout:'hbox',
                items:[{
                    html:'레코드에 따른 배경색'
                },{
                    flex:1,
                }]
            },{
                xtype     :'exgrid',
                reference:'cellSelectGrid',
                width:'100%', 
                selModel: 'cellmodel',
                multiSelect: true, 
                allowDeselect: true,
                bind:{
                    store:'{cellSelectInfo}'
                }, 
                listeners:{
                    cellclick:'onCellClick'
                },
                columns:[
                {                       
                    text:'고객번호',
                    dataIndex:'custNo',
                    width:100,
                    xtype:'excolumn',
                    exAlign:'center',
                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        if(value=='A'){
                            meta.style = 'background-color:red;';
                        }
                        else if(value=='B'){
                            meta.style = 'background-color:yellow;';
                        }
                        else if(value=='C'){
                            meta.style = 'background-color:blue;';
                        }
                        else if(value=='D'){
                            meta.style = 'background-color:green;';
                        }
                        return value;
                    }
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
})