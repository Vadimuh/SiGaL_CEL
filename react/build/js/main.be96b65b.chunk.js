(this["webpackJsonptest-env"]=this["webpackJsonptest-env"]||[]).push([[0],{18:function(e,t,n){},27:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),r=n(20),s=n.n(r),b=(n(27),n(22)),a=n(8),o=n(9),j=n(11),l=n(10),d=n(2),h=(n(18),n(0)),u=function(e){Object(j.a)(n,e);var t=Object(l.a)(n);function n(e){var c;return Object(a.a)(this,n),(c=t.call(this,e)).state={didGetUserName:!0,inputText:""},c.enterUserName=function(){var e=c.textArea.current.value;c.setState({inputText:e})},c.pushToLobby=function(){c.props.history.push("/test1")},c.textArea=i.a.createRef(),c}return Object(o.a)(n,[{key:"render",value:function(){var e=this;this.state.didGetUserName;return Object(h.jsxs)("div",{id:"App",children:[Object(h.jsx)("head",{children:Object(h.jsx)("title",{children:"SiGaL Index"})}),Object(h.jsxs)("body",{children:[Object(h.jsx)("div",{id:"banner",children:Object(h.jsx)("h1",{children:"Sigal.io"})}),Object(h.jsx)("p",{id:"description",children:"Sigal.io is a site where you can create and join and create lobbies with your favorite board games. More description here. Once you enter a nickname and click submit, you can either look for a lobby that someone has created through a game ID or create your own lobby. To set up a lobby, you will need to upload game code and also enter a description."}),Object(h.jsx)("h1",{id:"inputDescription",children:"Insert Nickname"}),Object(h.jsx)("input",{id:"inputText",ref:this.textArea,onInput:this.enterUserName}),Object(h.jsx)("button",{id:"submit",onClick:function(){e.props.setUserName(e.state.inputText),console.log(e.state.inputText),e.pushToLobby()},children:"Submit"})]})]})}}]),n}(i.a.Component),O=Object(d.f)(u),x=function(e){Object(j.a)(n,e);var t=Object(l.a)(n);function n(e){var c;return Object(a.a)(this,n),(c=t.call(this,e)).state={lobbies:[{lobbyName:"lobby1",lobbyDesc:"asdf",lobbyID:123},{lobbyName:"lobby2",lobbyDesc:"zxcv",lobbyID:456}]},c}return Object(o.a)(n,[{key:"renderTableData",value:function(){return this.state.lobbies.map((function(e,t){var n=e.lobbyName,c=e.lobbyDesc,i=e.lobbyID;return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:n}),Object(h.jsx)("td",{children:c}),Object(h.jsx)("td",{children:i})]},i)}))}},{key:"render",value:function(){return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Hello "}),Object(h.jsx)("h1",{children:"Testing Lobbies Table"}),Object(h.jsx)("table",{id:"lobbies",children:Object(h.jsx)("tbody",{children:this.renderTableData()})}),Object(h.jsx)("div",{children:Object(h.jsxs)("div",{children:[Object(h.jsx)("title",{children:"SiGaL Lobby"}),Object(h.jsxs)("div",{id:"nameBox",children:[Object(h.jsx)("h1",{children:"Welcome"}),Object(h.jsx)("button",{onClick:"createRandomLobby()",children:"Create Random Lobby"})]}),Object(h.jsx)("div",{children:Object(h.jsx)("template",{id:"temp",children:Object(h.jsxs)("tr",{id:"rowTemplate",children:[Object(h.jsx)("td",{}),Object(h.jsx)("td",{}),Object(h.jsx)("td",{}),Object(h.jsx)("td",{}),Object(h.jsx)("td",{children:Object(h.jsx)("button",{onClick:"joinLobby(this)",children:"Join Now"})})]})})}),Object(h.jsx)("div",{children:Object(h.jsx)("table",{id:"lobbiesTable",children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Host"}),Object(h.jsx)("th",{children:"Lobby Name"}),Object(h.jsx)("th",{children:"Lobby Description"}),Object(h.jsx)("th",{children:"Lobby ID"}),Object(h.jsx)("th",{})]})})})]})})]})}}]),n}(i.a.Component),p=Object(c.createContext)(null),y=function(e){Object(j.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(a.a)(this,n);for(var c=arguments.length,i=new Array(c),r=0;r<c;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).state={inputText:""},e.try=function(){e.props.history.push("/lobby")},e}return Object(o.a)(n,[{key:"handleInputChanged",value:function(e){this.setState({value:e.target.value})}},{key:"render",value:function(){return Object(h.jsxs)("div",{children:[console.log(this.state.inputText),console.log("Hello"),console.log(this),Object(h.jsxs)("div",{children:["Nickname is : ",this.props.userName]})]})}}]),n}(i.a.Component),v=Object(d.f)(y),m=n(13);var f=function(){var e=Object(c.useState)(""),t=Object(b.a)(e,2),n=t[0],i=t[1];return Object(h.jsx)(m.a,{children:Object(h.jsx)("div",{children:Object(h.jsx)(p.Provider,{value:{userName:n,setUserName:i},children:Object(h.jsxs)(d.c,{children:[Object(h.jsx)(d.a,{exact:!0,path:"/",children:Object(h.jsx)(O,{setUserName:i})}),Object(h.jsx)(d.a,{path:"/Test1",children:Object(h.jsx)(v,{userName:n})}),Object(h.jsx)(d.a,{path:"/Lobby",children:Object(h.jsx)(x,{userName:n})})]})})})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,35)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),i(e),r(e),s(e)}))};s.a.render(Object(h.jsx)(i.a.StrictMode,{children:Object(h.jsx)(f,{})}),document.getElementById("root")),g()}},[[34,1,2]]]);
//# sourceMappingURL=main.be96b65b.chunk.js.map