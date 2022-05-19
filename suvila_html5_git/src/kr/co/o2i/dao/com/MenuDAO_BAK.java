package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface MenuDAO_BAK {

	public List<Map<String,Object>> selectmenuDao( @Param("param")CommonMap param
												  ,@Param("session")Map<String, Object> session );
	
	public List<Map<String,Object>> TreeMenuDao( @Param("param")CommonMap param
			                                    ,@Param("session")Map<String, Object> session );
}
