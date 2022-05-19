Ext.define('ExFrm.view.ide.ViewView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.viewview',
    requires:['ExFrm.view.ide.ViewViewController',
    ], 
    controller:'viewview',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title:getLboLangItem('뷰코드'),
    items:[
    /*
    {
    	flex:1,
    	reference:'fileCont',
    	name:'fileCont',
    	//xtype:'textarea',
    	xtype:'exhtmleditor',
	}*/
    {
        flex:1,
        reference:'fileCont',
        name:'fileCont',
        xtype:'panel',
        html:'<div id="ExFrmViewCode" style="width:100%;height:100%"></div>',
        editor:{},
        afCls:false,
        setCls:false,
        myValue:'',
        setExValue:function(val){
            var me = this;
            if(me.afCls==false){
                me.setCls = true;
                me.myValue = val;
            }
            else {
                me.editor.setValue(val);
            }                
        },
        getExValue:function(){
            var me = this;
            console.log(me.editor.getValue());
            return me.editor.getValue();                              
        },
        listeners:{
            afterrender:function(cmp){
                console.log('cmp', cmp);
                //require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
                setTimeout(function(){
                    require(['vs/editor/editor.main'], function() {
                        cmp.editor = monaco.editor.create(document.getElementById('ExFrmViewCode'), {
                        value:cmp.myValue,
                        theme : 'vs-dark',
                        language: 'javascript'});
                    });
                    cmp.afCls = true;     
                },100);                       
            }
        }
    }    
    ],
    dockedItems: {
        xtype: 'toolbar',
        dock: 'top',
        style:'background-color:orange',
        items:[
        {
            xtype:'button',
            name:'save',
            text:getLboLangItem('저장'),
            handler:'onSave'
        },{
            xtype:'tbspacer',
            width:1
        },{
            xtype:'button',
            text:getLboLangItem('디자인모드 보기'),
            handler:'onViewDesigner'
        },{
            xtype:'tbspacer',
            width:5
        },{
            xtype:'button',
            text:getLboLangItem('코드 정렬'),
            handler:'onArrangeCode'
        },{
            xtype:'tbspacer',
            width:5
        },{
            xtype:'button',
            text:'Big',
            handler:'onBigFont'
        },{
            xtype:'tbspacer',
            width:1
        },{
            xtype:'button',
            text:'Small',
            handler:'onSmallFont'
        }]
    }
});
