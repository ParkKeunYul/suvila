package kr.co.o2i.controller.ser;

import java.net.URLDecoder;
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
import kr.co.o2i.dao.ser.SER026W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/ser/SER026W_01/*")
public class SER026W_01_Controller extends DefaultController {

	@Autowired
	SER026W_01DAO SER026W_01dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select( Map<String, Object> map
			                                       ,HttpServletRequest request
			                                       ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			
			String V_BON = URLDecoder.decode(param.getString("V_BON"), "UTF-8");
			param.put("V_BON", V_BON);
			
			String V_SUNG = URLDecoder.decode(param.getString("V_SUNG"), "UTF-8");
			param.put("V_SUNG", V_SUNG);
			
			
			
			storeInfo.put("list", SER026W_01dao.SELECT_BON(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
			                                     ,HttpServletRequest request
			                                     ,HttpServletResponse response ){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_ADMIN_ID" , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			boolean dbFlag  = SER026W_01dao.save(param, addList);
			
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
	
}//SER026W_01_Controller
