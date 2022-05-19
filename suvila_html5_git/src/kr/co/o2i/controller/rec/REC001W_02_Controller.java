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
import kr.co.o2i.dao.rec.REC001W_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC001W_02/*")
public class REC001W_02_Controller extends DefaultController {

	
	@Autowired
	REC001W_02DAO REC001W_02dao;
	
	@RequestMapping(value="kindInfo.suvila")
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
			
			
			storeInfo.put("list", REC001W_02dao.SELECT_IDKIND(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
	@RequestMapping(value="jungakIndeung.suvila")
	public @ResponseBody Map<String,Object> jungakIndeung(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC001W_02dao.SELECT_JUNGAKKIND(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="lightSelect.suvila")
	public @ResponseBody Map<String,Object> lightSelect(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("TEMPLE_CD"   , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("UPT_USER"    , adminSession.get("USER_ID"));
			
			List<Map<String, Object>>  list = REC001W_02dao.SELECT_GETLIGHT(param);
			
			
			if(list.size() > 0) {
				
				storeInfo.put("list", list.get(0));
				
				param.put("LIGHT_NO" , list.get(0).get("LIGHT_NO"));
				param.put("JUNGAK_CD", list.get(0).get("JUNGAK_CD"));
				param.put("V_RESERVATION_YN", "T");
				
				
				REC001W_02dao.UPDATE_GETLIGHT(param);
				
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else {
				rtnData = StringUtil.rtnError(rtnData , "남은 등번호가 존재하지 않습니다.");
			}
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
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
		
			
			String ds_IDRec        = StringUtil.getJosnParam(param.getString("ds_IDRec",""));
			String ds_YDRec        = StringUtil.getJosnParam(param.getString("ds_YDRec",""));
			String ds_acceptRecAmt = StringUtil.getJosnParam(param.getString("ds_acceptRecAmt",""));
			String ds_sms          = StringUtil.getJosnParam(param.getString("ds_sms",""));
			String ds_pgCardInfo   = StringUtil.getJosnParam(param.getString("ds_pgCardInfo",""));
			
			
			List<Map<String, Object>> idList        = new ArrayList<Map<String,Object>>();
			List<Map<String, Object>> ydList        = new ArrayList<Map<String,Object>>();
			if(!"".equals(ds_IDRec)) {
				idList        = StringUtil.jsonToArray(ds_IDRec);
			}
			
			if(!"".equals(ds_YDRec)) {
				ydList        = StringUtil.jsonToArray(ds_YDRec);
			}
		
			
			List<Map<String, Object>> accList       = StringUtil.jsonToArray(ds_acceptRecAmt);
			List<Map<String, Object>> smsList       = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList      = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			Map<String, Object> rtnMap = REC001W_02dao.save(param, idList, ydList, accList.get(0), smsList, cardList);
			
			boolean dbFlag = StringUtil.ObjToBol( rtnMap.get("suc") );
			
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData , rtnMap.get("msg")+"");
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	
	
}
