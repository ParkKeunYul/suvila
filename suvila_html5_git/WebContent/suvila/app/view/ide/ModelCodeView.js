Ext.define('ExFrm.view.ide.ModelCodeView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.modelcodeview',
    requires:['ExFrm.view.ide.ModelCodeViewController',
    ], 
    controller:'modelcodeview',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('뷰코드'),
    items:[
    /*
    {
    	flex:1,
    	reference:'fileCont',
    	name:'fileCont',
    	xtype:'exhtmleditor',
	}*/
    {
        flex:1,
        reference:'fileCont',
        name:'fileCont',
        xtype:'panel',
        html:'<div id="ExFrmModelCode" style="width:100%;height:100%"></div>',
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
                var me = this;
                setTimeout(function(){
                    require(['vs/editor/editor.main'], function() {
                        me.editor = monaco.editor.create(document.getElementById('ExFrmModelCode'), {
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
        },{
            xtype:'button',
            name:'new',
            text: getLboLangItem('뷰모델 생성'),
            handler:'onCreate'
        },{
            xtype:'button',
            text: getLboLangItem('코드 보기'),
            menu:{
                items:[
                {
                    text: getLboLangItem('스토어생성(그리드) 코드'),
                    handler:function(){
                        var param = 
                        '        mainInfo:{\n' + 
                        '            fields:[\'field1\'],\n' +
                        '            proxy:{\n' +
                        '                type:\'ajax\',\n' +
                        '                url:\'./test/sampleList.jsp\',\n' +
                        '                reader:{\n' +
                        '                    type:\'json\',\n' +
                        '                    rootProperty:\'data.list\',\n' +
                        '                    keepRawData:true\n' +
                        '                }\n' +
                        '            },\n' +
                        '            autoLoad:false,\n' +
                        '        }';
                        
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);
                    }
                },{
                    text: getLboLangItem('스토어생성(페이지그리드) 코드'),
                    handler:function(){
                        var param = 
                        '        mainInfo:{\n' + 
                        '            fields:[\'field1\'],\n' +
                        '            proxy:{\n' +
                        '                type:\'ajax\',\n' +
                        '                url:\'./test/sampleList.jsp\',\n' +
                        '                reader:{\n' +
                        '                    type:\'json\',\n' +
                        '                    rootProperty:\'data.list\',\n' +
                        '                    totalProperty:\'listTotalSize\',\n' +
                        '                    keepRawData:true\n' +
                        '                }\n' +
                        '            },\n' +
                        '            autoLoad:false,\n' +
                        '            pageSize:10\n' +
                        '        }';
                        
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);
                    }
                },{
                    text:getLboLangItem('스토어생성(트리) 코드'),
                    handler:function(){
                        var param = 
                        '        treeInfo:{\n' + 
                        '           type:\'tree\',\n' + 
                        '           fields:[\'name\', \'code\'],\n' + 
                        '           proxy:{\n' + 
                        '               type:\'ajax\',\n' + 
                        '               url:\'./test/sampleTree.jsp\',\n' + 
                        '               reader:{\n' + 
                        '                   type:\'json\',\n' + 
                        '               }\n' + 
                        '           },\n' + 
                        '           autoload:false\n' + 
                        '       }';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }
                }]
            }
        }]	
    }
});
