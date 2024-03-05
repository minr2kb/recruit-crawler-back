/* eslint-disable consistent-return */

import axios from 'axios';
import parse from 'node-html-parser';

const COUNT_PER_PAGE = 20;

// "https://m.jobkorea.co.kr/recruit/joblist/_ListNormal?duty=1000229&searchType=2&sort=8&page=1"

const getUrl = (cateKey: string, page: number) => `https://m.jobkorea.co.kr/recruit/joblist/_ListNormal?duty=${cateKey}&dkwrd=100023047566252&searchType=2&sort=8&page=${page}`;

// const getDetailUrl = (id: number) => `https://www.wanted.co.kr/api/v4/jobs/${id}`;

// const WANTED_BASE_URL = 'https://www.wanted.co.kr/wd/';

export const getPostsFromJobKoreaByPage = (controller: AbortController) => async (position: string, cateKey: string, page: number) => {

  const response = await axios.get(getUrl(cateKey, page), {
    signal: controller.signal,
  });
  const { data } = response;


  const root = parse(data);

  
  root.querySelectorAll('li.devAgiWrap').forEach((el) => {
    console.log(el.getAttribute("data-gno"));
  });



  return data
};


