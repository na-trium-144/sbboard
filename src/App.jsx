import { useState } from 'react'
// import logo from './logo.svg'
import './App.css'
import * as action from './action.js'

function Comment(props){
  const c = props.comment;
  const onEdit = props.onEdit;
  return(
    <div class="comment_item" id={c.id}>
      <a name={c.id}>
        <div class="comment_item_header">
          <table width="100%">
          <tr>
          <td>
            <b class="comment_item_author">
              {c.name}
            </b>
            <i class="comment_item_date">(
              {c.edited && "(編集済み)"}
              {c.time}
              )
            </i>
          </td>
          <td align="right">
            <button onClick={onEdit}>
              編集
            </button>
          </td>
          </tr>
          </table>
        </div>
        <div class="comment_item_body">
          {c.content}
        </div>
      </a>
    </div>
  )
}

function EditStatus(props){
  return(
    <div className="footer1">
      {
        props.status || (
          props.editId == -1 ?
            <span>新しいコメントを送信</span>
          :
            <>
              <span>コメントを編集</span>
              <button onClick={props.onCancel}>キャンセル</button>
              <button onclick={props.onDelete}>コメントを削除</button>
            </>
        )
      }
    </div>
  )
}
function EditForm(props){
  return(
    <div>
      <input
        placeholder="名前"
        value={props.name}
        onChange={(e) => {props.setName(e.target.value);}}
      />
      <input
        placeholder="コメント"
        value={props.content}
        onChange={(e) => {props.setContent(e.target.value);}}
      />
      <button onClick={props.onSend}>送信</button>
    </div>
  )
}
function App() {
  const [comments, setComments] = useState([])
  const [editId, setEditId] = useState(-1)
  const [footerStatus, setFooterStatus] = useState("")
  const [sendName, setSendName] = useState("")
  const [sendContent, setSendContent] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header1">SandBoxBoard</h1>
        <div className="App-header2">誰でも自由に編集や削除ができる匿名掲示板です。</div>
      </header>
      <main className="App-main">
        <div className="comments_begin">
          <button id="load_before">前の20件を表示</button>
          <button id="load_before_all">すべてのコメントを表示</button>
          <a href="#latest">一番下へ行く</a>
        </div>
        <div className="comments">
          {comments.map((c) => (
            <Comment
              comment={c}
              onEdit={() => {
                setEditId(c.id);
                setFooterStatus("");
              }}
            />
          ))}
        </div>
        <div className="comments_last">
          <a name="latest"></a>
        </div>
      </main>
      <footer className="App-footer">
        <EditStatus
          status={footerStatus}
          editId={editId}
          onCancel={() => {
            setEditId(-1);
          }}
          onDelete={async () => {
            const status = await action.del(editId);
            setFooterStatus(status);
            setEditId(-1);
          }}
        />
        <EditForm
          name={sendName}
          setName={setSendName}
          content={sendContent}
          setContent={setSendContent}
          onSend={async () => {
            const status = await action.send(editId, sendName, sendContent);
            setFooterStatus(status);
            setEditId(-1);
          }}
        />
      </footer>
    </div>
  )
}

export default App
