package kr.co.o2i.controller.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.rec.REC000P_05DAO;
import kr.co.o2i.dao.rec.REC000P_06DAO;
import kr.co.o2i.dao.rec.REC009W_01DAO;

@Controller
@RequestMapping ("/rec/REC000P_06/*")
public class REC000P_06_Controller extends DefaultController {

	@Autowired
	REC000P_06DAO rec000p_06Dao;
	
	@RequestMapping(value="selectIndeung.suvila")
	public @ResponseBody Map<String,Object> select( Map<String, Object> map
			                                       ,HttpServletRequest request
			                                       ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String V_BUNGA = param.getString("V_BUNGA");
			if("T".equals(V_BUNGA) || "true".equals(V_BUNGA) ) {
				param.put("V_SEARCH_BUD", param.getString("V_SEARCH_BUD").substring(0, 8)+"%");
			}else{
				param.put("V_SEARCH_BUD", param.getString("V_SEARCH_BUD").substring(0, 10)+"%");
			}
			
			
			storeInfo.put("list", rec000p_06Dao.SELECT_REC_INDEUNG(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
	@RequestMapping(value="saveSunab.suvila")
	public @ResponseBody Map<String,Object> saveSunab( Map<String, Object> map
												 	     ,HttpServletRequest request
												 	     ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String ds_main              = param.getString("ds_main","");
			String ds_sms               = param.getString("ds_sms","");			
			String ds_pgCardInfo  		 = StringUtil.getJosnParam(param.getString("ds_pgCardInfo",""));
			
			
			List<Map<String, Object>> misuRecList     = StringUtil.jsonToArray(ds_main);
			List<Map<String, Object>> smsList         = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList        = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			if(!"".equals(ds_pgCardInfo)) {
				cardList = StringUtil.jsonToArray(ds_pgCardInfo);
			}
			
			
			boolean dbFlag = rec000p_06Dao.saveSunab(param, misuRecList, smsList, cardList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
}//REC000P_05_Controller
