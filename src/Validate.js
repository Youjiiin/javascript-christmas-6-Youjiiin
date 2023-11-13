import { ERROR_MSG } from "./constants/ErrorMsg";
import { MENU_ITEMS } from "./constants/Menu";

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
            
            //각 메뉴 개수가 20개가 넘는 경우
            if (amount > 20) throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE); 
            
            //총 메뉴 개수가 20개가 넘는 경우
            orderSum += amount;
            if (orderSum > 20) throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE);

            //메뉴에 없는 주문을 한 경우
            if (!MENU_ITEMS.includes(item)) throw new Error(ERROR_MSG.INVALID_ORDER_MESSAGE);
        }
        return inputOrder;
    }
};

export default Validate;