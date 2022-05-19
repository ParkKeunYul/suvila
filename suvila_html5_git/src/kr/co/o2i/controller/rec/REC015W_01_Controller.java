package kr.co.o2i.controller.rec;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC015W_01DAO;
import kr.co.o2i.util.StringUtil;
import oracle.sql.BLOB;

@Controller
@RequestMapping ("/rec/REC015W_01/*")
class REC015W_01_Controller extends DefaultController {

	
	@Autowired
	REC015W_01DAO REC015W_01dao;
	
	
	@RequestMapping(value="Year.suvila")
	public @ResponseBody Map<String,Object> Year( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC015W_01dao.SELECT_YEAR(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//Year
	
	@RequestMapping(value="bill_select.suvila")
	public @ResponseBody Map<String,Object> bill_select( Map<String, Object> map
												   		,HttpServletRequest request
												   		,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC015W_01dao.SELECT_REC(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//bill_select
	
	@RequestMapping(value="DetailSave.suvila")
	public @ResponseBody Map<String,Object> DetailSave( Map<String, Object> map
												 	   ,HttpServletRequest request
												 	   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();	
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String newData = param.getString("newData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			Map<String, Object> rtnMap = REC015W_01dao.DetailSave(param, addList);
			
			boolean dbFlag = (boolean)rtnMap.get("flag");
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
				rtnData.put("GIBU_NO"  , rtnMap.get("GIBU_NO"));
				rtnData.put("BUD_NO"   , rtnMap.get("BUD_NO"));
				rtnData.put("GIBU_DAY" , rtnMap.get("GIBU_DAY"));
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="Print.suvila")
	public @ResponseBody Map<String,Object> Print( Map<String, Object> map
												  ,HttpServletRequest request
												  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC015W_01dao.SELECT_DONATION_PRINT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//Year
	
	@RequestMapping(value="TempleInfo.suvila")
	public @ResponseBody Map<String,Object> TempleInfo( Map<String, Object> map
												  	   ,HttpServletRequest request
												  	   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC015W_01dao.SELECT_TEMPLE_INFO(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//TempleInfo
	
	@RequestMapping(value="Image.suvila")
	public @ResponseBody Map<String,Object> Image( Map<String, Object> map
												  ,HttpServletRequest request
												  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_IMG_GBN"   , param.getString("V_IMG_GBN", "1"));
			
			
			List<Map<String, Object>> list  = REC015W_01dao.SELECT_IMAGE(param);
			
			storeInfo.put("list", list);
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//Image
	
	
	@RequestMapping(value="selectImage.suvila")
	public void  selectImage( Map<String, Object> map
					  		 ,HttpServletRequest request
					  		 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_IMG_GBN"   , param.getString("V_IMG_GBN", "1"));
			
			List<Map<String, Object>> list  = REC015W_01dao.SELECT_IMAGE_DETAIL(param);
			
			if(list.size()  == 1) {
				response.reset();
				response.setContentType("image/jpeg");
				response.setHeader("Content-Transfer-Encoding", "UTF-8");
				response.setCharacterEncoding("UTF-8");
				response.setBufferSize(1024*1024*5);
				
				Map blobmap = (Map)list.get(0);
				if(!"".equals(blobmap.get("LEN").toString())){
					
					int size = Integer.parseInt(blobmap.get("LEN").toString());
					if(size>0){
						BLOB blob = (BLOB)blobmap.get("ATTACH_FILE");
						InputStream is 	= blob.getBinaryStream();
						
						byte[] filebyte = new byte[size];
						is.read(filebyte);
						ServletOutputStream os = response.getOutputStream();
						os.write(filebyte);
						os.flush();
						os.close();
						is.close();					
					}
				}					
				response.flushBuffer();
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}//Image
	
	
	@RequestMapping(value="selectTOT.suvila")
	public @ResponseBody Map<String,Object> selectTOT( Map<String, Object> map
												  	  ,HttpServletRequest request
												  	  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC015W_01dao.SELECT_GIBU_TOTAL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//TempleInfo
	
		
}//REC002W_03_Controller 
