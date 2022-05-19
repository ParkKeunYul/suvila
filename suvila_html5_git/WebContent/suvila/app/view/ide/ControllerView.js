Ext.define('ExFrm.view.ide.ControllerView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.controllerview',
    requires:['ExFrm.view.ide.ControllerViewController',
    ], 
    controller:'controllerview',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('뷰컨트롤러'),
    items:[
    /*
    {
    	flex:1,
    	reference:'fileCont',
    	name:'fileCont',
    	xtype:'exhtmleditor',
    	spellcheck:'false'
	}
    */
    {
        flex:1,
        reference:'fileCont',
        name:'fileCont',
        xtype:'panel',
        html:'<div id="ExFrmControllerCode" style="width:100%;height:100%"></div>',
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
                var me = this;
                console.log('11cmp', me, cmp, document.getElementById('ExFrmControllerCode'));
                //require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
                setTimeout(function(){
                    require(['vs/editor/editor.main'], function() {
                        cmp.editor = monaco.editor.create(document.getElementById('ExFrmControllerCode'), {
                            value:cmp.myValue,
                        theme : 'vs-dark',
                        language: 'javascript'});

                        console.log('>>>>>', cmp.editor);
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
            text:getLboLangItem('저장'),
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
            text:getLboLangItem('뷰컨트롤러 생성'),
            handler:'onCreate'
        },,{
            xtype:'button',
            text:getLboLangItem('코드 보기'),
            menu:{
                items:[
                {
                    text:'Ajax ' + getLboLangItem('호출'),
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' + 
                        '        var params = {};\n' + 
                        '        // me.callAjax(me,  lboUserJsonPath +  \'/view/sample/JsonFileName.json\', params, me.onMyMethodCallback );\n' + 		
                        '        me.callAjax(me, \'./test/sampleOne.jsp\', params, me.onMyMethodCallback );\n' +
                        '        \n' + 
                        '        // 콜백메소드 \n' +  
                        '        MyMethodCallback:function(me, success, res, record){\n' + 		
                        '            // add your code\n' + 	
                        '        }';           
                        
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);
                    }
                },{
                    text:'Store ' + getLboLangItem('호출'),
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' + 
                        '        var params = {}; \n' + 
                        '        me.callStore(me, \'mainInfo\', params, me.onMyMethodCallback);\n' + 
                        '        \n' + 
                        '        // 콜백메소드\n' + 
                        '        onMyMethodCallback:function(me, success, records, operation){\n' + 
                        '            // add your code\n' + 
                        '        }';
                        
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);
                    }
                },{
                    text:'Form submit',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' + 
                        '        me.callForm(me, \'./test/sampleSubmit.jsp\', me.onMyMethodCallback);\n' + 
                        '        \n' + 
                        '        // 콜백메소드\n' + 
                        '        onMyMethodCallback:function(me, success, form, action){\n' +
                        '            console.log(\'action\', action);\n' +	
                        '            // add your code;\n' +			
                        '        }';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }
                },{
                    text:'Record to Items',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        // 반환객체가 data의 info일 경우\n' + 
                        '        var info = record.data.info;\n' + 
                        '        this.lookupReference(\'myReferenceName1\').setValue(info.myFieldName1);\n' + 
                        '        this.lookupReference(\'myReferenceName2\').setValue(info.myFieldName2);';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }
                },{
                    text:'Record Copy',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var selection = this.lookupReference(\'mainList\').getView().getSelectionModel().getSelection().copy();\n' + 
                        '        this.getViewModel().getStore(\'mainInfo\').add(selection);';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }
                },{
                    text:'Grid Row ' + getLboLangItem('선택'),
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var selection = this.lookupReference(\'mainList\').getView().getSelectionModel().getSelection();\n' + 
                        '        console.log(selection[0]);\n';
                        
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }
                },{
                    text:'Grid Row '+ getLboLangItem('선택') + '(Click)',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        selectedIndexMainList:-1,\n' + 
                        '        selectedRecordMainList:{},\n' + 
                        '        sonMainListClick:function(grid, record, item, index, e){\n' + 
                        '            this.selectedRecordMainList= record;\n' + 
                        '            this.selectedIndexMainList= index;\n' +                                                                                               
                        '        }';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                       
                    }
                },{
                    text:'Grid Row ' + getLboLangItem('삭제'),
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var selection = this.lookupReference(\'mainList\').getView().getSelectionModel().getSelection();\n' + 
                        '        if(selection != null){\n' + 
                        '            this.lookupReference(\'mainList\').getStore().remove(selection[0]);\n' + 
                        '        }\n';
                        
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }
                },{
                    text:'Grid Row ' + getLboLangItem('추가'),
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var data = {   // 그리드의 필드에 맞게 추가\n' + 
                        '                custNo:\'\',\n' + 
                        '                custName:\'\'\n' + 
                        '        }\n' + 
                        '        this.getViewModel().getStore(\'mainInfo\').add(data);\n';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }                
                },{
                    text:'Get grid all data',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var me = this;\n' + 
                        '        var jsonData = [];\n' +
                        '        var records = this.getViewModel().getStore(\'mainInfo\').getRange();\n' +
                        '        for (var i=0; i < records.length; i++){\n' +
                        '            // 데이터를 사용하려면 console.log(records[i].data.custNo);\n' +
                        '            jsonData.push(records[i].data);\n' +
                        '       }\n' +
                        '       console.log(Ext.encode(jsonData));\n';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }                
                },{
                    text:'Get grid added data',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var me = this;\n' + 
                        '        var jsonData = [];\n' +
                        '        var records = this.getViewModel().getStore(\'mainInfo\').getNewRecords();\n' +
                        '        for (var i=0; i < records.length; i++){\n' +
                        '            // 데이터를 사용하려면 console.log(records[i].data.custNo);\n' +
                        '            jsonData.push(records[i].data);\n' +
                        '       }\n' +
                        '       console.log(Ext.encode(jsonData));\n';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }                
                },{
                    text:'Get grid updated data',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var me = this;\n' + 
                        '        var jsonData = [];\n' +
                        '        var records = this.getViewModel().getStore(\'mainInfo\').getUpdatedRecords();\n' +
                        '        for (var i=0; i < records.length; i++){\n' +
                        '            // 데이터를 사용하려면 console.log(records[i].data.custNo);\n' +
                        '            jsonData.push(records[i].data);\n' +
                        '       }\n' +
                        '       console.log(Ext.encode(jsonData));\n';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }                
                },{
                    text:'Get grid added and updated data',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var me = this;\n' + 
                        '        var jsonData = [];\n' +
                        '        var records = this.getViewModel().getStore(\'mainInfo\').getModifiedRecords();\n' +
                        '        for (var i=0; i < records.length; i++){\n' +
                        '            // 데이터를 사용하려면 console.log(records[i].data.custNo);\n' +
                        '            jsonData.push(records[i].data);\n' +
                        '       }\n' +
                        '       console.log(Ext.encode(jsonData));\n';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }                
                },{
                    text:'Get grid deleted data',
                    handler:function(){
                        var param = 
                        '        // 호출메소드\n' +
                        '        var me = this;\n' + 
                        '        var jsonData = [];\n' +
                        '        var records = this.getViewModel().getStore(\'mainInfo\').getRemovedRecords();\n' +
                        '        for (var i=0; i < records.length; i++){\n' +
                        '            // 데이터를 사용하려면 console.log(records[i].data.custNo);\n' +
                        '            jsonData.push(records[i].data);\n' +
                        '       }\n' +
                        '       console.log(Ext.encode(jsonData));\n';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }                
                },{
                    text:'Grid Multi sort',
                    handler:function(){
                        var param = 
                        '        this.getViewModel().getStore(\'mainInfo\').sort([{\n' +
                        '            property: \'custName\',\n' +
                        '            direction: \'DESC\'\n' +
                        '        },{\n' + 
                        '            property: \'point\',\n' +
                        '            direction: \'ASC\'\n' +
                        '        }]);';
                        var panel = Ext.create('ExFrm.view.ide.CodeView');
                        panel.show();
                        panel.getController().calledByOther(param);	
                    }     
                }]
            }
        }]	
    }
});
