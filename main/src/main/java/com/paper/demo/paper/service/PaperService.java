package com.paper.demo.paper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paper.demo.paper.repository.PaperRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaperService implements IPaperServiceV1{
	@Autowired
	private final PaperRepository paperRepository;


}
