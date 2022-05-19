package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface PostDAO {

	public List<Map<String,Object>> selectPostDao( @Param("param")CommonMap param);
}
