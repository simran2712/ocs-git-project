
function Fetch() {
  var org = document.getElementById("name");
  var n = document.getElementById("n_value");
  var m = document.getElementById("m_value");
  orgV = org.value;
  nV = n.value;
  mV = m.value;
  console.log(orgV, nV, mV);
//   The url is to access the json of repos required organisation
  var url = "https://api.github.com/orgs/" + orgV + "/repos?per_page=100&page=";
  getRepos(url);
}

async function getRepos(url_) {
  var org = document.getElementById("name");
  var rep_res = await fetch(rep_u);
  rep_result = await rep_res.json();
  rep_cnt = rep_result.public_repos;
  tmp_cnt = rep_cnt / 100 + 1;
  var url = url_;
  var result = [];
  for (i = 1; i <= tmp_cnt; i++) {
    url = url_ + i + "";
    var response = await fetch(url);
    console.log(response);
    resultTemp = await response.json();
    if (resultTemp == undefined) {
      break;
    }
    result = result.concat(resultTemp);
    if (resultTemp.length < 100) {
      break;
    }
  }
//   The sort function is used to sort the organisations on the basis of forks_count
  result.sort(function (a, b) {
    return b.forks_count - a.forks_count;
  });

  var content = document.getElementById("tcontent");
  content.innerHTML = "";
  var mytable = document.createElement("table");
  mytable.setAttribute("class", "table");
  mytable.setAttribute("id", "ttcon");
  var _thead = document.createElement("thead");
  var tr = document.createElement("tr");
  var th = document.createElement("th");
  th.scope = "col";
  th.setAttribute("style", "width:10%;");
  th.innerHTML = "Name";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.scope = "col";
  th.setAttribute("style", "width:10%;");
  th.innerHTML = "Forks";
  tr.appendChild(th);
  _thead.appendChild(tr);
  mytable.append(_thead);
  var contact_tbody = document.createElement("tbody");
  if (nV > result.length) {
    nV = result.length;
  }
  for (var j = 0; j < nV; j++) {
    orgV = org.value;
    const anchor = document.createElement("a");
    anchor.href = result[j].html_url;
    anchor.textContent = result[j].name;
    const button = document.createElement("button");
    button.setAttribute("id", j);
    button.textContent = result[j].forks_count;
    button.addEventListener("click", function () {
      getForks(
        //   forks_url gives the url to access the forks json of required repo
        result[button.id].forks_url,
        //   forks_count gives the url to access the forks json of required repo
        result[button.id].forks_count,
        //   name gives the url to access the forks json of required repo
        result[button.id].name
      );
    });

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(anchor);
    tr.appendChild(td);
    var td = document.createElement("td");
    td.appendChild(button);
    tr.appendChild(td);
    contact_tbody.appendChild(tr);
  }
  mytable.appendChild(contact_tbody);
  content.appendChild(mytable);
}

async function getForks(__url, cnt, name) {
    var org = document.getElementById("name");
    var m = document.getElementById("m_value");
    orgV = org.value;
  var __url = __url + "?per_page=100&page=";
//   This gives the total number of pages to access all forks
  var total_pg = Math.ceil(cnt / 100);
  console.log(total_pg);
  var result = [];
  for (i = total_pg; i >= total_pg - 100; i--) {
    url = __url + i + "";
    var response = await fetch(url);
    resultTemp = await response.json();
    result = result.concat(resultTemp);
    console.log(i, resultTemp);
    if (result.length >= m.value) {
      break;
    }
  }
//   This sort function is used to sort the forks on the basis of creation date.
  result.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at);
  });
  console.log(result);
  var divResult = document.getElementById("f_content");
  divResult.innerHTML = "";
  h = document.createElement("h3");
  h.innerHTML = name;
  divResult.appendChild(h);
  for (var i = 0; i < m.value; i++) {
    const anchor = document.createElement("a");
    anchor.href = result[i].html_url;
    anchor.textContent = result[i].full_name;
    divResult.appendChild(anchor);
    divResult.appendChild(document.createElement("br"));
    console.log(result[i]);
  }
}
