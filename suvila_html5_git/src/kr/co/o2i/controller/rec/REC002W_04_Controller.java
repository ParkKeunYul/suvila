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
import kr.co.o2i.dao.rec.REC002W_03DAO;
import kr.co.o2i.dao.rec.REC002W_04DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC002W_04/*")
class REC002W_04_Controller extends DefaultController {

	
	@Autowired
	REC002W_04DAO REC002W_04dao;
	
	
	@RequestMapping(value="selectMisu.suvila")
	public @ResponseBody Map<String,Object> selectMisu( Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			
			storeInfo.put("list", REC002W_04dao.SELECT_MISU(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
	
}//REC002W_04_Controller 
