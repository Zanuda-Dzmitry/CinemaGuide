import{u as R,_ as B}from"./BHrgwiT-.js";import{e as x,r as T,g as t,j as e,o as s,c as n,b as h,n as L,p as C,h as V,i as E,a as i,m as M,w as k,F as b,k as $,t as P}from"./tziz549v.js";import{_ as I}from"./DlAUqK2U.js";import{_ as N}from"./GUU5db82.js";import{_ as U}from"./Bt2lqZpY.js";import{a as D,b as O}from"./DHLrws4d.js";import{u as S}from"./DoKE79uT.js";import"./9mD17mFt.js";import"./DHZAiYaq.js";import"./BINQYBst.js";import"./BlqNKXbU.js";const W={key:0},z={key:1},A=x({__name:"cover",setup(l){const _=T(!0),o=R();async function w(){await o.fetchMovieRandom(),_.value=!1}w();const p=t(()=>o.movieTitle||""),d=t(()=>o.moviePlot||""),m=t(()=>o.movieRating||0),y=t(()=>o.movieYear||0),u=t(()=>o.movieGenre||[]),v=t(()=>o.movieRuntime||0),r=t(()=>o.movieBackdrop||""),f=t(()=>o.movieId||0),g=t(()=>o.movieTrailerYouTubeId||"");return(a,c)=>e(_)?(s(),n("div",W,"Загрузка...")):(s(),n("div",z,[h(B,{id:e(f),title:e(p),plot:e(d),rating:e(m),year:e(y),genres:e(u),runtime:e(v),backdrop:e(r),youTubeId:e(g)},null,8,["id","title","plot","rating","year","genres","runtime","backdrop","youTubeId"])]))}}),F=I(A,[["__scopeId","data-v-d524fddc"]]),Y=L("movieTop10",{state:()=>({movieTop10:[]}),actions:{async fetchMovieTop10(){const l=await D.get(O);this.movieTop10=l.data}}}),j={class:"container"},G={class:"wrapper"},q=["slides-per-view"],H={class:"slide_index"},J=["src"],K={key:1,class:"grid"},Q=["src"],X=x({__name:"top10Movie",setup(l){const _=T(null),{$viewport:o}=C(),w=t(()=>o.matches("mobile_small")),p=T(0),d=()=>{const v=window.innerWidth,r=224;p.value=v/r};V(()=>{d(),window.addEventListener("resize",d)}),E(()=>{window.removeEventListener("resize",d)});const m=Y(),{data:y}=S("movieTop10",async()=>(await Promise.all([m.fetchMovieTop10()]),m.movieTop10)),u=t(()=>y.value);return(v,r)=>{const f=N,g=U;return s(),n("div",j,[i("div",G,[r[0]||(r[0]=i("h2",null,"Топ 10 фильмов",-1)),e(w)?(s(),M(g,{key:0},{default:k(()=>[i("swiper-container",{class:"grid",ref_key:"containerRef",ref:_,loop:!0,"slides-per-view":e(p)},[(s(!0),n(b,null,$(e(u),(a,c)=>(s(),n("swiper-slide",{key:c,class:"movie_slide"},[h(f,{class:"card",to:`/movies/${a.id}`},{default:k(()=>[i("span",H,P(c+1),1),i("img",{class:"movie_poster",src:a.posterUrl,alt:"Poster"},null,8,J)]),_:2},1032,["to"])]))),128))],8,q)]),_:1})):(s(),n("div",K,[(s(!0),n(b,null,$(e(u),(a,c)=>(s(),M(f,{class:"card",to:`/movies/${a.id}`,key:c},{default:k(()=>[i("span",null,P(c+1),1),i("img",{class:"movie_poster",src:a.posterUrl,alt:"Poster"},null,8,Q)]),_:2},1032,["to"]))),128))]))])])}}}),Z=I(X,[["__scopeId","data-v-f50b7ea2"]]),ee=x({__name:"index",setup(l){return(_,o)=>(s(),n(b,null,[h(F),h(Z)],64))}}),pe=I(ee,[["__scopeId","data-v-bbf0434f"]]);export{pe as default};
