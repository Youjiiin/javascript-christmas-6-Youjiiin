import App from "../src/App";
import DiscountEvent from "../src/DiscountEvent";

describe("이벤트 할인 테스트", () => {
    test("크리스마스 디데이 할인", () => {
        const DATE = 7;
        const EXPECTED_RESULT = 1600;
        const result = DiscountEvent.christmasDdayDiscount(DATE);
        expect(result).toEqual(EXPECTED_RESULT);
    });

    test("평일 할인 테스트", () => {
        const DATE = "13";
        const ORDER = {
            "양송이수프": 2,
            "티본스테이크": 1,
            "샴페인": 1,
            "초코케이크": 2
        };
        const EXPECTED_RESULT = 4046;
        const result = DiscountEvent.weekDayDiscount(DATE, ORDER);
        expect(result).toEqual(EXPECTED_RESULT);
    });

    test("주말 할인 테스트", () => {
        const DATE = "9";
        const ORDER = {
            "양송이수프": 2,
            "티본스테이크": 1,
            "샴페인": 1,
            "초코케이크": 2
        };
        const EXPECTED_RESULT = 2023;
        const result = DiscountEvent.weekendDiscount(DATE, ORDER);
        expect(result).toEqual(EXPECTED_RESULT);
    });

    test("특별 할인 테스트", () => {
        const DATE = "25";
        const EXPECTED_RESULT = 1000;
        const result = DiscountEvent.specialDayDiscount(DATE);
        expect(result).toEqual(EXPECTED_RESULT);
    });

    test("증정 이벤트 테스트", () => {
        const TOTAL_PRICE = 130000;
        const EXPECTED_RESULT = 25000;
        const result = DiscountEvent.giftEventDiscount(TOTAL_PRICE);
        expect(result).toEqual(EXPECTED_RESULT);
    });

    test("혜택 내역 정리 테스트", () => {
        const app = new App();
        app.dDayDiscount = 1700;
        app.specialDiscount = 0;
        app.weekdayDiscount = 0;
        app.weekendDiscount = 2023;
        app.giftEvent = 25000;

        const result = app.discountList();
        const EXPECTED_RESULT = ["크리스마스 디데이 할인: -1,700원", "주말 할인: -2,023원", "증정 이벤트: -25,000원"];

        expect(result).toEqual(EXPECTED_RESULT);
    });

    test("뱃지 부여 테스트", () => {
        const app = new App();
        app.totalDiscount = 6046;
        const EXPECTED_RESULT = "별";
        const result = app.awardBadge();
        expect(result).toEqual(EXPECTED_RESULT);
    });
});