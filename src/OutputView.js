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
    }
    // ...
}


export default OutputView;