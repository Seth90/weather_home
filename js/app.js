const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 2000,
  },
  on: {
    
  }
  /*on: {

    slideChangeTransitionStart: function(swiper) {
        let $wrapperEl = swiper.$wrapperEl;
        let params = swiper.params;
        $wrapperEl.children(('.' + (params.slideClass) + '.' + (params.slideDuplicateClass)))
            .each(function() {
                let idx = this.getAttribute('data-swiper-slide-index');
                this.innerHTML = $wrapperEl.children('.' + params.slideClass + '[data-swiper-slide-index="' + idx + '"]:not(.' + params.slideDuplicateClass + ')').html();
            });
    },

    slideChangeTransitionEnd: function(swiper) {
        swiper.slideToLoop(swiper.realIndex, 0, false);
    }
}*/
});

/*let options = {
    method: 'GET',      
    headers: {}
  };
  
  fetch('http://127.0.0.1:3000/ya_data', options)
  .then(response => response.json())
  .then(json => {
    document.getElementById('res').innerText = json.now;
  });
  */



