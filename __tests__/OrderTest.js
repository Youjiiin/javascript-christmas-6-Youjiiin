import App from "../src/App";
import { MENU } from "../src/constants/Menu";

describe("메뉴 가격 확인 테스트", () => {
    test("케이크 가격 확인", () => {
        const CAKE = ["초코케이크"];
        const EXPECTED_PRICE = 15000;
        const app = new App();
        const price = app.findPriceInMenu(CAKE, MENU);
        expect(price).toEqual(EXPECTED_PRICE);
    });

    test("주문한 메뉴의 총 가격 확인", () => {
        const ORDER = {
            "양송이수프": 2,
            "티본스테이크": 1,
            "샴페인": 1
        };
        const EXPECTED_TOTAL = 6000 * 2 + 55000 + 25000;

        const app = new App();
        app.order = ORDER;
        const totalprice = app.calculateTotalPrice();

        expect(totalprice).toEqual(EXPECTED_TOTAL);
    });
});