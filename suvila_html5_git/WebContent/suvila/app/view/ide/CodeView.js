Ext.define('ExFrm.view.ide.CodeView', {
    extend: 'Ext.window.Window',
    alias:'widget.codeview',
    requires:['ExFrm.view.ide.CodeViewController',
    ], 
    controller:'codeview',
    layout:'fit',
    title:getLboLangItem('소스코드 (아래코드를 복사해서 사용하세요.)'),
    width:800,
    height:500,
    modal:true,
    isModel:true,
    items:[    
    {
        flex:1,
        reference:'codeView',
        name:'codeView',
        xtype:'panel',
        html:'<div id="ExFrmCodeViewCode" style="width:100%;height:100%"></div>',
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
                        cmp.editor = monaco.editor.create(document.getElementById('ExFrmCodeViewCode'), {
                        value:cmp.myValue,
                        theme : 'vs-dark',
                        language: 'javascript'});
                    });
                    cmp.afCls = true;     
                },100);                       
            }
        }
    }]
});
