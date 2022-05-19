package kr.co.o2i.controller.sin;

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
import kr.co.o2i.dao.sin.SIN001P_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN001P_01/*")
public class SIN001P_01_Controller extends DefaultController{
	

	@Autowired
	SIN001P_01DAO SIN001p_01dao;
	
	
	@RequestMapping(value="saveBranchFam.suvila")
	public @ResponseBody Map<String,Object> saveBranchFam(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			
			Map<String, Object> info = addList.get(0);
			info.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			System.out.println("BUD_CODE = "+ StringUtil.ObjToStr( info.get("BUD_CODE")));
			
			info.put("V_BUD_CODE", StringUtil.ObjToStr( info.get("BUD_CODE")).substring(0, 8) );
			
			
			
			String strTemp =  SIN001p_01dao.SELECT_BRANCH_CD(info);  // 신규 분가코드
			int intTemp    = Integer.parseInt(strTemp); 
			
			param.put("V_BUD_CODE", StringUtil.ObjToStr( info.get("BUD_CODE")).substring(0, 9) +strTemp);
			System.out.println("V_BUD_CODE = "+ param.getString("V_BUD_CODE"));
			
			
			if(intTemp>9){
				rtnData = StringUtil.rtnError(rtnData , "분가번호는 최대 9번 까지 가능합니다.");
				return rtnData;
		    }
			
			
			Map<String, Object> rtnMap = SIN001p_01dao.saveBranchFam(param, addList);
			
			boolean dbFlag = StringUtil.ObjToBol( rtnMap.get("success") );
			String  msg    = StringUtil.ObjToStr( rtnMap.get("msg") );
			
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData,msg);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
}
