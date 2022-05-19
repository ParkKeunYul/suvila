package kr.co.o2i.controller.sin;

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
import kr.co.o2i.dao.sin.SIN011W_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN011W_02/*")
public class SIN011W_02_Controller extends DefaultController{
	

	@Autowired
	SIN011W_02DAO Sin011W_02Dao;
	
	
	@RequestMapping(value="saveReq.suvila")
	public @ResponseBody Map<String,Object> saveReq( Map<String, Object> map
													,HttpServletRequest request
												    ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String ds_card_detail  = param.getString("ds_card_detail","");
			String uptData = param.getString("uptData","");
			
			System.out.println("ds_card_detail = "+ ds_card_detail);
			System.out.println("uptData = "+ uptData);
			
			
			List<Map<String, Object>> dsCardList = StringUtil.jsonToArray(ds_card_detail);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag =  false;
			
			dbFlag = Sin011W_02Dao.saveReq(param ,dsCardList.get(0), uptList);
			
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
	}// save
	
}
