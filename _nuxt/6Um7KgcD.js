import{_ as b}from"./CY5O8S75.js";import{_ as B}from"./DV2wmGIU.js";import{u as F}from"./e8wQqK6R.js";import{o as a,c as l,a as t,e as y,f as C,g as L,r as i,u as N,h as $,i as E,b as u,w as v,t as f,j as s,F as I,k as U,l as V,m as z}from"./DeCrZrC3.js";import{_ as A}from"./DlAUqK2U.js";import"./DHLrws4d.js";const G={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 13 21"};function S(h,e){return a(),l("svg",G,e[0]||(e[0]=[t("path",{fill:"#FFF",d:"m4.71 10.6 8.25 8.25-2.36 2.36L0 10.6 10.6 0l2.36 2.35z"},null,-1)]))}const j={render:S},D={class:"container"},H={class:"genre"},P={class:"genre_nav"},R={class:"genre_title"},Z={class:"genre_wrapper"},q={key:0,class:"genre_more-wrapper"},J=["disabled"],g=15,K=y({__name:"[id]",setup(h){const e=F(),k=C(),n=L(()=>k.params.id),d=i([]),r=i(1),m=i(!0),c=i(!1);N({title:()=>`Жанр: ${n.value}`}),$(async()=>{d.value=e.movies,await e.loadMovies(g,r.value,"",n.value)});function w(o){return o&&o.charAt(0).toUpperCase()+o.slice(1)}const x=async()=>{m.value&&(c.value=!0,r.value++,await e.loadMovies(g,r.value,"",n.value),c.value=!1)};return E(()=>{e.movies=[],r.value=1}),(o,O)=>{const p=b,M=B;return a(),l("div",D,[t("section",H,[t("div",P,[u(p,{class:"genre_nav-link",to:"/genres"},{default:v(()=>[u(s(j))]),_:1}),t("h2",R,f(w(s(n))),1)]),t("div",Z,[(a(!0),l(I,null,U(s(d),_=>(a(),z(p,{class:"genre_link",key:_.id,to:`/movies/${_.id}`},{default:v(()=>[u(M,{src:_.posterUrl},null,8,["src"])]),_:2},1032,["to"]))),128))]),s(m)?(a(),l("div",q,[t("button",{disabled:s(c),class:"genre_more",onClick:x},f(s(c)?"Загрузка...":"Показать еще"),9,J)])):V("",!0)])])}}}),se=A(K,[["__scopeId","data-v-4b1a7a28"]]);export{se as default};
