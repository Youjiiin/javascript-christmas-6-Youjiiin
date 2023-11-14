const DiscountEvent = {
    //크리스마스 디데이 할인
    christmasDdayDiscount(date) {
        if (date > 25) {
            return 0;
        }
        return (date - 1) * 100 + 1000;
    }
}; 

export default DiscountEvent;