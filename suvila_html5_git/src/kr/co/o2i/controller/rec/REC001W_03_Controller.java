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
import kr.co.o2i.dao.rec.REC001W_03DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC001W_03/*")
class REC001W_03_Controller extends DefaultController {

	
	@Autowired
	REC001W_03DAO REC001W_03dao;
	
	
	@RequestMapping(value="getCd.suvila")
	public @ResponseBody Map<String,Object> getCd( Map<String, Object> map){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
			
			
	
	
	@RequestMapping(value="kindInfoId.suvila")
	public @ResponseBody Map<String,Object> kindInfoId( Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC001W_03dao.SELECT_IDKIND(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	@RequestMapping(value="jkindInfoId.suvila")
	public @ResponseBody Map<String,Object> kindInfo( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			
			
			if(!"".equals(param.getString("ASP_V_TEMPLE_CD",""))) {
				param.put("V_TEMPLE_CD" , param.getString("ASP_V_TEMPLE_CD",""));
			}else {
				param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			}
			
			
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC001W_03dao.SELECT_JGKIND(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
		
	
	@RequestMapping(value="selectID.suvila")
	public @ResponseBody Map<String,Object> selectID( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_03dao.SELECT_IDREC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}//
	
	@RequestMapping(value="selectYD.suvila")
	public @ResponseBody Map<String,Object> selectYD( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC001W_03dao.SELECT_YDREC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}//
	
	@RequestMapping(value="selectDC.suvila")
	public @ResponseBody Map<String,Object> selectDC( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC001W_03dao.SELECT_DONGCHAM(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}//
	
	@RequestMapping(value="save")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD"  , adminSession.get("TEMPLE_CD"));
			param.put("V_C_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"     , request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			
			
			boolean dbFlag = REC001W_03dao.save(param, addList);
			
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
		
}//REC001W_03_Controller 
