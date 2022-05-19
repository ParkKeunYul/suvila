Ext.define('ExFrm.view.ide.ParamViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.paramview',
    init:function(){
        console.log('lboFileName', lboFolderName, lboFileName);
        var me = this;
        Ext.Ajax.request(
		{
			
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + 
                lboServerPath + 
                lboUserServerPath + 
                lboFileSeperator + 'extra' + 
                lboFileSeperator + 'json' + 
                lboFileSeperator + 'parameter' + 
                lboFileSeperator + lboFolderName + 
                lboFileSeperator + lboFileName + '.json',
			callback:function(obj, success, resObj){
				if(success == true){
		    	    var strCont = resObj.responseText.trim();
                    me.lookupReference('sendParams').setValue(strCont.trim());
                }
                else {
                    if(getLboLang() == 'english')
                        Ext.Msg.alert('Error', 'No Parameter Exist. Add parameter and you can use it later');
                    else 
                        Ext.Msg.alert('오류', '사전에 등록된 파라미터가 없습니다. 파라미터를 등록하면 다시 불러와 사용할 수 있습니다.');
                }
			}
		});	  
    },
    openPanel:{},
    receiveMethod:{},
    calledByOther:function(openPanel, receiveMethod, receiveParams){
        this.openPanel = openPanel;
        this.receiveMethod = receiveMethod;
        console.log('receiveParams', receiveParams);
        
        var receiveParamsStr = '';
        try{
            receiveParamsStr = Ext.encode(receiveParams);
        }
        catch(e){
            console.log('encode error', e);
        }
        this.lookupReference('receiveParams').setValue(receiveParamsStr);
    },
    onSendParam:function(){
        var me = this;
        Ext.Ajax.request({
            type:'ajax',
            url:'./jsp/fileWrite.jsp',
            params:{
                path: lboServerPath + 
                lboUserServerPath + 
                lboFileSeperator + 'extra' + 
                lboFileSeperator + 'json' + 
                lboFileSeperator + 'parameter' + 
                lboFileSeperator + lboFolderName + 
                lboFileSeperator + lboFileName + '.json',
                content:me.lookupReference('sendParams').getValue()
            },
            success:function(res){
				var obj = JSON.parse(res.responseText);
				console.log('obj', obj);
				if(obj.success == false) {
					Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
					return;
				}
                //alert('전달하였습니다.');
                //location.reload();
            },
            failure:function(res){
                if(getLboLang() == 'english')
                    alert("Error occur when saved parameter. - " + res.responseText);
                else 
                    alert("파라미터를 임시저장하는 중 오류가 발생했습니다." + res.responseText);
            }
        });
        
        var params = {}; 
        if(me.lookupReference('sendParams').getValue().trim().length != 0){
            try{
                params = Ext.decode(me.lookupReference('sendParams').getValue());
            }
            catch(e){
                if(getLboLang() == 'english')
                    Ext.Msg.alert('Error','Parameter must be JSON format.');
                else 
                    Ext.Msg.alert('오류','파라미터가 객체형식을 따르지 않았습니다.');
                return;
            }
        }
        ExFrm.app.getController('IdeController').selectedViewPanel.getController().called(params, me.openPanel, me.receiveMethod); 
        me.getView().destroy();
    }
});


/*

*/