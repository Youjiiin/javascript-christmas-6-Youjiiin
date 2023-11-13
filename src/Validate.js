import { ERROR_MSG } from "./constants/ErrorMsg";
import { MENU, MENU_ITEMS } from "./constants/Menu";

const Validate = {
    //날짜 유효성 검사
    validateDate(inputDate) {
        //숫자가 아닌경우
        if (isNaN(inputDate)) {
            throw new Error(ERROR_MSG.INVALID_DATE_MESSAGE);
        }

        //1~31 사이의 숫자가 아닌 경우
        if ( 1 > inputDate || inputDate > 31) {
            throw new Error(ERROR_MSG.INVALID_DATE_MESSAGE);
        }
        return inputDate;
    },

    //주문 유효성 검사
    validateOrder(inputOrder) {
        let orderSum = 0;
        for (const [item, amount] of Object.entries(inputOrder)) {
            //숫자가 아닌 수로 주문한 경우
            if (isNaN(amount)) throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE);
            
            //각 메뉴 개수가 20개가 넘거나, 1 이상의 숫자가 입력되지 않은 경우
            if (amount > 20 || amount < 1) throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE); 
            
            //총 메뉴 개수가 20개가 넘거나, 하나도 시키지 않은 경우
            orderSum += amount;
            if (orderSum > 20) throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE);

            //메뉴에 없는 주문을 한 경우
            if (!MENU_ITEMS.includes(item)) throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE);
        }
        return inputOrder;
    },

    //중복된 메뉴를 주문했을 때
    validateSameMenu(inputOrder) {
        const menuInput = [Object.keys(inputOrder)];
        const setMenuInput = [...new Set(menuInput)];
        if (menuInput.length !== setMenuInput.length) {
            throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE);
        }
    },

    //음료만 주문했을 때
    validateOnlyDrink(inputOrder) {
        const menuInput = [Object.keys(inputOrder)];
        const drink = [Object.keys(MENU.DRINK)];
        let count = 0;
        menuInput.forEach(menu => {
            if (drink.includes(menuInput)) {
                count++;
            }
        });

    
        if (menuInput.length === count) {
            throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE);
        }
    }
};

export default Validate;