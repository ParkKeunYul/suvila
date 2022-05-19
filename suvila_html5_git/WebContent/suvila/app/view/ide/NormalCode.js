Ext.define('ExFrm.view.ide.NormalCode', {
    extend: 'Ext.panel.Panel',
    alias:'widget.normalcode',
    requires:['ExFrm.view.ide.NormalCodeController',
    ], 
    controller:'normalcode',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('파일 보기'),
    items:[
    {
        flex:1,
        reference:'fileCont',
        name:'fileCont',
        xtype:'panel',
        html:'<div id="ExFrmNormalCodeViewCode" style="width:100%;height:100%"></div>',
        editor:{},
        afCls:false,
        setCls:false,
        myValue:'',
        setValue:function(val){
            this.setExValue(val);
        },
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
        getValue:function(val){
            return this.getExValue(val);
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
                        cmp.editor = monaco.editor.create(document.getElementById('ExFrmNormalCodeViewCode'), {
                        value:cmp.myValue,
                        theme : 'vs-dark',
                        language: 'javascript'});
                    });
                    cmp.afCls = true;     
                },100);                       
            }
        }
    }],
    dockedItems: {
        xtype: 'toolbar',
        reference:'normalCodeToolbar',
        dock: 'top',
        style:'background-color:orange',
        items:[
        {
            xtype:'button',
            name:'save',
            text: getLboLangItem('저장'),
            handler:'onSave'
        },{
            xtype:'button',
            text:'Big',
            handler:'onBigFont'
        },{
            xtype:'button',
            text:'Small',
            handler:'onSmallFont'
        }]	
    }
});
