package kr.co.o2i.controller.rec;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC022W_03DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC022W_03/*")
class REC022W_03_Controller extends DefaultController {

	
	@Autowired
	REC022W_03DAO REC022W_03dao;
	
	
	@RequestMapping(value="selectWonbulRec.suvila")
	public @ResponseBody Map<String,Object> selectWonbulRec( Map<String, Object> map
													 		,HttpServletRequest request
													 		,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			String V_JUNGAK_CD = param.getString("V_JUNGAK_CD","");
			if("0".equals(V_JUNGAK_CD)) {
				param.put("V_JUNGAK_CD", "");
			}
			String V_CODE = param.getString("V_CODE","");
			if("0".equals(V_CODE)) {
				param.put("V_CODE", "");
			}
			
			
			String V_CBDATE = param.getString("V_CBDATE","");
			if("2".equals(V_CBDATE)) {
				storeInfo.put("list", REC022W_03dao.SELECT_WONBUL_REC_NAB(param));
			}else{
				storeInfo.put("list", REC022W_03dao.SELECT_WONBUL_REC(param));
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
		
}//REC002W_03_Controller 
