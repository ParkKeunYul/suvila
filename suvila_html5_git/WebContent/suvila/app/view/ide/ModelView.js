Ext.define('ExFrm.view.ide.ModelView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.modelview',
    requires:['ExFrm.view.ide.ModelViewController',
    ], 
    controller:'modelview',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('뷰모델'),
    //isModal:true,
    isRootView:true,
    items:[
    {
    	xtype:'form',
    	reference:'regform',
    	items:[
	    {
	    	flex:1,
	    	name:'viewModelList',
			items:[
			]
		},{
			xtype:'tbspacer',
			height:10
		},{
			xtype:'hidden',
			reference:'viewModelListCount',
			name:'viewModelListCount'		
		}]
	}],
	tbar:[
	{
		xtype:'button',
		text: getLboLangItem('코드 보기'),
		handler:function(){
			var meBtn = this;
			Ext.Msg.confirm('확인', '저장하지 않은 정보는 삭제될 수 있습니다', function(btn){
				if(btn == 'yes'){
					ExFrm.app.getController('IdeController').setMainBarModelCodeView();
					console.log(meBtn.up('[name=mainbar]'),'...');
					console.log(meBtn.up('[name=mainLboContainer]'),'...');
					meBtn.up('[name=mainbar]').remove(meBtn.up('[name=mainLboContainer]'),true);
				}
			})
		}
	},	
	{
		xtype:'button',
		name:'new',
		//text:getLboLangItem('뷰모델 생성'),
		handler:'onCreate'
	},{
		xtype:'tbspacer',
		width:5
	},{
		xtype:'button',
		name:'add',
		text:getLboLangItem('스토어 추가'),
		handler:'onNewStore'		
	},{
		xtype:'tbspacer',
		width:5
	},{
		xtype:'button',
		name:'save',
		text:getLboLangItem('저장'),
		handler:'onSave'
	}]
});
