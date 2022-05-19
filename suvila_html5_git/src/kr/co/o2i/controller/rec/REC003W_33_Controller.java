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
import kr.co.o2i.dao.rec.REC003W_23DAO;
import kr.co.o2i.dao.rec.REC003W_33DAO;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC003W_33/*")
public class REC003W_33_Controller extends DefaultController {

	
	@Autowired
	REC003W_33DAO REC003W_33dao;
	
	@RequestMapping(value="selectGi.suvila")
	public @ResponseBody Map<String,Object> selectSagu( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			System.out.println("selectSagu = "+ param);
			
			storeInfo.put("list", REC003W_33dao.SELECT_GIJAE(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="giJaeSB.suvila")
	public @ResponseBody Map<String,Object> giJaeSB( Map<String, Object> map
													,HttpServletRequest request
													,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			System.out.println("selectSagu = "+ param);
			
			storeInfo.put("list", REC003W_33dao.SELECT_GIJAE_DEA(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="giJaeSBBok.suvila")
	public @ResponseBody Map<String,Object> giJaeSBBok( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			System.out.println("selectSagu = "+ param);
			
			storeInfo.put("list", REC003W_33dao.SELECT_GIJAE_BOK(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="saveYoungga.suvila")
	public @ResponseBody Map<String,Object> saveYoungga( Map<String, Object> map
												 		,HttpServletRequest request
												 		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String uptData        = StringUtil.getJosnParam(param.getString("uptData",""));
			
			List<Map<String, Object>> uptList      = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag =  REC003W_33dao.saveYoungga(param, uptList);
			
			
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
	
	@RequestMapping(value="saveBokwi.suvila")
	public @ResponseBody Map<String,Object> saveBokwi( Map<String, Object> map
												 	  ,HttpServletRequest request
												 	  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData        = StringUtil.getJosnParam(param.getString("newData",""));
			
			List<Map<String, Object>> addList      = StringUtil.jsonToArray(newData);
			
			boolean dbFlag =  REC003W_33dao.saveBokwi(param, addList);
			System.out.println("dbFlag = "+ dbFlag);
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
	
	
	@RequestMapping(value="uptGijeJesaDate.suvila")
	public @ResponseBody Map<String,Object> uptGijeJesaDate( Map<String, Object> map
												 		    ,HttpServletRequest request
												 		    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String uptData        = StringUtil.getJosnParam(param.getString("uptData",""));
			
			List<Map<String, Object>> uptList      = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag =  REC003W_33dao.updateGije(param, uptList);
			
			
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
	
}
