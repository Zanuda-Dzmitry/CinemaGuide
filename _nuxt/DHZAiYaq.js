import{o as r,c as i,q as l,e as c,g as p,b as d,s as n,j as o,d as f,t as g,P as h}from"./tziz549v.js";import{_ as u}from"./DlAUqK2U.js";const _={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 17 17"};function m(e,t){return r(),i("svg",_,t[0]||(t[0]=[l('<defs><clipPath id="a"><path fill="#fff" fill-opacity="0" d="M.5.5h16v16H.5z"></path></clipPath></defs><path fill="none" d="M.5.5h16v16H.5z"></path><g clip-path="url(#a)"><path fill="#FFF" d="M8.5 12.67 3.79 15.3l1.05-5.29L.89 6.36l5.35-.64L8.5.83l2.25 4.89 5.35.64-3.95 3.65 1.05 5.29z"></path></g><path d="M.5.5h16v16H.5z"></path>',4)]))}const M={render:m},v=["rating"],C=c({__name:"ColorChanger",props:{rating:{},customClass:{}},setup(e){const t=e,s=p(()=>t.rating<=4.2?"red":t.rating>=4.2&&t.rating<=6.3?"grey":t.rating>=6.3&&t.rating<=7.5?"green":"yellow");return(a,w)=>(r(),i("span",{class:n(o(s)),rating:a.rating},[d(o(M),{class:n(a.customClass)},null,8,["class"]),f(" "+g(a.rating.toFixed(1)),1)],10,v))}}),y=u(C,[["__scopeId","data-v-42e18588"]]);function F(e){const t=Math.floor(e/60),s=e%60;return`${t} ч ${s} мин`}const H=h({isModalOpen:!1,toggleModal(){this.isModalOpen=!this.isModalOpen}});export{y as _,F as c,H as m};
