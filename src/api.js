import { create } from 'zustand';
import axios from 'axios';

//쇼핑 & 맛집
export const instance = axios.create({
    baseURL : "http://api.visitjeju.net/vsjApi/contents/searchlist",
    
    params: { // ✅ API 키 및 언어 설정을 params로 분리
        apiKey: "57fd439ed04e408c935a985377cbaa41",
        locale: "kr",
    }
});

//관광지
export const instance2 = axios.create({
    baseURL : "http://api.jejuits.go.kr/api/infoTourList",
    
    params: { // ✅ API 키 및 언어 설정을 params로 분리
        code: "860696"
    }
});

//축제
export const instance3 = axios.create({
    baseURL : "http://api.odcloud.kr/api/15041986/v1/uddi:41b782ac-7781-44f9-a194-dd16d4bf2fb0",
    
    params: { // ✅ API 키 및 언어 설정을 params로 분리
        serviceKey: "NICVW7%2BM1Rr%2Fa14RcX1kdhmFrvGCRRK%2Bb6XJJjagnrepPxv%2BOcjSflrZ9YEkBQKG6wBcoUNyMLi32eC%2F%2Fh81fg%3D%3D"
    }
});

//단기예보조회
export const instance6 = axios.create({
    baseURL : "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
    
    params: { // ✅ API 키 및 언어 설정을 params로 분리
        serviceKey: "K8Vk28tgFaV3Setxev%2FSjLml%2FGa%2BOdleeiTr7YuEGaq1mvhADIlqD3COKW4t5cP7b2%2FLYZQSsRsOgVfIQSd6HQ%3D%3D",
        numOfRows: "1000",
        dataType: "JSON",
        nx: "52",
        ny: "38"
    }
});

export const shopNfood = create((set) => ({

}));
export const place = create((set) => ({

}));
export const party = create((set) => ({

}));
export const short = create((set) => ({

}));
