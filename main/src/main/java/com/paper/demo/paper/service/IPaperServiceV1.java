package com.paper.demo.paper.service;

import java.util.List;

import com.paper.demo.paper.domain.PaperDto;

public interface IPaperServiceV1 {

	void createPapers(PaperDto.createPaper createPaper,String accessToken);
	void deletePage(Long pageId);
	List<String> getPaperList(String accessToken);


}
