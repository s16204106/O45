const sleep = (prop) => {
  return new Promise(resolve => {
    setTimeout(() =>
      resolve(`等待 ${prop}`), 2000);
  })
}

const get_row_data = async () => {
  var scroll_container_width = document.getElementsByClassName("ag-body-horizontal-scroll-container")[0].clientWidth
  var scroll_viewport = document.getElementsByClassName("ag-body-horizontal-scroll-viewport")[0]
  var scroll_viewport_width = scroll_viewport.clientWidth
  var tagNames = {};
  var xpath=".//div[contains(@class,'ag-row-selected')]//div[contains(@class,'ag-cell-value')]//parent::div[contains(@class,'ag-row-selected')]";

  for (var index=0;index<scroll_container_width;index=index + scroll_viewport_width)
  {
    element = document.evaluate(xpath,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    result = document.evaluate(".//div[contains(@class,'ag-cell-value')]",element, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var node = null;
    while(node = result.iterateNext()) {
      col = node.getAttribute("aria-colindex")
      if(!tagNames.hasOwnProperty(col)){
        tagNames[col] = node.innerText
        console.log(node.innerText)
      }
    }
    scroll_viewport.scrollLeft = index
    await sleep(0.5)
  }
  alert=window.open('','','width=600,height=400');
  alert.document.write("<table  border='1'  cellspacing='0' >")
  alert.document.write("<tr></tr>")
  for(let key in tagNames)
  {
    alert.document.write("<td>"+tagNames[key]+"</td>")
  }
  console.log('执行完成')
}
