package kr.co.o2i.controller.rec;

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
import kr.co.o2i.dao.rec.REC000W_02DAO;
import kr.co.o2i.dao.rec.REC014W_00DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC014W_00/*")
class REC014W_00_Controller extends DefaultController {

	
	@Autowired
	REC014W_00DAO REC014W_00dao;
	
	
	
	@RequestMapping(value="selectYoungTopDetail.suvila")
	public @ResponseBody Map<String,Object> selectYoungTopDetail( Map<String, Object> map
																 ,HttpServletRequest request
																 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			String V_CNTR_NMBR  = URLDecoder.decode(param.getString("V_CNTR_NMBR"), "UTF-8");
			String V_YOUNG_MEMO = URLDecoder.decode(param.getString("V_YOUNG_MEMO"), "UTF-8");
			
			param.put("V_CNTR_NMBR" , V_CNTR_NMBR);
			param.put("V_YOUNG_MEMO", V_YOUNG_MEMO);
			
			
			storeInfo.put("list", REC014W_00dao.SELECT_YOUNGTOP_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	@RequestMapping(value="selectDetail.suvila")
	public @ResponseBody Map<String,Object> SELECT_YOUNGTOP_PRINT( Map<String, Object> map
																 ,HttpServletRequest request
																 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC014W_00dao.SELECT_YOUNGTOP_PRINT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	@RequestMapping(value="selectJungak.suvila")
	public @ResponseBody Map<String,Object> selectJungak( Map<String, Object> map
														 ,HttpServletRequest request
														 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC014W_00dao.SELECT_JUNGAK(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	@RequestMapping(value="saveRecYoungTop.suvila")
	public @ResponseBody Map<String,Object> saveRecYoungTop( Map<String, Object> map
															,HttpServletRequest request
															,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String ds_youngtop_youngga  = StringUtil.getJosnParam(param.getString("ds_youngtop_youngga",""));
			String ds_youngtop_detail   = StringUtil.getJosnParam(param.getString("ds_youngtop_detail",""));
			String ds_acceptRecAmt 		= StringUtil.getJosnParam(param.getString("ds_acceptRecAmt",""));
			String ds_sms          		= StringUtil.getJosnParam(param.getString("ds_sms",""));
			String ds_pgCardInfo   		= StringUtil.getJosnParam(param.getString("ds_pgCardInfo",""));
			
			
			List<Map<String, Object>> yyList        = StringUtil.jsonToArray(ds_youngtop_youngga);
			List<Map<String, Object>> ydList        = StringUtil.jsonToArray(ds_youngtop_detail);
			List<Map<String, Object>> accList       = StringUtil.jsonToArray(ds_acceptRecAmt);
			List<Map<String, Object>> smsList       = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList      = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			System.out.println("acclist = "+ accList.get(0));
			
			boolean dbFlag = REC014W_00dao.saveRecYoungTop(param, yyList,ydList, accList.get(0), smsList ,cardList);			
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
	}// 
	
	@RequestMapping(value="saveYoungTopList.suvila")
	public @ResponseBody Map<String,Object> saveYoungTopList( Map<String, Object> map
															,HttpServletRequest request
															,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
		
			String uptData  = StringUtil.getJosnParam(param.getString("uptData",""));
			List<Map<String, Object>> uptList  = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag = REC014W_00dao.saveYoungTopList(param, uptList);
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
	}// 
	
	@RequestMapping(value="saveYoungTopListInfo.suvila")
	public @ResponseBody Map<String,Object> saveYoungTopListInfo( Map<String, Object> map
																,HttpServletRequest request
																,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
		
			String newData 					   = StringUtil.getJosnParam(param.getString("newData",""));
			List<Map<String, Object>> addList  = StringUtil.jsonToArray(newData);
			
			boolean dbFlag = REC014W_00dao.saveYoungTopListInfo(param, addList);
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
	}// 
	
	
	@RequestMapping(value="selectYoungTopYounggaSpir.suvila")
	public @ResponseBody Map<String,Object> selectYoungTopYounggaSpir( Map<String, Object> map
																 	  ,HttpServletRequest request
																 	  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC014W_00dao.SELECT_YOUNGTOP_YOUNGGA(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="selectYoungTopFamilyInfo.suvila")
	public @ResponseBody Map<String,Object> selectYoungTopFamilyInfo( Map<String, Object> map
																 	 ,HttpServletRequest request
																 	 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC014W_00dao.SELECT_FAMILYINFO(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="selectYoungTopPrint.suvila")
	public @ResponseBody Map<String,Object> selectYoungTopPrint( Map<String, Object> map
																,HttpServletRequest request
																,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			String V_PRINT_TYPE = param.getString("V_PRINT_TYPE","");
			
			
			if("CHONHON_YOUNGGA".equals(V_PRINT_TYPE) || "DEUNG".equals(V_PRINT_TYPE)) {
				storeInfo.put("list", REC014W_00dao.SELECT_YOUNGTOP_PRINT_YOUNGGA(param));
			}else {
				storeInfo.put("list", REC014W_00dao.SELECT_YOUNGTOP_PRINT(param));
			}
			
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
		
}//REC002W_03_Controller 
