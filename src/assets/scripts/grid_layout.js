function resizeGridItem(item){
  grid = document.getElementsByClassName("grid")[0];
  rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  item.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
  allItems = document.getElementsByClassName("item");
  console.log('total number', allItems.length);
  for(x=0;x<allItems.length;x++){
    resizeGridItem(allItems[x]);
    console.log('item # ', allItems[x]);
    addBorder(allItems[x]);
  }
}

function resizeInstance(instance){
    item = instance.elements[0];
  resizeGridItem(item);
}

function addBorder(item){
  item.querySelector('.content').style = "border: 1px solid rgba(0, 0, 0, 0.125);";
}

/*
window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);

allItems = document.getElementsByClassName("item");
for(x=0;x<allItems.length;x++){
  imagesLoaded( allItems[x], resizeInstance);
}
*/
