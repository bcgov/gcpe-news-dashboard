// javascript for masonry layout is referred from : https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
// with some changes

function resizeGridItem(divName, item){
  if (window.navigator.userAgent.indexOf('Trident') == -1) {
    grid = document.getElementById(divName);
    if (grid!=null)
    {
      rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
    }
  }
}

function resizeAllGridItems(divName, hasBorder){
  if (window.navigator.userAgent.indexOf('Trident') == -1) {
    allItems = document.getElementsByClassName("item");
    for(x=0;x<allItems.length;x++){
      resizeGridItem(divName, allItems[x]);
      if (hasBorder){
        addBorder(allItems[x]);
      }
    }
  }
}

function resizeInstance(instance){
  item = instance.elements[0];
  resizeGridItem(item);
}

function addBorder(item){
  const styles = 'border: 1px solid rgba(0, 0, 0, 0.125); border-radius: 0.25rem;';
  item.querySelector('.content').style = styles;
}
