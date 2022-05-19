package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface REC000W_02DAO_BACK {

	
	/* 대주 신도 조회 */
	public  List<Map<String,Object>> SELECT_BUDINFO(@Param("param")CommonMap param);
	
	/* 신도 영가 조회 */
	public  List<Map<String,Object>> SELECT_SPIRITINFO(@Param("param")CommonMap param);
	
	/* 접수 조회 */
	public  List<Map<String,Object>> SELECT_REC_MASTER(@Param("param")CommonMap param);
	
	/* 신도 영가 조회 */
	public  List<Map<String,Object>> SELECT_SPIRITINFO_EQUAL(@Param("param")CommonMap param);
	
}
