import 'intersection-observer';

const BoxIntersectionObserver = {
    PPIntersectionObserverObj: null,
    init(){
        // threshold 的值決定該component的 可視達到多少百分比trigger
        this.PPIntersectionObserverObj = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    // 紀錄已經曝光
                    const alreadySaved = entry.target.classList.contains('js-box-is-exposed');
                    if (!alreadySaved) {
                        entry.target.classList.add('js-box-is-exposed');
                        $(entry.target).trigger('exposure-act');
                    }
                }
            });
        }, {
            threshold: 0,
            rootMargin: '250px 0px 250px 0px',
        });
    },
    observe(entries){
        if (this.PPIntersectionObserverObj == null) {
            this.init();
        }
        this.PPIntersectionObserverObj.observe(entries);
    },
    unobserve(entries){
        if (this.PPIntersectionObserverObj == null) {
            this.init();
        }
        this.PPIntersectionObserverObj.unobserve(entries);
    },
};

export default BoxIntersectionObserver;
export {
    BoxIntersectionObserver,
};