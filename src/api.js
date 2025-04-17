import { create } from 'zustand';
import axios from 'axios';

// //쇼핑 & 맛집 & 축제 & 관광지
// export const instance = axios.create({
//     baseURL : "https://api.visitjeju.net/vsjApi/contents/searchlist",
    
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

export const tour = create((set) => ({
    tripData:[],
    fetchTourData:async ()=>{
        const res = await axios.get("/json/tour.json"); 
        set({tripData:res.data.info});
        // console.log(res.data.info);
    }
}));

//여행 일정
export const plan = create((set) => ({
    planData:{
        userId : "",
        allList : [
            {
                id : "",
                checkId : "",
                title : "",
                date : [],
                item : {
                    days : [{
                        day : "",
                        plans : []
                    }]
                }
            }
        ]
    },
    //불러오기
    fetchPlanData:async (userId, id)=>{
        const res = await axios.get(`${process.env.REACT_APP_APIURL}/plan/user/${userId}/${id}`)
        set({ planData: res.data })
    },
    //List 불러오기
    PlanListData:async (userId)=>{
        const res = await axios.get(`${process.env.REACT_APP_APIURL}/plan/user/${userId}`)
        set({ planData: res.data })
    },
    pinkPlanData : async ()=>{
        const res = await axios.get(`${process.env.REACT_APP_APIURL}/pickplan/`)
        set({ planData: res.data })
    },
    //달력에서 가져온 데이터 덮어쓰기
    setPlanData: (newItem) => {
        set({ planData: newItem });
    },
    //장소 추가에서 가져온 데이터 업데이트
    searchData: (storedData, idx) => {
        set((state) => {
            const copy = structuredClone(state.planData); // 깊은 복사
            copy.item.days[idx].plans = [...copy.item.days[idx].plans, ...storedData];
            
        return { planData: copy };
        }) 
    },
    //추가
    newPlan : async (userId, newList) => {
        try {
            await axios.post(`${process.env.REACT_APP_APIURL}/plan/`, {
                userId,
                newList
            });
            // 저장 후 상태 반영 (원하는 로직에 맞게 조정 가능)
            set((state) => ({
                planData: newList
            }));

        } catch (err) {
            console.error(err);
            alert('추가 못했다요');
        }
    },
    //수정
    updatePlan: async (userId, newList) => {
        try {
            await axios.put(`${process.env.REACT_APP_APIURL}/plan/`, {
                userId,
                newList
            });
            // 저장 후 상태 반영 (원하는 로직에 맞게 조정 가능)
            set((state) => ({
                planData: state.planData.map(item =>
                    item.id === newList.id ? newList : item
                )
            }));
        } catch (err) {
            console.error(err);
            alert('수정에 실패했습니다.');
        }
    },
    //삭제
    removePlan: async (id, userId) => {
        const res = await axios.delete(`${process.env.REACT_APP_APIURL}/plan/del?id=${id}&userId=${userId}`);
        set((state) => {
            
            const newData = Object.fromEntries(
                Object.entries(state.planData).filter(([key, value]) => value.id !== res.data.id)
            );
            
            return { planData: newData };
        });
    }
}));

export const mode = create((set) => ({
    isEditMode: false,
    enterEditMode: () => set({ isEditMode: true }),
    exitEditMode: () => set({ isEditMode: false }),
    nullMode: () => set({ isEditMode: null })
}));
