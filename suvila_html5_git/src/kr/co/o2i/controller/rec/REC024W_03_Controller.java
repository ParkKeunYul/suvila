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
import kr.co.o2i.dao.rec.REC024W_03DAO;

@Controller
@RequestMapping ("/rec/REC024W_03/*")
public class REC024W_03_Controller extends DefaultController {

	@Autowired
	REC024W_03DAO REC024W_03dao;
	
	@RequestMapping(value="selectPrayMgt.suvila")
	public @ResponseBody Map<String,Object> selectPrayMgt( Map<String, Object> map
			                                             ,HttpServletRequest request
			                                             ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC024W_03dao.SELECT_REC_ALWAYS_PRAY_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	@RequestMapping(value="selectDetail.suvila")
	public @ResponseBody Map<String,Object> selectDetail( Map<String, Object> map
			                                             ,HttpServletRequest request
			                                             ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			System.out.println("selectDetail = "+ param);
			
			storeInfo.put("list", REC024W_03dao.SELECT_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	@RequestMapping(value="saveDetail")
	public @ResponseBody Map<String,Object> saveDetail( Map<String, Object> map
												 	   ,HttpServletRequest request
												 	   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String uptData      				   = param.getString("uptData","");
			List<Map<String, Object>> uptList      = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = REC024W_03dao.saveDetail(param, uptList);			
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
}//REC024W_03
