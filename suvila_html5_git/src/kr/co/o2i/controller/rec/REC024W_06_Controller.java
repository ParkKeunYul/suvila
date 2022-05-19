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
import kr.co.o2i.dao.rec.REC024W_06DAO;

@Controller
@RequestMapping ("/rec/REC024W_06/*")
public class REC024W_06_Controller extends DefaultController {

	@Autowired
	REC024W_06DAO REC024W_06dao;
	
	@RequestMapping(value="selectGD.suvila")
	public @ResponseBody Map<String,Object> selectGD( Map<String, Object> map
				                                     ,HttpServletRequest request
				                                     ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			if("Y".equals(param.getString("V_DONGNEW"))){
				storeInfo.put("list", REC024W_06dao.SELECT_GDREC_NEW(param));
			}else {
				storeInfo.put("list", REC024W_06dao.SELECT_GDREC(param));
			}
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	@RequestMapping(value="selectGDSel.suvila")
	public @ResponseBody Map<String,Object> selectGDSel( Map<String, Object> map
				                                     	,HttpServletRequest request
				                                     	,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC024W_06dao.SELECT_GDREC_PRINT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
}//REC024W_06
