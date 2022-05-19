package kr.co.o2i.controller.com;

import java.net.URI;
import java.net.URL;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.com.PostDAO;
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.util.URI_Convert;


@Controller
@RequestMapping ("/asp/post/*")
public class PostController extends DefaultController{

	
	@Autowired
	PostDAO Postdao;
	
	/* 우편번호조회 */
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response)throws Exception{
		rtnData   = new HashMap<String, Object>();
		storeInfo = new HashMap<String, Object>();
		
		try{
			
			
			String V_POSTNM =  URLDecoder.decode(param.getString("V_POSTNM"), "UTF-8");
			param.put("V_POSTNM", V_POSTNM);
			
			System.out.println(rtnSuccess);
			
			if(  V_POSTNM != null & !"".equals(V_POSTNM)){
				storeInfo.put("list", Postdao.selectPostDao(param));
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.reqWord(rtnData, "주소");
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
}
