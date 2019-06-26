// javascript for masonry layout is referred from : https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
// with some changes

function resizeGridItem(item){
  if (window.navigator.userAgent.indexOf('Trident') == -1) {
    grid = document.getElementsByClassName("masonry")[0];
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
  }
}

function resizeAllGridItems(){
  if (window.navigator.userAgent.indexOf('Trident') == -1) {
    allItems = document.getElementsByClassName("item");
    for(x=0;x<allItems.length;x++){
      resizeGridItem(allItems[x]);
      addBorder(allItems[x]);
    }
  }
}

function resizeInstance(instance){
  item = instance.elements[0];
  resizeGridItem(item);
}

function addBorder(item){
  item.querySelector('.content').style = "border: 1px solid rgba(0, 0, 0, 0.125);";
}
