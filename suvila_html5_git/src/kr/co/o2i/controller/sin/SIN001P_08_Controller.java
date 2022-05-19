package kr.co.o2i.controller.sin;

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
import kr.co.o2i.dao.sin.SIN001P_08DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN001P_08/*")
public class SIN001P_08_Controller extends DefaultController{
	

	@Autowired
	SIN001P_08DAO SIN001p_08dao;
	
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", SIN001p_08dao.SELECT_BUDNO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
												 ,HttpServletRequest request
												  ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			param.put("old_budCd_substring" , param.getString("old_budCd").substring(0,8));
			param.put("V_SLAVE_BUD_CODE" , param.getString("old_budCd"));
			param.put("V_BUD_CODE_BEFORE", param.getString("old_budCd").substring(0, 8));
			param.put("V_BUD_CODE_AFTER" , param.getString("new_budCd"));
			
			
			System.out.println(param);
			
			boolean dbFlag = SIN001p_08dao.save(param);
			
			System.out.println("dbFlag = "+ dbFlag);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo, param.getString("BUD_CODE"));
			}else{
				rtnData = StringUtil.rtnError(rtnData, "신도번호 변경시 오류가 발생되었습니다.");
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData, "신도번호 변경시 오류가 발생되었습니다.");
		}
		return rtnData;
	}
	
}
