Ext.define('ExFrm.view.widget.ExChartPie', {
    exInitStr:"{" + 
	"    xtype:'polar',\n" + 
	"    width:300,\n" + 
	"    height:300,\n" + 
	"    store:{data:[\n" +
	"        {name:'하나', value:40},\n" +  
	"        {name:'둘', value:30},\n" +  
	"        {name:'셋', value:20}\n" +  
	"    ]},\n" + 
	"    series: [\n" + 
	"    {\n" + 
	"       type: 'pie', \n" +
	"       label:{\n" + 
	"           field:'name',\n" + 
	"           display:'rotate'\n" +
	"       },\n" + 
	"       xField: ['value'],\n" + 
	"    }]\n" +  	
	"}"
});