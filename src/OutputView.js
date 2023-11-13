import { MissionUtils } from "@woowacourse/mission-utils";

const OutputView = {
    printError(message) {
        MissionUtils.Console.print(message);
    },

    hello() {
        MissionUtils.Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
    },

    printMenu() {
        MissionUtils.Console.print("<주문 메뉴>");
        // ...
    }
    // ...
}


export default OutputView;