import { SPECIAL_DAY, WEEKEND } from "./constants/Date";

const DiscountEvent = {
    //크리스마스 디데이 할인
    christmasDdayDiscount(date) {
        if (date > 25) {
            return 0;
        }
        return (date - 1) * 100 + 1000;
    },

    //특별 할인
    specialDayDiscount(date) {
        if (SPECIAL_DAY.includes(date)) {
            return 1000;
        }
        return 0;
    },

    //평일 할인
    WeekDayDiscount(date) {
        if (!WEEKEND.includes(date)) {
            return 2023;
        }
        return 0;
    },

    //주말 할인
    WeekendDiscount(date) {
        if (WEEKEND.includes(date)) {
            return 2023;
        }
        return 0;
    },

    //증정 이벤트
   giftEventDiscount(totalPrice) {
        if (totalPrice >= 120000) {
            return 25000;
        }
        return 0;
   } 
}; 

export default DiscountEvent;