package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import kr.co.o2i.util.CommonMap;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginDAO {
	
	
	public Map<String, Object> getLoginSql(@Param("param") CommonMap param);
	public List<Map<String, Object>> autoLoginSql(@Param("param") CommonMap param);
	
	
	public void insertLoginLog(@Param("param") CommonMap param);
	public void updateLoginInfo(@Param("param") CommonMap param);
	public void insertLoginInfo(@Param("param") CommonMap param);
	
}
