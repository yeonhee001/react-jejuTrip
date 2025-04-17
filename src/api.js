import { create } from 'zustand';
import axios from 'axios';

// //쇼핑 & 맛집 & 축제
// export const instance = axios.create({
//     baseURL : "http://api.visitjeju.net/vsjApi/contents/searchlist",
    
//     params: { // ✅ API 키 및 언어 설정을 params로 분리
//         apiKey: "57fd439ed04e408c935a985377cbaa41",
//         locale: "kr",
//     }
// });

// //관광지
// export const instance2 = axios.create({
//     baseURL : "http://api.jejuits.go.kr/api/infoTourList",
    
//     params: { // ✅ API 키 및 언어 설정을 params로 분리
//         code: "860696"
//     }
// });

// //축제
// export const instance3 = axios.create({
//     baseURL : "http://api.odcloud.kr/api/15041986/v1/uddi:41b782ac-7781-44f9-a194-dd16d4bf2fb0",
    
//     params: { // ✅ API 키 및 언어 설정을 params로 분리
//         serviceKey: "NICVW7%2BM1Rr%2Fa14RcX1kdhmFrvGCRRK%2Bb6XJJjagnrepPxv%2BOcjSflrZ9YEkBQKG6wBcoUNyMLi32eC%2F%2Fh81fg%3D%3D",
//         perPage: 30,
//     }
// });


// export const shopNfoodNparty = create((set) => ({
//     shopNfoodNpartydata:[],
//     loading: false,
//     fetchCategory: async (category)=>{
//         set({loading: true})
//         try{
//             const res = await instance.get("/",{
//                 params: {category},
//             });
//             set({shopNfoodNpartydata:res.data.items, loading: false});
//         } catch (err){
//             console.error("API 요청 에러:", err);
//         }
//     }
// }));    --json파일사용중, 아래 내용 버리고 이걸로 변경해야함--
export const shopNfoodNparty = create((set) => ({
    shopNfoodNpartyData:{
        shopping: [],
        food: [],
        festival: [],
    },
    loading: false,
    fetchCategory: async (category)=>{
        set({loading: true})
        const categoryMap = {
            c2: 'shopping',
            c4: 'food',
            c5: 'festival',
        };

        const fileName = categoryMap[category];

        try{
            const res = await axios.get(`/json/${fileName}.json`);
            set((state)=>({
                shopNfoodNpartyData:{
                    ...state.shopNfoodNpartyData, [fileName] : res.data.items},
                    loading: false}));
        } catch (err){
            console.error("API 요청 에러:", err);
        }
    }
}));

export const tour = create((set) => ({
    tripData:[],
    fetchTourData:async ()=>{
        const res = await axios.get("/json/tour.json"); 
        set({tripData:res.data.info});
        // console.log(res.data.info);
    }
}));

export const mode = create((set) => ({
    isEditMode: false,
    enterEditMode: () => set({ isEditMode: true }),
    exitEditMode: () => set({ isEditMode: false }),
    nullMode: () => set({ isEditMode: null })
}));