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
import kr.co.o2i.dao.rec.REC001W_06DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC001W_06/*")
class REC001W_06_Controller extends DefaultController {

	
	@Autowired
	REC001W_06DAO REC001W_06dao;
	
	
	
	@RequestMapping(value="selectID.suvila")
	public @ResponseBody Map<String,Object> selectID ( Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			storeInfo.put("list", REC001W_06dao.SELECT_IDREC_PRINT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectGD
	
	
	@RequestMapping(value="selectID_CH2.suvila")
	public @ResponseBody Map<String,Object> selectID_CH2 ( Map<String, Object> map
			                                              ,HttpServletRequest request
			                                              ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_06dao.SELECT_ID_CH_REC(param));
						
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectID_CH2
	
	
	@RequestMapping(value="selectID_CH2_After.suvila")
	public @ResponseBody Map<String,Object> selectID_CH2_After ( Map<String, Object> map
			                                              	    ,HttpServletRequest request
			                                              	    ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			if("F".equals( param.getString("V_DEATH_GBN") )) {
				storeInfo.put("list", REC001W_06dao.SELECT_ID_CH_PRINT_01(param));
			}else {
				storeInfo.put("list", REC001W_06dao.SELECT_ID_CH_PRINT_02_2(param));
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectID_CH2
	
	
	@RequestMapping(value="selectYD.suvila")
	public @ResponseBody Map<String,Object> selectYD ( Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_06dao.SELECT_YD_REC_PRINT(param));
						
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectYD
	
	
	@RequestMapping(value="selectYD2.suvila")
	public @ResponseBody Map<String,Object> selectYD2 ( Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC001W_06dao.SELECT_YD_REC_PRINT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectYD
	
	
	
	@RequestMapping(value="selectYD_After.suvila")
	public @ResponseBody Map<String,Object> selectYD_After ( Map<String, Object> map
			                                              	,HttpServletRequest request
			                                              	,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			if("F".equals( param.getString("V_DEATH_GBN") )) {
				storeInfo.put("list", REC001W_06dao.SELECT_YD_REC_PRINT_01(param));
			}else {
				storeInfo.put("list", REC001W_06dao.SELECT_YD_REC_PRINT_02(param));
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectID_CH2
	
	
	@RequestMapping(value="selectYD_After_CH.suvila")
	public @ResponseBody Map<String,Object> selectYD_After_CH( Map<String, Object> map
			                                              	  ,HttpServletRequest request
			                                              	  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			if("F".equals( param.getString("V_DEATH_GBN") )) {
				storeInfo.put("list", REC001W_06dao.SELECT_YD_REC_PRINT_01(param));
			}else {
				storeInfo.put("list", REC001W_06dao.SELECT_YD_REC_PRINT_03(param));
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectID_CH2
	
	
	@RequestMapping(value="selectYD_After_Han.suvila")
	public @ResponseBody Map<String,Object> selectYD_After_Han ( Map<String, Object> map
			                                              	    ,HttpServletRequest request
			                                              	    ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			if("F".equals( param.getString("V_DEATH_GBN") )) {
				storeInfo.put("list", REC001W_06dao.SELECT_YD_REC_PRINT_01(param));
			}else {
				storeInfo.put("list", REC001W_06dao.SELECT_YD2_REC_PRINT_02(param));
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectID_CH2
	
	
	@RequestMapping(value="selectYD_After_new.suvila")
	public @ResponseBody Map<String,Object> ds_YDRec_sel_new ( Map<String, Object> map
			                                              	  ,HttpServletRequest request
			                                              	  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
		
			storeInfo.put("list", REC001W_06dao.SELECT_YD_REC_PRINT_02_NEW(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectID_CH2
	
	
}//REC001W_06_Controller 
