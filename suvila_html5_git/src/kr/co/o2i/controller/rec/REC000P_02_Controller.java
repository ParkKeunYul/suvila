package kr.co.o2i.controller.rec;

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

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC000P_02DAO;
import kr.co.o2i.util.StringUtil;


@Controller
@RequestMapping ("/rec/REC000P_02/*")
public class REC000P_02_Controller extends DefaultController {
	
	
	@Autowired
	REC000P_02DAO REC000P_02Dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select( Map<String, Object> map
			                                       ,HttpServletRequest request
			                                       ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			System.out.println("selectLimit = "+param);
			
			storeInfo.put("list", REC000P_02Dao.SELECT_MISU(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectLimit
	
	
	@RequestMapping(value="selectLimit.suvila")
	public @ResponseBody Map<String,Object> selectLimit( Map<String, Object> map
			                                            ,HttpServletRequest request
			                                            ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			System.out.println("selectLimit = "+param);
			
			storeInfo.put("list", REC000P_02Dao.SELECT_MISU_NO_LIMIT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectLimit
	
	
	@RequestMapping(value="selectMonth.suvila")
	public @ResponseBody Map<String,Object> selectMonth( Map<String, Object> map
			                                            ,HttpServletRequest request
			                                            ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC000P_02Dao.SELECT_PAYMENT_PERIOD(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectMonthLimit
	
	@RequestMapping(value="selectMonthLimit.suvila")
	public @ResponseBody Map<String,Object> selectMonthLimit( Map<String, Object> map
			                                            	 ,HttpServletRequest request
			                                            	 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC000P_02Dao.SELECT_PAYMENT_PERIOD_NO_LIMIT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectMonthLimit
	
	@RequestMapping(value="selectRecAmount.suvila")
	public @ResponseBody Map<String,Object> selectRecAmount( Map<String, Object> map
			                                            	,HttpServletRequest request
			                                            	,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			System.out.println(param);
			
			storeInfo.put("list", REC000P_02Dao.SELECT_REC_AMOUNT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectRecAmount
	
	@RequestMapping(value="saveCmsInfo.suvila")
	public @ResponseBody Map<String,Object> saveCmsInfo( Map<String, Object> map
												 	  	,HttpServletRequest request
												 	  	,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			boolean dbFlag = REC000P_02Dao.saveCmsInfo(param, addList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveCell.suvila")
	public @ResponseBody Map<String,Object> saveCell( Map<String, Object> map
												 	 ,HttpServletRequest request
												 	 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			boolean dbFlag = REC000P_02Dao.saveCell(param, addList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
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
			
			
			String misuRec    		= param.getString("ds_misuRec","");
			String ds_misuRecUpt    = param.getString("ds_misuRecUpt","");
			String sms       		= param.getString("ds_sms","");
			String ds_pgCardInfo 	= param.getString("ds_pgCardInfo","");
			
			List<Map<String, Object>> misuRecList 	 = StringUtil.jsonToArray(misuRec);
			List<Map<String, Object>> misuRecUptList = StringUtil.jsonToArray(ds_misuRecUpt);
			
			List<Map<String, Object>> smsList 		 = StringUtil.jsonToArray(sms);
			List<Map<String, Object>> cardList      = StringUtil.jsonToArray(ds_pgCardInfo);
			
			boolean dbFlag = REC000P_02Dao.save(param, misuRecList,misuRecUptList , smsList ,cardList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveLimit.suvila")
	public @ResponseBody Map<String,Object> saveLimit( Map<String, Object> map
												 	  ,HttpServletRequest request
												 	  ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String misuRec       = param.getString("ds_misuRec","");
			String sms           = param.getString("ds_sms","");
			String ds_pgCardInfo = param.getString("ds_pgCardInfo","");
			
			List<Map<String, Object>> misuRecList 	 = StringUtil.jsonToArray(misuRec);
			List<Map<String, Object>> smsList 		 = StringUtil.jsonToArray(sms);
			
			List<Map<String, Object>> cardList      = StringUtil.jsonToArray(ds_pgCardInfo);
			
			boolean dbFlag = REC000P_02Dao.saveLimit(param, misuRecList , smsList ,cardList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="recCancel.suvila")
	public @ResponseBody Map<String,Object> recCancel( Map<String, Object> map
												 	  ,HttpServletRequest request
												 	  ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String ds_recCancel    = param.getString("ds_recCancel","");
			String sms       	   = param.getString("ds_sms","");
			
			List<Map<String, Object>> ds_recCancelList 	 = StringUtil.jsonToArray(ds_recCancel);
			List<Map<String, Object>> smsList 		 	 = StringUtil.jsonToArray(sms);
			
			boolean dbFlag = REC000P_02Dao.recCancel(param, ds_recCancelList , smsList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectLightOut.suvila")
	public @ResponseBody Map<String,Object> selectLightOut( Map<String, Object> map
			                                               ,HttpServletRequest request
			                                               ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC000P_02Dao.selectLightOut(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectLimit
	
	@RequestMapping(value="saveLightOut.suvila")
	public @ResponseBody Map<String,Object> saveLightOut( Map<String, Object> map
												 	  	 ,HttpServletRequest request
												 	  	 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			
			String uptData    = param.getString("uptData","");
			Map<String, Object> uptInfo 	 = StringUtil.jsonToArray(uptData).get(0);
			
			uptInfo.put("UPT_USER"  , adminSession.get("USER_ID"));
			uptInfo.put("REMOTE",    request.getRemoteAddr());
			
			
			boolean dbFlag = REC000P_02Dao.saveLightOut(param, uptInfo);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveRemark.suvila")
	public @ResponseBody Map<String,Object> saveRemark( Map<String, Object> map
												 	   ,HttpServletRequest request
												 	   ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			
			String uptData    = param.getString("uptData","");
			Map<String, Object> uptInfo 	 = StringUtil.jsonToArray(uptData).get(0);
			
			uptInfo.put("V_USER_ID"  , adminSession.get("USER_ID"));
			uptInfo.put("V_REMOTE",    request.getRemoteAddr());
			
			
			boolean dbFlag = REC000P_02Dao.updateRecRemark(param, uptInfo);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="saveCash.suvila")
	public @ResponseBody Map<String,Object> saveCash( Map<String, Object> map
												 	 ,HttpServletRequest request
												 	 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String ds_MisuAmt    = param.getString("ds_MisuAmt","");
			String ds_sms        = param.getString("ds_sms","");
			
			List<Map<String, Object>> misuAmtList 	 = StringUtil.jsonToArray(ds_MisuAmt);
			List<Map<String, Object>> smsList    	 = StringUtil.jsonToArray(ds_sms);			
			
			
			
			boolean dbFlag = REC000P_02Dao.saveCash(param, misuAmtList , smsList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectJesaInfo.suvila")
	public @ResponseBody Map<String,Object> selectJesaInfo( Map<String, Object> map
			                                        	   ,HttpServletRequest request
			                                        	   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC000P_02Dao.SELECT_JESA_INFO(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectLimit
	
	
	@RequestMapping(value="sendGuideSms.suvila")
	public @ResponseBody Map<String,Object> sendGuideSms( Map<String, Object> map
												 	     ,HttpServletRequest request
												 	     ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String ds_sms                      = param.getString("ds_sms","");
			List<Map<String, Object>> smsList  = StringUtil.jsonToArray(ds_sms);
			
			
			boolean dbFlag = REC000P_02Dao.smsSend(param, smsList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
	
	@RequestMapping(value="selectPrayOrginate.suvila")
	public @ResponseBody Map<String,Object> selectPrayOrginate( Map<String, Object> map
			                                              	   ,HttpServletRequest request
			                                              	   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			System.out.println(param);
			
			storeInfo.put("list", REC000P_02Dao.SELECT_PRAY_ORGINATE(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectRecAmount
	
	
	@RequestMapping(value="selectAllRecAmount.suvila")
	public @ResponseBody Map<String,Object> selectAllRecAmount( Map<String, Object> map
			                                            	   ,HttpServletRequest request
			                                            	   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC000P_02Dao.SELECT_REC_DEUNG_CLASS_ALL_MGT_AMOUNT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectAllRecAmount
	
	
	@RequestMapping(value="save_indeungLimit.suvila")
	public @ResponseBody Map<String,Object> save_indeungLimit( Map<String, Object> map
															  ,HttpServletRequest request
															  ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String misuRec    		= param.getString("ds_misuRec","");
			String pgCardInfo 		= param.getString("ds_pgCardInfo","");
			
			List<Map<String, Object>> misuRecList 	 = StringUtil.jsonToArray(misuRec);
			List<Map<String, Object>> pgCardInfoList = StringUtil.jsonToArray(pgCardInfo);
			
			boolean dbFlag = REC000P_02Dao.save_indeungLimit(param, misuRecList , pgCardInfoList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="save_indeung.suvila")
	public @ResponseBody Map<String,Object> save_indeung( Map<String, Object> map
														 ,HttpServletRequest request
														 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String misuRec    		= param.getString("ds_misuRec","");
			String pgCardInfo 		= param.getString("ds_pgCardInfo","");
			
			List<Map<String, Object>> misuRecList 	 = StringUtil.jsonToArray(misuRec);
			List<Map<String, Object>> pgCardInfoList = StringUtil.jsonToArray(pgCardInfo);
			
			boolean dbFlag = REC000P_02Dao.save_indeung(param, misuRecList , pgCardInfoList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
}
