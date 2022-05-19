
Ext.define('ExFrm.view.ide.MainWidgetDeployController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.idemain',
    init:function(){
    	this.lookupReference('widgetDeployCont').clearInvalid();
    },
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    onNewFile:function(){
 		ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.TmplSelect','템플릿선택','');    	
    },
    onNewTmpl:function(){
    	ExFrm.app.getController('IdeController').setTmplMainStep2Bar('ExFrm.view.ide.TmplMakeStep2','',''); 
    },
    onCss:function(){
    	ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.CssMaker','CSS수정','');
    },
    onSaveFile:function(){
    	// 뷰 파일을 읽어와 생성한다.
    	getStringAll();
    },
    onAdd:function(){
    	var me = this;
    	Ext.Ajax.request({
    		type:'ajax',
    		url:'./jsp/isExist.jsp',
			params:{
				path: lboServerPath + lboUserServerPath + 
				lboFileSeperator + 'app' + 
				lboFileSeperator + 'view' + 
				lboFileSeperator + 'widget' + 
				lboFileSeperator + this.lookupReference('widgetDeployFile').getValue() + '.js'
			},
			success:function(res){
				var obj = Ext.decode(res.responseText);
				if(obj.success == true){
					Ext.Msg.alert('오류','파일이 존재합니다.');
					return;
				}
				else if( obj.success == false){

					Ext.Ajax.request({
						type:'ajax',
						url:'./jsp/fileWrite.jsp',
						params:{
							path: lboServerPath + lboUserServerPath + 
								lboFileSeperator + 'app' + 
								lboFileSeperator + 'view' + 
								lboFileSeperator + 'widget' + 
								lboFileSeperator + me.lookupReference('widgetDeployFile').getValue() + '.js',
							content: me.lookupReference('widgetDeployCont').getValue(),
						},
						success:function(res){
							var obj = JSON.parse(res.responseText);
							console.log('obj', obj);
							if(obj.success == false) {
								Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
								return;
							}
							Ext.Msg.alert(getLboLangItem('확인'),getLboLangItem('파일을 생성했습니다.'));
                            // History저장시작
                            exCommon.saveHistory(
                                lboServerPath + 
									lboFileSeperator + 'lib' + 
									lboFileSeperator + 'tmpljs' + 
									lboFileSeperator + 'history' + 
									lboFileSeperator + 'app' + 
									lboFileSeperator + 'view' + 
									lboFileSeperator + 'widget' + 
									lboFileSeperator + me.lookupReference('widgetDeployFile').getValue()+ '.' + exCommon.getNowDateTime(), 
                                me.lookupReference('widgetDeployCont').getValue());                                  
                            
						},
						failure:function(res){
							Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
						}
					});						
				}
			},
			failure:function(res){
				Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
			}
		});	    	
    },
    onUpdate:function(){ 	
    	var me = this;
    	Ext.Ajax.request({
    		type:'ajax',
    		url:'./jsp/isExist.jsp',
			params:{
				path: lboServerPath + this.lookupReference('widgetDeployFile').getValue(),
				content: this.lookupReference('widgetDeployCont').getValue(),
			},
			success:function(res){
				console.log('res', res);
				var obj = Ext.decode(res.responseText);
				console.log('obj', obj);
				if(obj.success == true){
					Ext.Ajax.request({
						type:'ajax',
						url:'./jsp/fileWrite.jsp',
						params:{
							path: lboServerPath + lboUserServerPath + me.lookupReference('widgetDeployFile').getValue(),
							content: me.lookupReference('widgetDeployCont').getValue(),
						},
						success:function(res){
							var obj = JSON.parse(res.responseText);
							console.log('obj', obj);
							if(obj.success == false) {
								Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
								return;
							}
							Ext.Msg.alert('확인','파일을 변경했습니다.');
                             
						},
						failure:function(res){
							Ext.Msg.alert("오류", res.responseText);
						}
					});						
				}
				else if( obj.success == false){
					Ext.Msg.alert('오류','파일이 존재하지 않습니다.');
				}
			},
			failure:function(res){
				console.log('res', res);
				Ext.Msg.alert("오류", res.responseText);
			}
		});	
    }
});
