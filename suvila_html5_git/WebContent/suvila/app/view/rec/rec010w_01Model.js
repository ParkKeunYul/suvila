Ext.define('ExFrm.view.rec.rec010w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec010w_01', 
    stores:{ 
        pivotInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: './json/demo007.json',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    totalProperty:'listTotalSize',
                    keepRawData:true
                }
            },
            autoLoad:false,
            pageSize:10,
            timeout : 1000 * 60 * 30
        },
        ds_dailyReport :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC010W_01/selectDailyReport.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false,
            timeout : 1000 * 60 * 30
        },
        ds_recUser :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC010W_01/selectRecUser.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_breakdown :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC010W_01/selectBreakdown.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false,
            grouper: {
                groupFn: function(item) {
                	//exCommon.getReferVal
                	var DETAIL_NAME = exCommon.getRepVal(item.get('DETAIL_NAME'));
                	
                	if(DETAIL_NAME != ""){
                		return item.get('NAME') + ' >> ' + item.get('DETAIL_NAME');
                	}else{
                		return item.get('NAME');
                	}
                }
            }
            ,timeout : 1000 * 60 * 30
        },
        ds_approvalGbn:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=APPROV',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:true
        },
        ds_email:{
            fields:['field1'],
            data:[
            	{projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due:'06/24/2007'},
                {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estimate: 4, rate: 150, due:'06/25/2007'},
                {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple<br>types of anchors', estimate: 4, rate: 150, due:'06/27/2007'},
                {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estimate: 8, rate: 0, due:'06/29/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estimate: 6, rate: 100, due:'07/01/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estimate: 6, rate: 100, due:'07/03/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estimate: 4, rate: 100, due:'07/04/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estimate: 2, rate: 100, due:'07/05/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estimate: 6, rate: 100, due:'07/06/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estimate: 4, rate: 125, due:'07/01/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estimate: 4, rate: 125, due:'07/02/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estimate: 6, rate: 125, due:'07/05/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estimate: 4, rate: 125, due:'07/05/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estimate: 4, rate: 125, due:'07/06/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estimate: 10, rate: 125, due:'07/11/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estimate: 8, rate: 125, due:'07/15/2007'}
            ],
            autoLoad:true
        },
        
        ds_breakdown2:{
        	fields: [
                {name: 'projectId', type: 'int'},
                {name: 'project', type: 'string'},
                {name: 'taskId', type: 'int'},
                {name: 'description', type: 'string'},
                {name: 'estimate', type: 'float'},
                {name: 'rate', type: 'float'},
                {name: 'due', type: 'date', dateFormat:'m/d/Y'}
            ],
            data:[
            	{projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due:'06/24/2007'},
                {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estimate: 4, rate: 150, due:'06/25/2007'},
                {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple<br>types of anchors', estimate: 4, rate: 150, due:'06/27/2007'},
                {projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estimate: 8, rate: 0, due:'06/29/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estimate: 6, rate: 100, due:'07/01/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estimate: 6, rate: 100, due:'07/03/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estimate: 4, rate: 100, due:'07/04/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estimate: 2, rate: 100, due:'07/05/2007'},
                {projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estimate: 6, rate: 100, due:'07/06/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estimate: 4, rate: 125, due:'07/01/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estimate: 4, rate: 125, due:'07/02/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estimate: 6, rate: 125, due:'07/05/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estimate: 4, rate: 125, due:'07/05/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estimate: 4, rate: 125, due:'07/06/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estimate: 10, rate: 125, due:'07/11/2007'},
                {projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estimate: 8, rate: 125, due:'07/15/2007'}
            ],
            sorters: {property: 'due', direction: 'ASC'},
            groupers: ['project', 'estimate'],
            autoLoad:true
        },
        
    }
});