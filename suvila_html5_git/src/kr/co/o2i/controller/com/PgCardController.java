package kr.co.o2i.controller.com;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.dao.com.PgCardDAO;
import kr.co.o2i.dao.com.PostDAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/PgCard/*")
public class PgCardController extends DefaultController{

	@Autowired
	PgCardDAO pgCardDAO;
	
	@RequestMapping(value="selectCardDetail.suvila")
	public @ResponseBody Map<String,Object> selectCardDetail( Map<String, Object> map
															 ,HttpServletRequest request
															 ,HttpServletResponse response)throws Exception{
		rtnData   = new HashMap<String, Object>();
		storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			
			
			storeInfo.put("list", pgCardDAO.SELECT_CARD_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectCardAuth.suvila")
	public @ResponseBody Map<String,Object> selectCardAuth( Map<String, Object> map
														   ,HttpServletRequest request
														   ,HttpServletResponse response)throws Exception{
		rtnData   = new HashMap<String, Object>();
		storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			
			
			storeInfo.put("list", pgCardDAO.SELECT_CARD_AUTHCODE_LIST(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="save")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String ds_recAmt        = StringUtil.getJosnParam(param.getString("ds_recAmt",""));
			String ds_main          = StringUtil.getJosnParam(param.getString("ds_main",""));
			
			
			
			List<Map<String, Object>> recList        = StringUtil.jsonToArray(ds_recAmt);
			List<Map<String, Object>> mainList       = StringUtil.jsonToArray(ds_main);
			
			
			boolean dbFlag = pgCardDAO.save(param, recList, mainList);			
			
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
	}//save
}
