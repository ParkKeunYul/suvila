Ext.define('ExFrm.view.ide.FileUploadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fileupload',
	retMethod:{},
	openerObj:{},
    selectedItemNode:{},
    selectedParentNode:{},    
    calledByOther:function(kind, selectedItemNode, selectedParentNode,openerMethod,openerObj){
        var me = this;
    	this.openerObj = openerObj
		this.retMethod = openerMethod;
        me.selectedItemNode = selectedItemNode;
        me.selectedParentNode = selectedParentNode;

        var tempPath = '';
        if(me.selectedItemNode.data.leaf == false){
            tempPath = me.selectedItemNode.data.path;
        }
        else {
            tempPath = me.selectedParentNode.data.path;
        }
        var path = '';
        if( me.selectedItemNode.data.type == 'app' ){
            path = lboServerPath + lboUserServerPath + 
                    lboFileSeperator + 'app' +  
                    lboFileSeperator + tempPath
        } 
        else if( me.selectedItemNode.data.type == 'server' ){
            path = lboServerPath + lboUserServerPath + 
                    lboFileSeperator + 'extra' +  
                    lboFileSeperator + tempPath
        }
        else if( me.selectedItemNode.data.type == 'application' ){
            path = lboServerPath + lboUserServerPath + 
                    lboFileSeperator + 'app' + 
                    lboFileSeperator + tempPath
        }
        this.lookupReference("path").setValue(path);
 
        
    },  
    onUpload:function(){
        /*
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
        */     
        /*
        console.log(me.selectedItemNode, me.selectedParentNode);
        if( me.selectedItemNode.data.type == 'app' ){
            var indexTemp = text.indexOf('.js');
            if(indexTemp == -1){
                alert('파일명은 .js로 끝나야 합니다.');
                return
            }
        }
        var tempPath = '';
        if(me.selectedItemNode.data.leaf == false){
            tempPath = me.selectedItemNode.data.path;
        }
        else {
            tempPath = me.selectedParentNode.data.path;
        }
        var path = ''
        if( me.selectedItemNode.data.type == 'app' ){
            path = lboServerPath + lboUserServerPath + 
                    lboFileSeperator + 'app' +  
                    lboFileSeperator + tempPath + 
                    lboFileSeperator + text;
        } else if( me.selectedItemNode.data.type == 'server' ){
            path = lboServerPath + lboUserServerPath + 
                    lboFileSeperator + 'extra' +  
                    lboFileSeperator + tempPath + 
                    lboFileSeperator + text;
        }
        */
        var me = this;
        
        var fileName = this.lookupReference('fileName').getValue();
        console.log('fileName', fileName);
        if(fileName.length > 5){
            if(fileName.substring(fileName.length-4, fileName.length).toUpperCase() == '.JSP'){
                if(getLboLang() == 'english')
                    Ext.Msg.alert('Error', 'File Extenstion must not be "jsp"'); 
                else 
                    Ext.Msg.alert('확인', '확장자가 JSP인 파일은 업로드 할 수 없습니다.'); 
                return;
            }
        }
        
        var form = this.lookupReference('regForm').getForm();
        //var form = me.lookupReference('regform').getForm();
        form.url = './jsp/fileUpload.jsp';
        form.submit({
            scope:me,
            headers: {'Content-type':'multipart/form-data'},
			success:function(form, action){
                console.log('...success', action);
                me.retMethod(
                    me.lookupReference("path").getValue(),
                    action.result.data.fileName,
                    this.openerObj
                )
                me.getView().destroy();
            },
            failure:function(form, action){
                console.log('...failure');
            }
        })
        
        /*
    	this.retMethod(
    		this.lookupReference('path').getValue(),
    		this.lookupReference('propValue').getValue(),
    		this.openerObj);
    	this.getView().destroy();
        */
    },
    onCancel:function(){
    	this.getView().destroy();
    }
});