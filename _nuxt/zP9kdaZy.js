import{u as N,_ as V}from"./CMiJ_Fd8.js";import{_ as h}from"./falE4e1I.js";import{u as F}from"./BNFFpZNQ.js";import{e as M,p as Y,f as $,g as v,q as j,u as q,o as l,c as m,j as i,m as E,l as d,t as n,b as G,a as e,F as H}from"./YSRWzOfC.js";import{_ as z}from"./DlAUqK2U.js";import"./CZbRPK6R.js";import"./CiYnLQCB.js";import"./y3Veqd0-.js";import"./klr7Q_4-.js";import"./DHLrws4d.js";import"./CNPmDCWt.js";const J={key:1,class:"error_global"},K={key:2},O={key:3,class:"container"},Q={class:"movie_about"},U={class:"movie_info"},W={class:"movie_info-value"},X={class:"movie_info-value"},Z={class:"movie_info-value"},ee={class:"movie_info-value"},oe={class:"movie_info-value"},se={class:"movie_info-value"},ie=M({__name:"[id]",async setup(te){let r,_;const{start:L,finish:R}=Y(),S=$(),A=v(()=>S.params.id),{data:o,status:C,error:p}=([r,_]=j(async()=>N("movieId",async()=>{L();try{const t=F();return await t.fetchMovieId(A.value),t}finally{R()}})),r=await r,_(),r),D=v(()=>C.value==="pending"),a=v(()=>{var t,s,u,c,f,g,y,k,I,b,w,B,x,P,T;return{id:((t=o.value)==null?void 0:t.movieId)||0,title:((s=o.value)==null?void 0:s.movieTitle)||"",plot:((u=o.value)==null?void 0:u.moviePlot)||"",rating:((c=o.value)==null?void 0:c.movieRating)||0,year:((f=o.value)==null?void 0:f.movieYear)||0,genres:((g=o.value)==null?void 0:g.movieGenre)||[],runtime:((y=o.value)==null?void 0:y.movieRuntime)||0,backdrop:((k=o.value)==null?void 0:k.movieBackdrop)||"",youTubeId:((I=o.value)==null?void 0:I.movieTrailerYouTubeId)||"",language:((b=o.value)==null?void 0:b.movieLanguage)||"",budget:(w=o.value)==null?void 0:w.movieBudget,revenue:(B=o.value)==null?void 0:B.movieRevenue,director:(x=o.value)==null?void 0:x.movieDirector,production:(P=o.value)==null?void 0:P.movieProduction,awardsSummary:(T=o.value)==null?void 0:T.movieAwardsSummary}});return q({title:()=>{var t;return`${(t=o.value)==null?void 0:t.movieTitle}`}}),(t,s)=>{const u=V;return l(),m(H,null,[i(D)?(l(),E(u,{key:0})):d("",!0),i(p)?(l(),m("div",J," Произошла ошибка: "+n(i(p).message),1)):i(o)?(l(),m("div",K,[G(h,{movieProps:i(a)},null,8,["movieProps"])])):d("",!0),i(o)?(l(),m("div",O,[e("section",Q,[e("div",U,[s[6]||(s[6]=e("h2",null,"О фильме",-1)),e("ul",null,[e("li",null,[s[0]||(s[0]=e("span",{class:"movie_info-title"}," Язык оригинала ",-1)),e("span",W,n(i(a).language),1)]),e("li",null,[s[1]||(s[1]=e("span",{class:"movie_info-title"}," Бюджет ",-1)),e("span",X,n(i(a).budget),1)]),e("li",null,[s[2]||(s[2]=e("span",{class:"movie_info-title"}," Выручка ",-1)),e("span",Z,n(i(a).revenue),1)]),e("li",null,[s[3]||(s[3]=e("span",{class:"movie_info-title"}," Режиссёр ",-1)),e("span",ee,n(i(a).director),1)]),e("li",null,[s[4]||(s[4]=e("span",{class:"movie_info-title"}," Продакшен ",-1)),e("span",oe,n(i(a).production),1)]),e("li",null,[s[5]||(s[5]=e("span",{class:"movie_info-title"}," Награды ",-1)),e("span",se,n(i(a).awardsSummary),1)])])])])])):d("",!0)],64)}}}),fe=z(ie,[["__scopeId","data-v-68d5f861"]]);export{fe as default};
