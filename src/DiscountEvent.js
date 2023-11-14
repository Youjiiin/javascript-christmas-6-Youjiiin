import { SPECIAL_DAY, WEEKEND } from "./constants/Date";
import { MENU } from "./constants/Menu";

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
    weekDayDiscount(date, order) {
        if (!WEEKEND.includes(date)) {
            return this.dessertDiscount(order);
        }
        return 0;
    },

    //디저트메뉴 할인
    dessertDiscount(order) {
        let totalDessertDiscount = 0;
        for (const [item, quantity] of Object.entries(order)) {
            if (item in MENU.DESSERT) {
                totalDessertDiscount += 2023 * quantity;
            }
        }
        return totalDessertDiscount;
    },

    //주말 할인
    weekendDiscount(date, order) {
        if (WEEKEND.includes(date)) {
            return this.mainDiscount(order);
        }
        return 0;
    },

    //메인메뉴 할인
    mainDiscount(order) {
        let totalMainDiscount = 0;
        for (const [item, quantity] of Object.entries(order)) {
            if (item in MENU.MAIN) {
                totalMainDiscount += 2023 * quantity;
            }
        }
        return totalMainDiscount;
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