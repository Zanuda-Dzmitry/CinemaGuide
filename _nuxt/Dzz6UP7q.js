import{u as A,_ as V}from"./DdkLBf12.js";import{e as M,r as w,g as d,j as i,o as f,c as h,b,n as R,h as C,p as B,q as j,s as D,v as N,x as P,y as F,z as H,a as g,m as L,w as I,F as k,k as W,t as O}from"./Ba09wFc6.js";import{_ as E}from"./DlAUqK2U.js";import{_ as Y}from"./PgpVPW-h.js";import{_ as z}from"./DBxZE6_y.js";import{a as G,b as U}from"./DHLrws4d.js";import{u as Q}from"./u7wAnKam.js";import"./3KZBag9H.js";import"./CfgkCIco.js";import"./DBfigkHf.js";import"./Bgis6UV5.js";const q={key:0},J={key:1},K=M({__name:"cover",setup(e){const n=w(!0),t=A();async function s(){await t.fetchMovieRandom(),n.value=!1}s();const o=d(()=>t.movieTitle||""),c=d(()=>t.moviePlot||""),u=d(()=>t.movieRating||0),r=d(()=>t.movieYear||0),p=d(()=>t.movieGenre||[]),a=d(()=>t.movieRuntime||0),l=d(()=>t.movieBackdrop||""),m=d(()=>t.movieId||0),_=d(()=>t.movieTrailerYouTubeId||"");return(y,v)=>i(n)?(f(),h("div",q,"Загрузка...")):(f(),h("div",J,[b(V,{id:i(m),title:i(o),plot:i(c),rating:i(u),year:i(r),genres:i(p),runtime:i(a),backdrop:i(l),youTubeId:i(_)},null,8,["id","title","plot","rating","year","genres","runtime","backdrop","youTubeId"])]))}}),X=E(K,[["__scopeId","data-v-d524fddc"]]),Z=R("movieTop10",{state:()=>({movieTop10:[]}),actions:{async fetchMovieTop10(){const e=await G.get(U);this.movieTop10=e.data}}});function $(e){return j()?(D(e),!0):!1}function S(e){return typeof e=="function"?e():i(e)}const ee=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const te=Object.prototype.toString,ne=e=>te.call(e)==="[object Object]",oe=()=>{};function se(e){return N()}function ie(e,n=!0,t){se()?C(e,t):n?e():B(e)}const x=ee?window:void 0;function re(e){var n;const t=S(e);return(n=t==null?void 0:t.$el)!=null?n:t}function ae(...e){let n,t,s,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([t,s,o]=e,n=x):[n,t,s,o]=e,!n)return oe;Array.isArray(t)||(t=[t]),Array.isArray(s)||(s=[s]);const c=[],u=()=>{c.forEach(l=>l()),c.length=0},r=(l,m,_,y)=>(l.addEventListener(m,_,y),()=>l.removeEventListener(m,_,y)),p=P(()=>[re(n),S(o)],([l,m])=>{if(u(),!l)return;const _=ne(m)?{...m}:m;c.push(...t.flatMap(y=>s.map(v=>r(l,y,v,_))))},{immediate:!0,flush:"post"}),a=()=>{p(),u()};return $(a),a}function ce(){const e=w(!1),n=N();return n&&C(()=>{e.value=!0},n),e}function ue(e){const n=ce();return d(()=>(n.value,!!e()))}function le(e,n={}){const{window:t=x}=n,s=ue(()=>t&&"matchMedia"in t&&typeof t.matchMedia=="function");let o;const c=w(!1),u=a=>{c.value=a.matches},r=()=>{o&&("removeEventListener"in o?o.removeEventListener("change",u):o.removeListener(u))},p=F(()=>{s.value&&(r(),o=t.matchMedia(S(e)),"addEventListener"in o?o.addEventListener("change",u):o.addListener(u),c.value=o.matches)});return $(()=>{p(),r(),o=void 0}),c}function de(e={}){const{window:n=x,initialWidth:t=Number.POSITIVE_INFINITY,initialHeight:s=Number.POSITIVE_INFINITY,listenOrientation:o=!0,includeScrollbar:c=!0,type:u="inner"}=e,r=w(t),p=w(s),a=()=>{n&&(u==="outer"?(r.value=n.outerWidth,p.value=n.outerHeight):c?(r.value=n.innerWidth,p.value=n.innerHeight):(r.value=n.document.documentElement.clientWidth,p.value=n.document.documentElement.clientHeight))};if(a(),ie(a),ae("resize",a,{passive:!0}),o){const l=le("(orientation: portrait)");P(l,()=>a())}return{width:r,height:p}}const pe={class:"container"},me={class:"wrapper"},fe=["slides-per-view"],_e={class:"slide_index"},ve=["src"],he={key:1,class:"grid"},ye=["src"],ge=M({__name:"top10Movie",setup(e){const n=w(null),{$viewport:t}=H(),{width:s}=de(),o=d(()=>t.matches("mobile_small")),c=w(1),u=d(()=>c.value=s.value/224),r=Z(),{data:p}=Q("movieTop10",async()=>(await Promise.all([r.fetchMovieTop10()]),r.movieTop10)),a=d(()=>p.value);return(l,m)=>{const _=Y,y=z;return f(),h("div",pe,[g("div",me,[m[0]||(m[0]=g("h2",null,"Топ 10 фильмов",-1)),i(o)?(f(),L(y,{key:0},{default:I(()=>[g("swiper-container",{class:"grid",ref_key:"containerRef",ref:n,loop:!0,"slides-per-view":i(u)},[(f(!0),h(k,null,W(i(a),(v,T)=>(f(),h("swiper-slide",{key:T,class:"movie_slide"},[b(_,{class:"card",to:`/movies/${v.id}`},{default:I(()=>[g("span",_e,O(T+1),1),g("img",{class:"movie_poster",src:v.posterUrl,alt:"Poster"},null,8,ve)]),_:2},1032,["to"])]))),128))],8,fe)]),_:1})):(f(),h("div",he,[(f(!0),h(k,null,W(i(a),(v,T)=>(f(),L(_,{class:"card",to:`/movies/${v.id}`,key:T},{default:I(()=>[g("span",null,O(T+1),1),g("img",{class:"movie_poster",src:v.posterUrl,alt:"Poster"},null,8,ye)]),_:2},1032,["to"]))),128))]))])])}}}),we=E(ge,[["__scopeId","data-v-45c26de5"]]),Te=M({__name:"index",setup(e){return(n,t)=>(f(),h(k,null,[b(X),b(we)],64))}}),Ne=E(Te,[["__scopeId","data-v-bbf0434f"]]);export{Ne as default};
