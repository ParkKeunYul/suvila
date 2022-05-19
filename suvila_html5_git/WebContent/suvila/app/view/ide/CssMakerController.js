Ext.define('ExFrm.view.ide.CssMakerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cssmaker',
	init:function(){
		this.readFiles();
	},
	readFiles:function(){ 
    	console.log('readFiles');
    	var me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp',
			params:{
				path:lboServerPath + '//resources//css//common.css'
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				console.log('obj', obj);
				me.lookupReference('etc').setValue(obj);
		    				
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp',
			params:{
				path:lboServerPath + '//resources//css//commonafter.css'
				//fileName:'//sass//src//view//main//Main.scss'
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				console.log('obj', obj);
				me.lookupReference('src').setValue(obj);
		    				
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});
		/*
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp',
			params:{
				serverPath:lboServerPath,
				fileName:'//sass//var//all.scss'
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				console.log('obj', obj);
				me.lookupReference('var').setValue(obj);
		    				
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});	
		*/	
    }, 
    onSave:function(){
    	var me = this;
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			method:'POST',
			params:{
				content:me.lookupReference('etc').getValue(),
				path: lboServerPath + '//resources//css//common.css'
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				console.log('obj', obj);
				//me.lookupReference('etc').setValue(obj);
		    				
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			method:'POST',
			params:{
				content:me.lookupReference('etc').getValue(),
				path: lboServerPath + '//build//development//' + lboApplicationName + '//resources//css//common.css'
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				console.log('obj', obj);
				//me.lookupReference('etc').setValue(obj);
		    				
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});		
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			method:'POST',
			params:{
				content:me.lookupReference('src').getValue(),
				path: lboServerPath + '//resources//css//commonafter.css'
				//path: lboServerPath + '//sass//src//view//main//Main.scss'
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				console.log('obj', obj);
				//me.lookupReference('src').setValue(obj);
		    				
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});  
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			method:'POST',
			params:{
				content:me.lookupReference('src').getValue(),
				path: lboServerPath + '//build//development//' + lboApplicationName + '//resources//css//commonafter.css'
			},
			success:function(res){
				console.log('응답',res.responseText);
				var obj = res.responseText.trim();
				console.log('obj', obj);
				//me.lookupReference('src').setValue(obj);
		    				
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}
		});	
	  
		Ext.Msg.alert('확인','저장하였습니다.');	
    }
});