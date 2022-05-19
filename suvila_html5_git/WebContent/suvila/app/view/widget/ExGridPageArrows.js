Ext.define('ExFrm.view.widget.ExGridPageArrows', {
    extend: 'Ext.panel.Panel',
    xtype:'exgridpagearrows',
    name:'exGridPageArrows',
    exInitStr:"{    \n        xtype:'exgridpagearrows'\n,     storeName:'',\n    totalProperty:'listTotalSize',\n     limit:10,\n     pageNumberCount:5\n    }",
    storeName:'',			// 설정값.
    callbackFunc:{},				// 설정값.
	params:{},						// 설정값.
	totalProperty:'listTotalSize',	// 설정값.
	pageNumberCount:5,				// 설정값.
	limit:10,						// 설정값.
	
	startButtonNum:0,
	totalSize:0,
	currPage:0,
	maxPage:0,
	hideLimitControl:false,
    layout:{
        type:'hbox',
        align:'stretch'
    },    
	items:[
	{
		name:'exGridPageTotCount',
		html:'총: 0',
		width:100
	},{
		xtype:'tbspacer',
		flex:1
	},{
		xtype:'button',
		text:'<<',
		name:'arrowFirst',
		hidden:true,
		cls:'exgridfirst',
		handler:function(){
	        var rootView = this.up('[isRootView=true]');
	        var rootComp = this.up('[xtype=exgridpagearrows]');
	        rootComp.currPage=1;
	        rootComp.params.page = rootComp.currPage;
	        rootComp.params.limit = rootView.limit;	        
	        var storeName = rootComp.storeName;
	        rootView.getViewModel().getStore(rootComp.storeName).previousPage({
	            params:rootComp.params,
	            callback:function(records, operation, success){
	            	if(success == true){
		            	eval('var totalPage = rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.data.' + rootView.getViewModel().getStore(rootComp.storeName).config.proxy.reader.totalProperty);
						rootComp.down('[name=exGridPageTotCount]').setHtml('총 : ' + totalPage);
						rootComp.totalSize = totalPage;	  
						rootComp.buttonControl();   
					}
					else{
			            try{
			                Ext.Msg.alert('오류', rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.msg);
			            }
			            catch(e){
			                Ext.Msg.alert('오류', operation.error.response.responseText);
			            }						
					}       	
	            },
	            scope:this
	        });			
		}			
	},{
		xtype:'tbspacer',
		width:10
	},{
		xtype:'button',
		text:'< PREV',
		cls:'exgridprev',
		name:'arrowPrev',
		hidden:true,
		handler:function(){
	        var rootView = this.up('[isRootView=true]');
	        var rootComp = this.up('[xtype=exgridpagearrows]');
	        //rootComp.currPage--;
	        rootComp.currPage = rootComp.startButtonNum-1;
	        rootComp.params.page = rootComp.currPage;
	        rootComp.params.limit = rootView.limit;
	        
	        var storeName = rootComp.storeName;
	        
	        
	        rootView.getViewModel().getStore(rootComp.storeName).previousPage({
	            params:rootComp.params,
	            callback:function(records, operation, success){
	            	if(success == true){
		            	eval('var totalPage = rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.data.' + rootView.getViewModel().getStore(rootComp.storeName).config.proxy.reader.totalProperty);
						rootComp.down('[name=exGridPageTotCount]').setHtml('총 : ' + totalPage);
						rootComp.totalSize = totalPage;	  
						rootComp.buttonControl();   
					}
					else{
			            try{
			                Ext.Msg.alert('오류', rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.msg);
			            }
			            catch(e){
			                Ext.Msg.alert('오류', operation.error.response.responseText);
			            }
					}
	            },
	            scope:this
	        });			
		}	
	},{
		xtype:'tbspacer',
		width:10
	},{
		name:'gridNumberButtons',
		layout:'hbox'
	},{
		xtype:'tbspacer',
		width:10
	},{
		xtype:'button',
		text:'NEXT >',
		name:'arrowNext',
		hidden:true,
		handler:function(){
	        var rootView = this.up('[isRootView=true]');
	        var rootComp = this.up('[name=exGridPageArrows]');
	        var storeName = rootComp.storeName;
	        //rootComp.currPage++;
	        rootComp.currPage = rootComp.startButtonNum + rootComp.pageNumberCount;
	       	rootComp.params.page = rootComp.currPage;
	        rootComp.params.limit = rootView.limit;
	        rootView.getViewModel().getStore(rootComp.storeName).nextPage({
	            params:rootComp.params,
	            callback:function(records, operation, success){
	            	if(success == true){
		            	eval('var totalPage = rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.data.' + rootView.getViewModel().getStore(rootComp.storeName).config.proxy.reader.totalProperty);
						rootComp.down('[name=exGridPageTotCount]').setHtml('총 : ' + totalPage);
						rootComp.totalSize = totalPage;	  
						rootComp.buttonControl();   
					}
					else{
			            try{
			                Ext.Msg.alert('오류', rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.msg);
			            }
			            catch(e){
			                Ext.Msg.alert('오류', operation.error.response.responseText);
			            }						
					}       	
	            },
	            scope:this
	        });			        
		}			
	},{
		xtype:'tbspacer',
		width:10
	},{
		xtype:'button',
		text:'>>',
		name:'arrowEnd',
		cls:'exgridend',
		hidden:true,
		handler:function(){
	        var rootView = this.up('[isRootView=true]');
	        var rootComp = this.up('[name=exGridPageArrows]');
	        var storeName = rootComp.storeName;
	        rootComp.currPage = rootComp.maxPage;
	       	rootComp.params.page = rootComp.currPage;
	        rootComp.params.limit = rootView.limit;
	        rootView.getViewModel().getStore(rootComp.storeName).nextPage({
	            params:rootComp.params,
	            callback:function(records, operation, success){
	            	if(success == true){
		            	eval('var totalPage = rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.data.' + rootView.getViewModel().getStore(rootComp.storeName).config.proxy.reader.totalProperty);
						rootComp.down('[name=exGridPageTotCount]').setHtml('총 : ' + totalPage);
						
						console.log('1111',2222);
						
						rootComp.totalSize = totalPage;	  
						rootComp.buttonControl();   
					}
					else{
			            try{
			                Ext.Msg.alert('오류', rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.msg);
			            }
			            catch(e){
			                Ext.Msg.alert('오류', operation.error.response.responseText);
			            }						
					}       	
	            },
	            scope:this
	        });
	   }		
	},{
		xtype:'tbspacer',
		flex:1
	/*},{
        xtype:'combobox',  
        fieldLabel:'페이지당 건수',
        cls:'exgridrowperpage',
        labelWidth:90,
        labelAlign:'right',
        width:160,
        name:'rowPerPage',
        reference:'rowPerPage',
        displayField: 'name',
        valueField: 'value',
        value:'10',
        store:{
            fields:['name','value'],
            data:[
               {'name':'10', 'value':'10'},
               {'name':'20', 'value':'20'},
               {'name':'40', 'value':'40'},
               {'name':'100', 'value':'100'},
               {'name':'200', 'value':'200'}
            ]
        },
        listeners:{
        	change:function(){
		        var rootView = this.up('[isRootView=true]');
		        var rootComp = this.up('[xtype=exgridpagearrows]');
		        rootComp.limit = this.getValue();
		        rootComp.params.page = 1;
		        rootComp.params.limit = rootComp.limit;
		        var storeName = rootComp.storeName;
		        rootView.getViewModel().getStore(storeName).setPageSize(rootComp.limit );
		        if(rootComp.totalSize != 0){
			        rootView.getViewModel().getStore(rootComp.storeName).load({
			            params:rootComp.params,
			            callback:function(records, operation, success){
			            	if(success == true){
				            	eval('var totalPage = rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.data.' + rootView.getViewModel().getStore(rootComp.storeName).config.proxy.reader.totalProperty);
								rootComp.down('[name=exGridPageTotCount]').setHtml('총 : ' + totalPage);
								rootComp.totalSize = totalPage;	  
								rootComp.buttonControl();   
							}
							else{
					            try{
					                Ext.Msg.alert('오류', rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.msg);
					            }
					            catch(e){
					                Ext.Msg.alert('오류', operation.error.response.responseText);
					            }						
							}       	
			            },
			            scope:this
			        });
			    }
        	}
        }*/
	}],
	initComponent:function(){
		this.callParent(arguments);
		
		if(this.limit== null){
			this.limit = 10;
		}
		if(this.limit== ''){
			this.limit = 10;
		}		
		for( var i=1; i <= Number(this.pageNumberCount); i++){
			var isHidden = true;
			if(i==1) isHidden = false;
			this.down('[name=gridNumberButtons]').add({
				xtype:'button',
				text:i,
				name:'pageNumber' + i,
				cls:'exgridNumbers',
				hidden:isHidden,
				handler:function(){
			        var rootView = this.up('[isRootView=true]');
			        var rootComp = this.up('[xtype=exgridpagearrows]');
					if(rootComp.totalSize == 0){
						return;
					}
			        rootComp.currPage = this.getText();
			        rootComp.params.page = rootComp.currPage;
			        rootComp.params.limit = rootComp.limit;
			        var storeName = rootComp.storeName;
			        rootView.getViewModel().getStore(storeName).setPageSize( rootComp.limit );
			        rootView.getViewModel().getStore(rootComp.storeName).load({
			            params:rootComp.params,
			            callback:function(records, operation, success){
			            	if(success == true){
				            	eval('var totalPage = rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.data.' + rootView.getViewModel().getStore(rootComp.storeName).config.proxy.reader.totalProperty);
								rootComp.down('[name=exGridPageTotCount]').setHtml('총 : ' + totalPage);
								rootComp.totalSize = totalPage;	  
								rootComp.buttonControl();   
							}
							else{
					            try{
					                Ext.Msg.alert('오류', rootView.getViewModel().getStore(storeName).getProxy().getReader().rawData.msg);
					            }
					            catch(e){
					                Ext.Msg.alert('오류', operation.error.response.responseText);
					            }						
							}       	
			            },
			            scope:this
			        });		
				}	
			});
			if(i != Number(this.pageNumberCount)){
				this.down('[name=gridNumberButtons]').add({
					xtype:'tbspacer',
					width:10
				});
			}
		}
		console.log('-----------------', this.hideLimitControl);
		if(this.hideLimitControl == true){
			this.down('[name=rowPerPage]').setHidden(true);
		}
	},
	setParams:function(params){
		this.params = params;
	},
	//initInfo:function(totalSize){
	initInfo:function(totalSize){
		console.log('호출됨.....................');
		var rootView = this.up('[isRootView=true]');
		var rootComp = this;//this.up('[xtype=exgridpagearrows]');
		//console.log('rootComp', rootComp, this);
		eval('var totalSize = rootView.getViewModel().getStore(rootComp.storeName).getProxy().getReader().rawData.data.' + rootView.getViewModel().getStore(rootComp.storeName).config.proxy.reader.totalProperty);
		this.totalSize = totalSize;
		this.currPage = 1;
		console.log('호출됨.....................2222', totalSize);
		this.down('[name=exGridPageTotCount]').setHtml('총 : ' + totalSize);
		if(this.hideLimitControl != true){
			this.down('[name=rowPerPage]').setHidden(false);
		}
		else {
			this.down('[name=rowPerPage]').setHidden(true);
		}
		this.buttonControl();
	},
	buttonControl:function(){
	//pageNumberCount:5,	// 설정값
	//limit:10,	// 설정값
	//totalSize:0,
	//currPage:0,

        var rootView = this.up('[isRootView=true]');
		console.log('Math.floor(this.currPage/this.pageNumberCount)', Math.floor(this.currPage/this.pageNumberCount));
		this.startButtonNum = Math.floor(this.currPage/this.pageNumberCount);
		if(this.currPage % this.pageNumberCount != 0){
			this.startButtonNum++;
		}
		console.log('this.startButtonNum' + this.startButtonNum);
		console.log('this.currPage/this.pageNumberCount' + this.currPage/this.pageNumberCount +':' + this.currPage + ',' + this.pageNumberCount);
		this.startButtonNum = (Number(this.startButtonNum)-1) * Number(this.pageNumberCount) + 1;
		console.log('this.startButtonNum:' + this.startButtonNum);
		this.maxPage = Math.floor(this.totalSize/this.limit);
		if(this.totalSize % this.limit != 0){
			this.maxPage++;
		}
		console.log('maxPage:' + this.maxPage);
		// 버튼개수만큰 펼쳐질 페이지수  pageNumberCount 5 ,총 페이지 6이라면 -> 2
		var displayPageNum = Math.floor(this.maxPage / this.pageNumberCount);
		if(this.maxPage%this.pageNumberCount != 0){
			displayPageNum++;	
		}
		console.log('displayPageNum:' + displayPageNum);
		var currentPageNum = Math.floor(this.currPage / this.pageNumberCount);
		if(this.currPage % this.pageNumberCount != 0){
			currentPageNum++;	
		}
		//console.log('this.startButtonNum:' + this.startButtonNum + ',' + currentPageNum + ',' + displayPageNum);
		if( Number(currentPageNum) < Number(displayPageNum)){
			console.log('this.pageNumberCount1:', this.pageNumberCount);
			for(var i=0; i < this.pageNumberCount; i++){
				this.down('button[name=pageNumber' + (i+1) + ']').setText(this.startButtonNum +i);
				this.down('button[name=pageNumber' + (i+1) + ']').setHidden(false);
			}			
		}
		else {
			console.log('this.pageNumberCount2:', this.pageNumberCount);
			var displayButtonNum =  this.maxPage % this.pageNumberCount;
			if(displayButtonNum == 0 && this.maxPage != 0){
				displayButtonNum = this.pageNumberCount;
			}

			for(var i=0; i < displayButtonNum; i++){
				this.down('button[name=pageNumber' + (i+1) + ']').setHidden(false);
				this.down('button[name=pageNumber' + (i+1) + ']').setText(this.startButtonNum +i);
			}	
			for(var i= displayButtonNum; i < this.pageNumberCount; i++){
				this.down('button[name=pageNumber' + (i+1) + ']').setHidden(true);
			}		
		}
		console.log('currentPageNum' + currentPageNum);
		if(currentPageNum < displayPageNum){
			this.down('button[name=arrowEnd]').setHidden(false);
			this.down('button[name=arrowNext]').setHidden(false);
		}
		else{
			this.down('button[name=arrowEnd]').setHidden(true);
			this.down('button[name=arrowNext]').setHidden(true);
		}
		if(currentPageNum > 1){
			this.down('button[name=arrowFirst]').setHidden(false);
			this.down('button[name=arrowPrev]').setHidden(false);
		}
		else{
			this.down('button[name=arrowFirst]').setHidden(true);
			this.down('button[name=arrowPrev]').setHidden(true);
		}		
	}
})