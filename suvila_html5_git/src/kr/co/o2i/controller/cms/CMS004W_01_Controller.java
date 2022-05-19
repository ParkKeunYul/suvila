package kr.co.o2i.controller.cms;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.cms.CMS004W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/cms/CMS004W_01/*")
public class CMS004W_01_Controller extends DefaultController {

	@Autowired
	CMS004W_01DAO CMS004W_01dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> selectCmsMgt(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			System.out.println(param);
			
			int V_DATE_GBN = param.getInt("V_DATE_GBN",8);
			
			
			String V_SDATE    = param.getString("V_SDATE");
			String V_EDATE    = param.getString("V_EDATE");
			
			if(!"8".equals(V_DATE_GBN)){
				
				V_SDATE = V_SDATE.substring(0,V_DATE_GBN);
				V_EDATE = V_EDATE.substring(0,V_DATE_GBN);
				
				param.put("V_SDATE", V_SDATE);
				param.put("V_EDATE", V_EDATE);
			}
			
			
			storeInfo.put("list", CMS004W_01dao.SELECT_REC_CMS_PAYMENT_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	
}//CMS004W_01_Controller
