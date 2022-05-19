package kr.co.o2i.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;

public class Result implements ResultHandler{

	
	public List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
	
	int a = 1;
	
	@Override
	@SuppressWarnings("unchecked")
	public void handleResult(ResultContext context) {
		
		Map<String, Object>  bean = (HashMap<String, Object>) context.getResultObject();
		resultList.add(bean);
		a ++;
	}

}
