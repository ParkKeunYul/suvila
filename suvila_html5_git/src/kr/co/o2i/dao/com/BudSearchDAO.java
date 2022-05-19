package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface BudSearchDAO {

	/* 신도조회 */
	public List<Map<String,Object>> SINDO_SELECT(@Param("param") CommonMap param);
	
	/* 카드번호 신도조회 */
	public List<Map<String,Object>> SINDO_SELECT_CARD(@Param("param") CommonMap param);
	
	/* 영가조회 */
	public List<Map<String,Object>> YOUNGGA_SELECT(@Param("param") CommonMap param);
	
	/* 화주조회 */
	public List<Map<String,Object>> HWAJU_SELECT(@Param("param") CommonMap param);
	
	/* 영가 신도조회 조회 */
	public List<Map<String,Object>> DECE_SELECT(@Param("param") CommonMap param);
	
	/* 관계 성명 신도조회 */
	public List<Map<String,Object>> vrelSelectBudDao(@Param("param") CommonMap param);
}
