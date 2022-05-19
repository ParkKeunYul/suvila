Ext.define('ExFrm.view.ide.TmplCreate', {
    extend: 'Ext.form.Panel',
    alias:'widget.tmplcreate',
    requires:[
    	'ExFrm.view.ide.TmplCreateController',
    	'ExFrm.view.ide.TmplGrid'],
    controller:'tmplcreate',
    closable: true,
    title: getLboLangItem('템플릿 생성'),
    scrollable:true,
    flex:1,
	layout:{
		type:'vbox',
		align:'stretch'
	},    
    items: [
    {
    	//height:,
		hidden:true,
        xtype:'fieldset',
        title:'입력하세요',  
        reference:'fieldsetreg',
		collapsible:true,
		collapsed:true,
    	layout:{
    		type:'vbox',
    		align:'stretch'
    	},
        items: [
        {
        	layout:'hbox',
        	items:[
        	{
        		layout:'vbox',
        		flex:1,
	    		items:[
	        	{
					reference:'prjPath',
					xtype:'textfield',
					fieldLabel:'프로젝트경로',
					labelAlign:'right'
					//readOnly:true,
				},
				{
					reference:'tmplName',
					xtype:'textfield',
					fieldLabel:'템플릿명',
					labelAlign:'right',
					//readOnly:true,
				},{
					reference:'appName',
					xtype:'textfield',
					fieldLabel:'애플리케이션명',
					labelAlign:'right',
					//readOnly:true,
				},{
					xtype:'tbspacer',
					flex:1
				},{
					reference:'folderName',
					xtype:'textfield',
					fieldLabel:'폴더명',
					labelAlign:'right'
				},{
					reference:'viewName',
					xtype:'textfield',
					fieldLabel:'화면명',
					labelAlign:'right',
					//readOnly:true,
		        },{
					reference:'xtypeName',
					xtype:'textfield',
					fieldLabel:'xtype명',
					labelAlign:'right',
					//readOnly:true,
		        },{
					reference:'panelType',
					xtype:'textfield',
					fieldLabel:'화면종류',
					labelAlign:'right',
					//readOnly:true,
		        },{
		        	reference:'chkViewController',
		        	xtype:'textfield',
		        	fieldLabel:'뷰컨트롤러포함',
		        	labelAlign:'right',
		        },{
		        	reference:'chkViewModel',
		        	xtype:'textfield',
		        	fieldLabel:'뷰모델포함',
		        	labelAlign:'right', 	
		        }]
			},{
		    	xtype:'image',
		   		reference:'tmplImg',
		   		//height:200
	   		}]
        }]
    },{
		xtype:'hidden',
		fieldLabel:'그리드개수',
		name:'gridCount',
		reference:'gridCount',    	
	},{
		xtype:'hidden',
		fieldLabel:'그리드스토어개수',
		name:'gridStoreCount',
		reference:'gridStoreCount',    	
	},{
		xtype:'hidden',
		fieldLabel:'덮어쓰기여부',
		name:'overwrite'
	},{
		xtype:'hidden',
		name:'gridPrefix0',
		fieldLabel:'접두사0',
		reference:'gridPrefix0',       
	},{
		xtype:'hidden',
		name:'gridPrefix1',
		fieldLabel:'접두사1',
		reference:'gridPrefix1',
	},{
		xtype:'hidden',
		name:'gridPrefix2',
		fieldLabel:'접두사2',
		reference:'gridPrefix2',       
	},{
		xtype:'hidden',
		name:'gridPrefix3',
		fieldLabel:'접두사3',
		reference:'gridPrefix3',       
	},{
		xtype:'hidden',
		name:'gridPrefix4',
		fieldLabel:'접두사4',
		reference:'gridPrefix4',       
	},{
		xtype:'hidden',
		name:'gridPrefix5',
		fieldLabel:'접두사5',
		reference:'gridPrefix5',       
	},{
		xtype:'hidden',
		name:'gridPrefix6',
		fieldLabel:'접두사6',
		reference:'gridPrefix6',       
	},{
		xtype:'hidden',
		name:'gridPrefix7',
		fieldLabel:'접두사7',
		reference:'gridPrefix7',       
	},{
		xtype:'hidden',
		name:'gridPrefix8',
		fieldLabel:'접두사8',
		reference:'gridPrefix8',       
	},{
		xtype:'hidden',
		name:'gridPrefix9',
		fieldLabel:'접두사9',
		reference:'gridPrefix9',       
	},
	{
		xtype:'tabpanel',
		items:[{
			title: getLboLangItem('화면'),
			reference:'gridContent',
			scrollable:true,
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[]
		},{
			title: getLboLangItem('스토어'),
			reference:'gridStoreContent',
			scrollable:true,
			layout:{
				type:'vbox',
				align:'stretch'
			},
			items:[]
		}]
	}],
    buttons: [{
        text:  getLboLangItem('초기화'),
        handler: 'onReset'
    },{
        text:  getLboLangItem('파일 생성'),
        //formBind: true,
        //disabled: true,
        handler: 'onCreateFiles'
    }],
    /*
    onBoxReady:function(){
    	console.log('onBoxReady');
    	var form = this; //this.down('form');
    	console.log('form', form);
    	console.log('this', this);
    	
        var body = form.body;    	
		this.formPanelDropTarget = new Ext.dd.DropTarget(body, {
            ddGroup: 'grid-to-form',
            notifyEnter: function(ddSource, e, data) {
                //Add some flare to invite drop.
                body.stopAnimation();
                body.highlight();
            },
            notifyDrop: function(ddSource, e, data) {
                // Reference the record (single selection) for readability
                var selectedRecord = ddSource.dragData.records[0];
				console.log('selectedRecord', selectedRecord);
                // Delete record from the source store.  not really required.
                //ddSource.view.store.remove(selectedRecord);
                return true;
            }
        });    	
    }
    */
});