import { create } from 'zustand';
import axios from 'axios';

// //쇼핑 & 맛집 & 축제 & 관광지
// export const instance = axios.create({
//     baseURL : "http://api.visitjeju.net/vsjApi/contents/searchlist",
    
//     params: { // ✅ API 키 및 언어 설정을 params로 분리
//         apiKey: "57fd439ed04e408c935a985377cbaa41",
//         locale: "kr",
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
//             });   <-------여기 try 값 안에 내용만 교체하면 될거임
//             set({shopNfoodNpartydata:res.data.items, loading: false});
//         } catch (err){
//             console.error("API 요청 에러:", err);
//         }
//     }
// }));    --json파일사용중, 아래 내용 버리고 이걸로 변경해야함--
export const shopNfoodNparty = create((set) => ({
    shopNfoodNpartyData:{
        tour: [],
        shopping: [],
        food: [],
        festival: [],
    },
    loading: false,
    fetchCategory: async (category)=>{
        set({loading: true})
        const categoryMap = {
            c1: 'tour',
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

// export const tour = create((set) => ({
//     tripData:[],
//     fetchTourData:async ()=>{
//         const res = await axios.get("/json/tour.json"); 
//         set({tripData:res.data.info});
//         // console.log(res.data.info);
//     }
// }));