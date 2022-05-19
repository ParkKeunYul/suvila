Ext.define('ExFrm.view.widget.ExChartLine', {
    exInitStr:"{" + 
	"    xtype:'cartesian',\n" + 
	"    width:300,\n" + 
	"    height:200,\n" + 
	"    store:{data:[\n" +
	"        {name:'하나', value:40},\n" +  
	"        {name:'둘', value:30},\n" +  
	"        {name:'셋', value:40},\n" +  
	"        {name:'넷', value:60}\n" +  
	"    ]},\n" + 
	"    axes:[\n" + 
	"    {\n" + 
	"       type: 'numeric',\n" + 
	"       position: 'left',\n" + 
	"       title: {\n" + 
	"           text: '제목(축)',\n" + 
	"           fontSize: 15\n" + 
	"       },\n" + 
	"       fields: ['value']\n" + 
	"    },{\n" + 
	"       type: 'category',\n" + 
	"       position: 'bottom',\n" + 
	"       title: {\n" + 
	"           text: '제목(카테고리)',\n" + 
	"           fontSize: 15\n" + 
	"       },\n" + 
	"       fields: ['name']\n" + 
	"    }],\n" + 
	"    series: [\n" + 
	"    {\n" + 
	"       type: 'line', \n" + 
	"       xField: ['name'],\n" + 
	"       yField: ['value']\n" + 
	"    }],\n" +  	
	"}"
});