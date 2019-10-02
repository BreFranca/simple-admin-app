import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    background: #f0f0f7;
    max-height: 100%;
    font: normal 100% "Fira Sans", sans-serif;
    text-rendering: optimizelegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }



/*
### Messages
*/
.Message {
  width: 100%;
  height: 95%;
}
.MessageChat {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: auto 50px;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  grid-column-gap: 15px;
}

.MessageChatHeader {
  background: #666;
  padding: 1em;
  margin-bottom: 0.3em;
}
.MessageChatHeader h4 {
  color: #fff;
  margin: 0;
  padding: 0;
}
.MessageChatTalk {
  box-sizing: border-box;
  padding: 0px 16px;
  width: calc(100% - 200px);
}
.MessageChatTalk textarea {
  height: 60px;
  width: 100%;
}
.MessageChatTalkBox {
  margin-top: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  height: calc(90vh - 170px);
  overflow-y: scroll;
  width: 100%;
}
.MessageChatTalkBox span {
  color: #333;
  font-size: 90%;
  padding: 0.4em 1em;
  margin: 0 0.1em 0.3em 0;
  white-space: pre-line;
  max-width: 80%;
  word-break: break-all;
}
.MessageChatTalkBox span em {
  display: block;
  font-size: 0.7em;
  opacity: 0.5;
}

.myself-box {
  display: flex;
  justify-content: flex-end;
}

.other-box {
  display: flex;
  justify-content: flex-start;
}


.other {
  background: #F4F4F8;
  border-radius: 7.5px 7.5px 7.5px 0px;
  box-shadow: 0 1px 0.5px rgba(0,0,0,.13);
}

.myself {
  background: #E5FDE3;
  text-align: right;
  border-radius: 7.5px 7.5px 0px 7.5px;
  box-shadow: 0 1px 0.5px rgba(0,0,0,.13);
}

.MessageChatTalkItem {
  border-radius: 5px;
  margin-top: 0.5em;
  padding: 1em;
}

/*
  ### Sugestoes
*/

.SuggestionButtons {
  margin-bottom: 1em;
}
.SuggestionBox {
  margin-top: 16px;
  flex-direction: column;
  display: flex;
  width: 100%;
}

.SuggestionCard {
  background: white;
  padding: 15px;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 20px;
}

.SuggestionList,
.MessageChatList {
  width: 300px;
  margin-right: 20px;
  background-color: white;
  height: 100%;
  padding: 8px;
  grid-row-start: 1;
  grid-row-end: 3;
}
.MessageChatList .SuggestionList input,
.MessageChatList input {
  box-sizing: border-box;
  padding: 1em;
  margin-bottom: 1em;
  width: 100%;
}

.SuggestionList ul,
.MessageChatList ul {
  margin: 0;
  padding: 0;
}

.SuggestionList li + li,
.MessageChatList li + li {
  border-top: 1px solid #ccc;
}

.SuggestionList li,
.MessageChatList li {
  list-style: none;
  margin: 0.5em 1em;
}

.MessageChatList button {
  display: block;
  width: 100%;
  background-color: #f0f0f7;
}

.SuggestionList span,
.MessageChatList span {
  display: block;
  font-style: italic;
  font-size: 0.8em;
  color: #999;
}

.SuggestionMessage,
.MessageChatTalk {
  background: #fdfdfd;
  box-sizing: border-box;
  width: 100%;
}

.SuggestionMessageName,
.MessageName {
  font-size: 2em;
}

.SuggestionMessageButtons {
  text-align: right;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.helpToggleLabel {
  background: #ccc;
  display: block;
  font-weight: bold;
  padding: 1em 0.5em;
  width: 100%;
  transition: all 200ms ease-in-out;
}

.helpToggleLabel:hover {
  color: #fff;
  background: #6d45c8;
}
/*
### Eventos
*/
.eventContainer {
  margin: 0 1em 0 0;
  padding: 0;
}
.eventList {
  width: 100%;
  margin-bottom: 1em;
}
.eventList > div:first-of-type {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.eventList h3,
.eventList h4 {
  margin: 0;
}

.eventList h4 {
  color: #777;
  border-bottom: 1px #777 dashed;
  font-style: italic;
  font-weight: normal;
}
.eventList + .eventList {
  border-top: 1px solid #aaa;
  padding-top: 1em;
}
.eventEmpty {
  border: #999 2px dashed;
  border-bottom: #777 3px solid;
  color: #666;
  padding: 0.5em 0.2em;
}
.eventEmpty + .eventEmpty {
  margin-top: 1em;
}
/* ### Add new radio roll */

.eventsListAddOptions div {
  display: none;
}
.eventsListAdd .eventsFirstOption,
.eventsListAdd .eventsSecondOption {
  border: 1px solid red;
}
.eventsListAdd input[type="radio"]:checked ~ .eventsFirstOption,
.eventsFirstOption input[type="radio"]:checked ~ .eventsSecondOption {
  display: block;
}

.eventPollIcon {
  background: none;
  color: #333;
  margin: 0;
  padding: 0.3em;
}
.eventPollButton {
  background: none;
  color: #333;
  cursor: pointer;
  font-size: 90%;
  padding: 1em 0;
}
.eventPollButton:hover {
  color: #6d45c8;
}
.eventPollIconSubmit {
  box-sizing: border-box;
  padding: 1em;
  text-align: center;
}
.eventPollListQuestion {
  background: rgba(0, 0, 0, 0.03);
  padding: 0.6em 0;
}

.eventPollListQuestion li {
  border-left: 2px solid rgba(225, 225, 225, 0.7);
  list-style: none;
  margin: 1em 0 1em 1em;
}

.eventCalendar {
  display: flex;
  margin-bottom: 15px
}
.eventCalendar > div {
  box-sizing: border-box;
  width: 50%;
}
.eventCalendar > div + div {
  padding-left: 1em;
}
.eventContainer + .eventContainer {
  border-bottom: 1px solid #999;
}
.loadingSvg {
  enable-background: new 0 0 50 50;
}
.loadingSvg path,
.loadingSvg rect {
  fill: #ffcc00;
}

.admin-content-group li{
  list-style: none;
}

.container-dashboard {
  display: flex;
  justify-content: space-between;
}

.MessageCategory {
  font: 13px "Fira Sans", sans-serif;
  width: 100%;
  border: none;
  cursor: pointer;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 8px;
  transition: .4s all linear;
  margin-top: 8px;
  background: #f0f0f7;
}

.MessageButton {
  margin: 0px;
  display: grid !important;
  grid-template-columns: auto auto 14px;
}

.MessageButton:last-child {
  margin-bottom: 8px;
}

.MessageCategory:hover {
  background: #cdcde4;
  transition: .4s all linear;
}

.ChatProfile {
  border-radius: 50%;
  height: 23px;
  width: 23px;
  margin-right: 8px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
`

export default GlobalStyle
