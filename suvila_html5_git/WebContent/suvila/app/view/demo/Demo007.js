Ext.define('ExFrm.view.demo.Demo007',{
    extend:'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.demo007',
    requires:['ExFrm.view.demo.Demo007Controller',
              'ExFrm.view.demo.Demo007Model'],
    controller:'demo007',
    viewModel:{
        type:'demo007'
    },
    name:'Demo007',
    title:'피봇그리드',
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
        items:[{
            layout:'hbox',
            items:[{
                html:'피봇그리드'
            }]
        },{
            width:300,
            flex:1,
            exGroupRef:true,
            xtype:'pivotgrid',
            //viewLayoutType: 'compact',
            reference:'pivotGrid',
            plugins:{
                ptype:'pivotexporter'
            },
            bind:{
                store:'{pivotInfo}'
            },
            startRowGroupsCollapsed: false,

                // Set this to false if multiple dimensions are configured on topAxis and
                // you want to automatically expand the col groups when calculations are ready.
            startColGroupsCollapsed: false,
            matrix: {
                //type: 'local',


                //matrix:{

                leftAxis:[
                {
                    dataIndex:'NAME',
                    header:'종류'
                },{
                    dataIndex:'DETAIL_NAME',
                    header:'구분'
                }],
                topAxis:[{
                    dataIndex:'USER_NM',
                    //header:'지역',
                    expanded:true,
                    expand:true
                },{
                    dataIndex:'AMOUNT_NM',
                    //header:'현금',
                    width:200
                }],
                
                aggregate: [{
                    dataIndex: 'AMOUNT',
                    header: '합계',
                    aggregator: 'sum',
                    width: 90
                }],
                textTotalTpl:'소계 ({name})',
                textGrandTotalTpl:'총계',
                //rowSubTotalsPosition:'none'   // top, bottom
                colSubTotalsPosition:'none' // left, right
            },
            //rowSubTotalsPosition:'none'
/*
            aggregate:[{
                measure:'point',
                header:'합계',
                aggregator:'sum',
                align:'right',
                width:85,
                renderer:Ext.util.Format.numberRenderer('0,000.00')
            }]
            */
        //}
        },{
            xtype:'container',
            items:[{
                xtype:'exbutton',
                text:'엑셀출력',
                handler:'onExcel'
            }]
        }]
    }]
})