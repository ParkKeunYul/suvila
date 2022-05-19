package kr.co.o2i.controller.rec;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.ognl.ArrayElementsAccessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC002W_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC002W_02/*")
class REC002W_02_Controller extends DefaultController {

	
	@Autowired
	REC002W_02DAO REC002W_02dao;
	
	
	@RequestMapping(value="kindInfo.suvila")
	public @ResponseBody Map<String,Object> kindInfo( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_ACCEPT_GBN", "2");
			
			//System.out.println(param);
			
			storeInfo.put("list", REC002W_02dao.SELECT_GDKIND(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
	@RequestMapping(value="kindInfoBs.suvila")
	public @ResponseBody Map<String,Object> kindInfoBs( Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC002W_02dao.SELECT_BSKIND(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
	@RequestMapping(value="bulsaKindDetail.suvila")
	public @ResponseBody Map<String,Object> bulsaKindDetail( Map<String, Object> map
															,HttpServletRequest request
															,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC002W_02dao.SELECT_BSKIND_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
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
			
			String ds_GDRec        = StringUtil.getJosnParam(param.getString("ds_GDRec",""));
			String ds_BSRec        = StringUtil.getJosnParam(param.getString("ds_BSRec",""));
			String ds_acceptRecAmt = StringUtil.getJosnParam(param.getString("ds_acceptRecAmt",""));
			String ds_sms          = StringUtil.getJosnParam(param.getString("ds_sms",""));
			String ds_pgCardInfo   = StringUtil.getJosnParam(param.getString("ds_pgCardInfo",""));
			
			List<Map<String, Object>> gdList        = new ArrayList<Map<String,Object>>();
			List<Map<String, Object>> bsList        = new ArrayList<Map<String,Object>>();
			
			if(!"".equals(ds_GDRec)) {
				gdList        = StringUtil.jsonToArray(ds_GDRec);
			}
			
			if(!"".equals(ds_BSRec)) {
				bsList        = StringUtil.jsonToArray(ds_BSRec);
			}
			
			List<Map<String, Object>> accList       = StringUtil.jsonToArray(ds_acceptRecAmt);
			List<Map<String, Object>> smsList       = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList      = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			boolean dbFlag = REC002W_02dao.save(param, gdList,bsList, accList.get(0), smsList ,cardList);			
			
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
	

	/*
	@RequestMapping(value="kindInfoId.suvila")
	public @ResponseBody Map<String,Object> kindInfoId(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		
		param.put("V_ACCEPT_GBN", "2");
		List<Map<String,Object> >  SELECT_IDKIND  =  REC002W_02dao.SELECT_IDKIND(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_IDKIND);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
		
	}
	
	@RequestMapping(value="kindInfoYd.suvila")
	public @ResponseBody Map<String,Object> kindInfoYd(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		param.put("V_ACCEPT_GBN", "4");
		List<Map<String,Object> >  SELECT_YDKIND  =  REC002W_02dao.SELECT_IDKIND(param);
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_YDKIND);
		rtnData.put("success", rtnSuccess);
		return rtnData;
		
	}
	
	
	@RequestMapping(value="kindInfoBs.suvila")
	public @ResponseBody Map<String,Object> kindInfoBs(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		List<Map<String,Object> >  SELECT_BSKIND  =  REC002W_02dao.SELECT_BSKIND(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_BSKIND);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
		
	}
	
	

	 불사내역 조회 
	@RequestMapping(value="bulsaKindDetail.suvila")
	public @ResponseBody Map<String,Object> bulsaKindDetail(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		param.put("V_BULSA_CD", "5281");
		
		List<Map<String,Object> >  SELECT_YDKIND  =  REC002W_02dao.SELECT_BSKIND_DETAIL(param);
		
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_YDKIND);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	
	
	
	
	 연등 전각종류 조회 
	@RequestMapping(value="jungakYeondeung.suvila")
	public @ResponseBody Map<String,Object> jungakYeondeung(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		//V_JUNGAK_GBN
		param.put("V_JUNGAK_GBN", "I");
		param.put("V_ACCEPT_GBN", 4);
		
		System.out.println(param);
		
		List<Map<String,Object> >  SELECT_JUNGAKKIND  =  REC002W_02dao.SELECT_JUNGAKKIND(param);
		
		rtnData.put("msg", rtnMsg);
		rtnData.put("data", SELECT_JUNGAKKIND);
		rtnData.put("success", rtnSuccess);
		
		return rtnData;
	}
	*/
		
}//REC002W_02_Controller 
