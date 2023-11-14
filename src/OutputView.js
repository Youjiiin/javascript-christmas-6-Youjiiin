import { MissionUtils } from "@woowacourse/mission-utils";

const OutputView = {
    printError(message) {
        MissionUtils.Console.print(message);
    },

    hello() {
        MissionUtils.Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
    },

    printMenu(order) {
        MissionUtils.Console.print("12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!")
        MissionUtils.Console.print("<주문 메뉴>");
        MissionUtils.Console.print(order);
    },
    
    printTotalPrice(totalPrice) {
        MissionUtils.Console.print("<할인 전 총주문 금액>");
        MissionUtils.Console.print(`${totalPrice}원`);
    },

    printGiftEvent(gift) {
        MissionUtils.Console.print("<증정 메뉴>");
        MissionUtils.Console.print(gift);
    },

    printDiscount(discountarray) {
        MissionUtils.Console.print("<혜택 내역>");
        for (let i = 0; i < discountarray.length; i++) {
            MissionUtils.Console.print(discountarray[i]);
        }
    },

    printTotalDiscount(totalDiscount) {
        MissionUtils.Console.print("<총혜택 금액>");
        if (Number(totalDiscount) === 0) {
            MissionUtils.Console.print(`${totalDiscount}원`);
        } else {
            MissionUtils.Console.print(`-${totalDiscount}원`);
        }
    },

    printPayment(pay) {
        MissionUtils.Console.print("<할인 후 예상 결제 금액>");
        MissionUtils.Console.print(`${pay}원`);
    },

    printBadge(badge) {
        MissionUtils.Console.print("<12월 이벤트 배지>");
        MissionUtils.Console.print(badge);
    }
}


export default OutputView;