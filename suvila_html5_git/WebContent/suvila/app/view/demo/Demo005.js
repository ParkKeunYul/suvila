Ext.define('ExFrm.view.demo.Demo005',{
    extend:'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.demo005',
    requires:['ExFrm.view.demo.Demo005Controller',
              'ExFrm.view.demo.Demo005Model'],
    controller:'demo005',
    viewModel:{
        type:'demo005'
    },
    name:'Demo005',
    title:'그리드파일첨부',
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
            flex:1,
            layout:{
                type:'vbox',
                align:'stretch'
            },
            height:300,
            items:[{
                layout:'hbox',
                items:[{
                    html:'그리드 파일첨부'
                }]
            },{
                exGroupRef:true,
                xtype:'exgrid',
                reference:'selectGrid1',
                width:'100%',
                listeners:{
                    itemclick:'onGridClick'
                },
                bind:{
                    store:'{testInfo}'
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
                    text:'사진',
                    dataIndex:'image',
                    width:100,
                    renderer:function(val){
                        return '<img src="' + val + '" height="40">';
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
            xtype:'exfieldsetblockbox',
            height:230,
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{
                xtype:'exblockrow',
                flex:1,
                layout:{
                    type:'hbox',
                    align:'stretch'
                },
                items:[{
                    xtype:'exblockrow',
                    width:140,
                    layout:{
                        type:'vbox',
                        align:'stretch'
                    },
                    items:[{
                        xtype:'exblocklabel',
                        html:'사진',
                        height:30
                    },{
                        flex:1,
                        xtype:'exblockfield',
                        reference:'imageBlock',
                        items:[]
                    }]
                },{
                    xtype:'exblocklabel',
                    width:80,
                    html:'메모'
                },{
                    flex:1,
                    xtype:'exblockfield',
                    reference:'memoBlock',
                    items:[]
                }]

            },{
                xtype:'exblockrow',

                items:[{
                    xtype:'exblockfield',
                    reference:'fileBlock',
                    width:140,
                    flex:null,
                    items:[]
                },{
                    xtype:'exblocklabel',
                    width:80,
                    html:'첨부파일명'
                },{
                    flex:1,
                    xtype:'exblockfield',
                    reference:'fileNameBlock',
                    items:[]
                }]
            }]
        }]
    }]
})