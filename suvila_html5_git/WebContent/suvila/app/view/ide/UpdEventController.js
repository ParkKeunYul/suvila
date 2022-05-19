Ext.define('ExFrm.view.ide.UpdEventController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.updevent',
	retMethod:{},
	openerObj:{},
    calledByOther:function(kind, propName, propValue,openerMethod,openerObj){
    	this.openerObj = openerObj
		this.retMethod = openerMethod;
		this.lookupReference('propName').setValue(propName);
		this.lookupReference('propValue').setValue(propValue);
    },  
    onSave:function(){
        
        if(this.lookupReference('propName').getValue().trim().length == 0){
            Ext.Msg.alert('속성명이 입력되지 않았습니다.');
            return;
        }
        if(this.lookupReference('propValue').getValue().trim().length == 0){
            Ext.Msg.alert('속성값이 입력되지 않았습니다.');
            return;
        }
        if(this.lookupReference('propName').getValue().indexOf('\'') != -1){
            Ext.Msg.alert('속성에 \' (작은 따옴표)가 존재합니다.');
            return;
        } 
        if(this.lookupReference('propName').getValue().indexOf('"') != -1){
            Ext.Msg.alert('속성에 " (큰 따옴표)가 존재합니다.');
            return;
        }
        if(this.lookupReference('propName').getValue().indexOf('{') != -1){
            Ext.Msg.alert('속성에 { (브레이스릿)이 있습니다.');
            return;
        }        
        if(this.lookupReference('propName').getValue().indexOf('}') != -1){
            Ext.Msg.alert('속성에 } (브레이스릿)이 있습니다.');
            return;
        }      
        
        var ret = {};
        try{
            ret = Ext.decode(this.lookupReference('propValue').getValue());
        }
        catch(e){
            Ext.Msg.alert('오류', '속성이 객체 형식에 맞지 않습니다.');
            return;
        }  
                      
    	this.retMethod(
    		this.lookupReference('propName').getValue(),
    		this.lookupReference('propValue').getValue(),
    		this.openerObj);
    	this.getView().destroy();
    },
    onCancel:function(){
    	this.getView().destroy();
    }
});