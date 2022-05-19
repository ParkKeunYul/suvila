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
import kr.co.o2i.dao.rec.REC020W_02DAO;
import kr.co.o2i.dao.rec.REC022W_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC022W_02/*")
class REC022W_02_Controller extends DefaultController {

	
	@Autowired
	REC022W_02DAO REC022W_02dao;
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String ds_WBRec        = param.getString("ds_WBRec","");
			String ds_acceptRecAmt = param.getString("ds_acceptRecAmt","");
			String ds_sms          = param.getString("ds_sms","");
			String ds_pgCardInfo   = param.getString("ds_pgCardInfo","");
			
			
			List<Map<String, Object>> wbList        = StringUtil.jsonToArray(ds_WBRec);
			List<Map<String, Object>> accList       = StringUtil.jsonToArray(ds_acceptRecAmt);
			List<Map<String, Object>> smsList       = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList      = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			Map<String, Object> rtnMap =  REC022W_02dao.save(param, wbList, accList.get(0), smsList , cardList);			
			
			boolean dbFlag = StringUtil.ObjToBol( rtnMap.get("suc") );
			System.out.println("dbFlag =  " + dbFlag);
			System.out.println("suc =     " + rtnMap.get("suc"));
			System.out.println("msg =     " + rtnMap.get("msg"));
			
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
	}
	
		
}//REC022W_02 
