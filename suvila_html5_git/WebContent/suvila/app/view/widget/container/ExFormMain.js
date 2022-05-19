Ext.define('ExFrm.view.widget.container.ExFormMain', {
    extend: 'Ext.form.Panel',
    xtype:'exformmain',
    reference:'regform',
    //bodyPadding:'2 2 2 2', 
    bodyPadding:'0 0 0 0',
    minWidth:100,
	maxWidth:2400,
    //maxWidth:1024,
    minHeight:100,
    //maxHeight:850, 세로방향은 길어질수 있다.      
    /* 
    numberCommaClear:function(){
		var b = this.query('[formfind=formfind]');
		for(var i=0; i< b.length; i++){
			var obj = b[i];
	    	if(obj.exType == 'number'){
	    		var objValue = obj.getValue();
	    		if(objValue == null)
	    			objValue = '';
	    		obj.setValue(objValue.replace(/,/g,''));
	    	}
	    }    	
    },
    */
    initComponent:function(){
    	this.callParent(arguments);
        /*
    	this.add({
    		xtype:'hidden',
    		name: exCommon.csrfName,
    		value: exCommon.csrfValue
    	},{
    		xtype:'hidden',
    		name:'lang',
    		value:exCommon.lang
    	},{
    		xtype:'hidden',
    		name:'game_event_cd',
    		value:exCommon.gameEventCd
    	},{
    		xtype:'hidden',
    		name:'system_cd',
    		value:exCommon.systemCd
    	});   	
        */
    },
   	invalidateForm:function(){
		var b = this.query('[formfind=formfind]');
		for(var i=0; i< b.length; i++){
			var obj = b[i];
			if(obj.exLabel == null){
				obj.exLabel = '해당항목';
			}
			//console.log('해당항목', obj);
			if(obj.exMand != null){		
				if( obj.xtype=='excheckboxgroup' ||		
					obj.xtype=='exradiogroup'){
					
					if(obj.getExValue() == ''){
						Ext.Msg.alert('확인',obj.exLabel + '은(는) 필수입력란입니다.');
						obj.focus();
						return false;						
					}
				}
				else if( obj.xtype=='exdatefield' ||		
					obj.xtype=='exdatefieldsrch'){
					if(obj.getValue() == null){
						setTimeout(function(){
							Ext.Msg.alert('확인',obj.exLabel + '은(는) 필수입력란입니다.');
						},50);
						obj.focus();
						return false;
					}
				}
				else {
					var objValue = obj.getValue();
					if(objValue == null){
						objValue = '';
					}
					objValue = objValue.trim();
					if(objValue == ''){
						setTimeout(function(){
							Ext.Msg.alert('확인',obj.exLabel + '은(는) 필수입력란입니다.');
						},50);
						obj.focus();
						return false;
					}
				}
			}
	    	if(obj.exType == 'number'){
	    		var objValue = obj.getValue();
				if(objValue == null){
					objValue = '';
				}
				objValue = objValue.trim();	    		
				
	    		//obj.setValue(objValue.replace(/,/g,''));
	    		if(	obj.xtype == 'extextfield' || 
	    			obj.xtype == 'extextfieldsrch'
	    		){
	    			if(objValue == null || objValue == '' || objValue == ' '){
		    			//Ext.Msg.alert('확인', obj.exLabel + '은(는) 숫자이어야 합니다.');	    		
		    			//obj.focus();
		    			//return false;
		    		}
		    		else {
			    		var val = objValue.replace(/,/g,'');
			    		if(isNaN(val)== true){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 숫자이어야 합니다.');
							},50);
			    			obj.focus();	    		
			    			return false;
			    		}
		    		}
		    	}
		    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
		    		if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){
		    			if(obj.exMin == obj.exMax){
			    			var val = objValue.replace(/,/g,'');
				    		if( Number(val) != Number(obj.exMin)){
								setTimeout(function(){
				    				Ext.Msg.alert('확인', obj.exLabel + '은(는) ' + obj.exMin + '(으)로 입력하셔야 합니다.');
								},50);
				    			obj.focus();
				    			return false;
				    		}
			    		}
		    		}
		    	}
		    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
		    		var val = objValue.replace(/,/g,'');
		    		if( Number(val) < Number(obj.exMin)){
						setTimeout(function(){
		    				Ext.Msg.alert('확인', obj.exLabel + '은(는) ' + obj.exMin + ' 이상 입력하셔야 합니다.');
						},50);
		    			obj.focus();
		    			return false;
		    		}
		    	}
		    	if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){
		    		var val = objValue.replace(/,/g,'');
		    		if( Number(val) > Number(obj.exMax)){
						setTimeout(function(){
		    				Ext.Msg.alert('확인', obj.exLabel + '은(는) ' + obj.exMax + ' 이하로 입력하셔야 합니다.');
						},50);
		    			obj.focus();
		    			return false;
		    		}
		    	}
	    	}    	
			if(obj.exType == 'string'){
				if( obj.xtype=='excheckboxgroup' ||		
					obj.xtype=='exradiogroup'){
				}
				else
				{				
					var objValue = obj.getValue().trim();
			    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
			    		if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){
			    			if(obj.exMin == obj.exMax){
					    		if( objValue.length != Number(obj.exMin)){
									setTimeout(function(){
					    				Ext.Msg.alert('확인', obj.exLabel + '은(는) ' + obj.exMin + '자로 입력하셔야 합니다.');
									},50);
					    			obj.focus();
					    			return false;
					    		}
					    	}
			    		}
			    	}
			    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
			    		if( objValue.length < Number(obj.exMin)){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 최소' + obj.exMin + '자 이상 입력하셔야 합니다.');
							},50);
			    			obj.focus();
			    			return false;
			    		}
			    	}
			    	if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){	    		
			    		if( objValue.length > Number(obj.exMax)){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 최대' + obj.exMax + '자 이하로 입력하셔야 합니다.');
							},50);
			    			obj.focus();
			    			return false;
			    		}
			    	}
			    }
	    	}
			if(obj.exType == 'stringonly'){
				if( obj.xtype=='excheckboxgroup' ||		
					obj.xtype=='exradiogroup'){
				}
				else
				{					
					var objValue = obj.getValue().trim();
					for(var i=0; i<9; i++){
					//	console.log('=============>' + objValue.search(i));
						if(objValue.search(i) >= 0){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 숫자를 입력할 수 없습니다.');
							},50);
			    			obj.focus();
			    			return false;
						}
					}
			    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
			    		if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){
			    			if(obj.exMin == obj.exMax){
					    		if( objValue.length != Number(obj.exMin)){
									setTimeout(function(){
					    				Ext.Msg.alert('확인', obj.exLabel + '은(는) ' + obj.exMin + '자로 입력하셔야 합니다.');
									},50);
					    			obj.focus();
					    			return false;
					    		}
					    	}
			    		}
			    	}			
			    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
			    		if( objValue.length < Number(obj.exMin)){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 최소' + obj.exMin + '자 이상 입력하셔야 합니다.');
							},50);
			    			obj.focus();
			    			return false;
			    		}
			    	}
			    	if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){	    		
			    		if( objValue.length > Number(obj.exMax)){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 최대' + obj.exMax + '자 이하로 입력하셔야 합니다.');
							},50);
			    			obj.focus();
			    			return false;
			    		}
			    	}
			    }
	    	}    	
			if(obj.xtype == 'exdatefield' ||
				obj.xtype == 'exdatefieldsrch' ){
				if( obj.xtype=='excheckboxgroup' ||		
					obj.xtype=='exradiogroup'){
				}
				else
				{						
					var objValue = obj.getRawValue().trim();
					if(objValue != ''){
						if(objValue.length !=8 && objValue.length !=10){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 날짜형식에 맞지 않습니다.');
							},50);
			    			obj.focus();
			    			return false;
						}
						if(exCommon.getDateAddDate( 0, '-', objValue) == ''){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 날짜형식에 맞지 않습니다.');
							},50);
			    			obj.focus();
			    			return false;					
						}
						var valCalc = exCommon.getDateAddDate( 0, '-', objValue);  
						var valCalc1 = exCommon.getDateAddDate( 1, '-', objValue);  
						var valCalc2 = exCommon.getDateAddDate( -1, '-', valCalc1);  
					//	console.log(valCalc);
						if(valCalc != valCalc2){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 날짜형식에 맞지 않습니다.(일자,윤년 등)');
							},50);
			    			obj.focus();
			    			return false;
						}
						
				    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
				    		if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){
				    			if(obj.exMin == obj.exMax){
						    		if( Number(objValue) != Number(obj.exMin)){
										setTimeout(function(){
						    				Ext.Msg.alert('확인', obj.exLabel + '은(는) ' + obj.exMin + '일자로 입력하셔야 합니다.');
										},50);
						    			obj.focus();
						    			return false;
						    		}
						    	}
				    		}
				    	}					
				    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
				    		var val = obj.getRawValue().replace(/-/g,'');
				    		if(Number(val) < Number(obj.exMin)){
								setTimeout(function(){
				    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 최소' + obj.exMin + '일자 이후로  입력하셔야 합니다.');
								},50);
				    			obj.focus();
				    			return false;
				    		}
				    	}
				    	if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){
				    		var val = obj.getRawValue().replace(/-/g,'');;	    		
				    		if( Number(val) > Number(obj.exMax)){
								setTimeout(function(){
				    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 최대' + obj.exMax + '일자 이전으로 입력하셔야 합니다.');
								},50);
				    			obj.focus();
				    			return false;
				    		}
				    	}
				    }
			    }
		    }		    	    	
			if(obj.exType == 'date'){
				
				if(obj.xtype == 'extextfield' ||
					obj.xtype == 'extextfieldsrch' ){
	
		    		var objValue = obj.getValue();
					if(objValue == null){
						objValue = '';
					}
					objValue = objValue.trim();	    		
					
					if(objValue != ''){
						if(objValue.length !=8 && objValue.length !=10){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 날짜형식에 맞지 않습니다.');
							},50);
			    			obj.focus();
			    			return false;
						}
						if(exCommon.getDateAddDate( 0, '-', objValue) == ''){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 날짜형식에 맞지 않습니다.');
							},50);
			    			obj.focus();
			    			return false;					
						}
	
						var valCalc = exCommon.getDateAddDate( 0, '-', objValue);  
						var valCalc1 = exCommon.getDateAddDate( 1, '-', objValue);  
						var valCalc2 = exCommon.getDateAddDate( -1, '-', valCalc1);  
					//	console.log(valCalc , valCalc2);
						if(valCalc != valCalc2){
							setTimeout(function(){
			    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 날짜형식에 맞지 않습니다.(일자,윤년 등)');
							},50);
			    			obj.focus();
			    			return false;
						}
	
				    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
				    		if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){
				    			if(obj.exMin == obj.exMax){
						    		if( Number(objValue) != Number(obj.exMin)){
										setTimeout(function(){
						    				Ext.Msg.alert('확인', obj.exLabel + '은(는) ' + obj.exMin + '일자로 입력하셔야 합니다.');
										},50);
						    			obj.focus();
						    			return false;
						    		}
						    	}
				    		}
				    	}					
				    	if(obj.exMin != null && obj.exMin != '' && obj.exMin != ' '){
				    		if( Number(objValue) < Number(obj.exMin)){		
								setTimeout(function(){	    			
				    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 최소' + obj.exMin + '일자 이후로 입력하셔야 합니다.');
								},50);
				    			obj.focus();
				    			return false;
				    		}
				    	}
				    	if(obj.exMax != null && obj.exMax != '' && obj.exMax != ' '){	    		
				    		if( Number(objValue) > Number(obj.exMax)){
								setTimeout(function(){
				    				Ext.Msg.alert('확인', obj.exLabel + '은(는) 최대' + obj.exMax + '일자 이전으로 입력하셔야 합니다.');
								},50);
				    			obj.focus();
				    			return false;
				    		}
				    	}
				    }
			    }
			}
		}
		return true;
	}
})