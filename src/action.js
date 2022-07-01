export async function send(id, name, content) {
  const response = await fetch("/send", {
    method: "post",
    body: new URLSearchParams({
      name: name,
      content: content,
      id: id
    })
  });
  const status = await response.text();
  return status;
}
export async function del(id) {
  if (window.confirm("コメントを削除しますか?")) {
    const response = await fetch("/delete", {
      method: "post",
      body: new URLSearchParams({
        id: id
      })
    });
    const status = await response.text();
    return status;
  }
}

export async function getPrevComments(setComments, setLastFetchTime, id = undefined, all = false) {
  const response = await fetch("/comments?" + new URLSearchParams({
    startid: id,
    all: all
  }));
  const resData = JSON.parse(await response.text());
  if (resData !== undefined) {
    setComments((comments) => (resData.comments.concat(comments)));
  }
  if (resData !== undefined) {
    setLastFetchTime(resData.time);
  }
}
export async function getCommentsDiff(setComments, setLastFetchTime, id, lastFetchTime) {
  const response = await fetch("/diff?" + new URLSearchParams({
    startid: id,
    time: lastFetchTime
  }));
  const resData = JSON.parse(await response.text());
  if (resData !== undefined) {
    setComments((comments) => {
      for (const newCom of resData.comments) {
        if (newCom.id > oldCom[oldCom.length - 1].id) {
          comments.push(newCom);
        } else {
          comments.map((oldCom) => (
            oldCom.id === newCom.id ? newCom : oldCom
          ));
        }
      }
      return comments;
    });
    setLastFetchTime(resData.time);
  }
}
